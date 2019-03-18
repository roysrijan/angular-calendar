import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSigninComponent } from './employee-signin.component';

describe('EmployeeSigninComponent', () => {
  let component: EmployeeSigninComponent;
  let fixture: ComponentFixture<EmployeeSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
