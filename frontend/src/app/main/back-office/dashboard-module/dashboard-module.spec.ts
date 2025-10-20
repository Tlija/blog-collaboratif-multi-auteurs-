import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModule } from './dashboard-module';

describe('DashboardModule', () => {
  let component: DashboardModule;
  let fixture: ComponentFixture<DashboardModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
