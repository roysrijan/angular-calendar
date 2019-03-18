import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamShiftComponent } from './team-shift.component';

describe('TeamShiftComponent', () => {
  let component: TeamShiftComponent;
  let fixture: ComponentFixture<TeamShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
