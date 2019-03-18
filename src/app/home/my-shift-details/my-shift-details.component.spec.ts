import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShiftDetailsComponent } from './my-shift-details.component';

describe('MyShiftDetailsComponent', () => {
  let component: MyShiftDetailsComponent;
  let fixture: ComponentFixture<MyShiftDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShiftDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
