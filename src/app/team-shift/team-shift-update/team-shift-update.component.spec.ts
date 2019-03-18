import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamShiftUpdateComponent } from './team-shift-update.component';

describe('TeamShiftUpdateComponent', () => {
  let component: TeamShiftUpdateComponent;
  let fixture: ComponentFixture<TeamShiftUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamShiftUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamShiftUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
