import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamShiftViewComponent } from './team-shift-view.component';

describe('TeamShiftViewComponent', () => {
  let component: TeamShiftViewComponent;
  let fixture: ComponentFixture<TeamShiftViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamShiftViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamShiftViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
