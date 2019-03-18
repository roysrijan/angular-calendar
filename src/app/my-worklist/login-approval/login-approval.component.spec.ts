import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginApprovalComponent } from './login-approval.component';

describe('LoginApprovalComponent', () => {
  let component: LoginApprovalComponent;
  let fixture: ComponentFixture<LoginApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
