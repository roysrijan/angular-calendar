import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShiftDetail, UserShiftDetail } from '../../shared/model/shift-detail.model';
import { ShiftDetailService } from '../../shared/service/shift-detail.service';
import { Subject } from 'rxjs';
import { CommonService } from '../../shared/service/common.service';

@Component({
  selector: 'app-team-shift-view',
  templateUrl: './team-shift-view.component.html',
  styleUrls: ['.././team-shift.component.css']
})
export class TeamShiftViewComponent implements OnDestroy, OnInit {
  ColumnRow: string;
  ShiftTypes : ShiftDetail[];
  monthShiftDetail: ShiftDetail[]  ;
  monthUsersShift: UserShiftDetail[] ;
  noOfDaysInMonth : number;
  
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();
  
  constructor(private commonService :CommonService,private shiftDetailService : ShiftDetailService) { }

  async ngOnInit() {
    await this.commonService.getShifts('all').subscribe(data=>{this.ShiftTypes = data;});
    
    await this.initDates();
    
    await this.shiftDetailService.getUsersMonthlyShift("all",new Date().getMonth()+1,new Date().getFullYear())
          .subscribe(data=>{
                this.monthUsersShift =data;
                // Calling the DT trigger to manually render the table
                this.dtTrigger.next();
              });;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  initDates()
  {
    let d = new Date();
    this.noOfDaysInMonth = new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
  }

}
