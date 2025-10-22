import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPresentationComponent } from './signup-presentation.component';

describe('SignupPresentationComponent', () => {
  let component: SignupPresentationComponent;
  let fixture: ComponentFixture<SignupPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
