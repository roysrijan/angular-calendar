import { Component, OnInit, OnDestroy } from '@angular/core';
import {ShiftDetail,UserShiftDetail} from '../shared/model/shift-detail.model';
import { CommonService } from '../shared/service/common.service';
import { ShiftDetailService } from '../shared/service/shift-detail.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-team-shift',
  templateUrl: './team-shift.component.html',
  styleUrls: ['./team-shift.component.css']
})
export class TeamShiftComponent implements OnDestroy, OnInit {
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
  saveShift(selectedShift) {
    console.log("Column Row :"+this.ColumnRow+"|selectedShift"+selectedShift);
    let shiftDetail :ShiftDetail;
    
    if(this.ColumnRow!=undefined && this.ColumnRow.indexOf("|")>0){
   // console.log("ColumnROw is not undefined");
    let selectedEmp = this.ColumnRow.split("|")[0];
    let selectedDate = this.ColumnRow.split("|")[1];
    console.log("selected Emp :"+selectedEmp+",selected Date :"+selectedDate);
    this.ShiftTypes.forEach(shift => {
      if(shift.shiftId==selectedShift){
        shiftDetail = shift;
       // console.log("selected shift details :"+JSON.stringify(shiftDetail));
        this.dtTrigger.next();
      }
    });

    this.monthUsersShift.forEach(element => { 
      //console.log("searching employee"+element.employeeName);
      if(element.employeeId==selectedEmp){
        //console.log("found employee"+element.employeeName);
        element.monthShift.forEach(dailyShift => {
          
          if(dailyShift.shiftDay.toString()==selectedDate){
          //  console.log("found date"+dailyShift.shiftDay);
             dailyShift.shiftCssClass = shiftDetail.shiftCssClass;
             dailyShift.shiftId = shiftDetail.shiftId;
             dailyShift.shiftName = shiftDetail.shiftName;
             dailyShift.shiftShortName = shiftDetail.shiftShortName;
             //console.log("daily Sift shiftId"+dailyShift.shiftId);
          }
        });
      }
      
    });
  }
  }

  getDetails(shiftType, shiftDay, employeeId,shiftId) {
    this.ColumnRow = employeeId +"|"+ shiftDay;
   // console.log("shift Date:" + shiftDay + "|shift type:" + shiftType + "|columnRow:" + this.ColumnRow);

  }
  

}
