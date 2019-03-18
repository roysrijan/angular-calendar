import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEmployeeListComponent } from './shift-employee-list.component';

describe('ShiftEmployeeListComponent', () => {
  let component: ShiftEmployeeListComponent;
  let fixture: ComponentFixture<ShiftEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
