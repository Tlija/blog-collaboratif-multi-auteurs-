import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// Types
interface AuthUser {
  token: string;
  username: string;
  role: string;
  email: string;
  id: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

// Initial State
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.user()),
    currentUser: computed(() => store.user()),
    isAdmin: computed(() => store.user()?.role === 'admin'),
  })),

  withMethods((
    store,
    authService = inject(AuthService),
    router = inject(Router),
  ) => {

    return {


      login: rxMethod<{ email: string; password: string; expectedRole: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ email, password, expectedRole }) =>
            authService.login({ email, password }, expectedRole).pipe(
              tap((response) => {
                const user: AuthUser = {
                  token: response.token,
                  username: response.username,
                  role: response.role,
                  email: email,
                  id: response.id,
                };

                patchState(store, {
                  user,
                  isLoading: false,
                  error: null
                });

                router.navigate(['/dashboard']);
              }),
              catchError((error) => {
                const errorMessage = error.error?.error || 'Login failed';
                patchState(store, {
                  isLoading: false,
                  error: errorMessage,
                  user: null
                });
                return of(null);
              })
            )
          )
        )
      ),

      register: rxMethod<{ username: string; email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((userData) =>
            authService.register(userData).pipe(
              tap(() => {
                patchState(store, { isLoading: false, error: null });
                router.navigate(['/login']);
              }),
              catchError((error) => {
                const errorMessage = error.error?.error || 'Registration failed';
                patchState(store, {
                  isLoading: false,
                  error: errorMessage
                });
                return of(null);
              })
            )
          )
        )
      ),

      logout() {
        authService.logout();
        patchState(store, { user: null, error: null });
        router.navigate(['/login']);
      },

      clearError() {
        patchState(store, { error: null });
      },
    };
  })
);
