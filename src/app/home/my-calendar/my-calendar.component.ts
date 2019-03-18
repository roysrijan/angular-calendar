import { Component,  ChangeDetectionStrategy,  ViewEncapsulation, OnInit  } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import {ShiftDetail} from '../../shared/model/shift-detail.model';
import { HomeService } from '../../shared/service/home.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
  ,providers :[HomeService]
})

export class MyCalendarComponent implements OnInit {

 
  view: string = 'month';
  employeeId :string=  "830092";
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  monthShiftDetail :ShiftDetail[];
  calMonth:number ;
  calYear :number;
  refresh: Subject<any> = new Subject();

  ngOnInit() {
    
   this.refreshView();
  }

  refreshView(){

    this.calMonth = this.viewDate.getMonth()+1;
    this.calYear = this.viewDate.getFullYear();
    //console.log("month : "+this.calMonth+", year :"+this.calYear);
    this.homeService.getEmployeeMonthlyShift(this.employeeId,this.calMonth,this.calYear).toPromise().then(data=>{
      this.monthShiftDetail = data; 
      this.refresh.next();
    });

  }
  constructor(private homeService:HomeService){
  }

  calendarPreviousMonth(){
   // console.log("in calendar previous month:start");
    this.refreshView();
  // console.log("in calendar previous month:end");
  }
  calendarNextMonth(){
   // console.log("in calendar next month:start");
    this.refreshView();
   // console.log("in calendar next month:end");
  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }) :void {
    if(this.monthShiftDetail!=undefined){
       body.forEach(day => {
            this.monthShiftDetail.forEach(m=>{ if(m.shiftDay===day.date.getDate() && day.inMonth){
              day.cssClass=m.shiftCssClass;
              //console.log("day :"+day.date.getDate() +"css : "+day.cssClass);
           }});
         });  
        }
  }


}
