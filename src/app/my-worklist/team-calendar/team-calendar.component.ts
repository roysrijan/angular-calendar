import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {  CalendarMonthViewDay, CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth, subDays, startOfDay } from 'date-fns';
import { ShiftDetailService } from '../../shared/service/shift-detail.service';
import { EmpShiftDistributionForDay } from '../../shared/model/shift-detail.model';
import { Subject, Observable } from 'rxjs';
import {ShiftDetail} from '../../shared/model/shift-detail.model';

@Component({
  selector: 'app-team-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.css']
})

export class TeamCalendarComponent implements OnInit {
  view: string = 'month';
  message : string;
  viewDate: Date = new Date();
  empShift: EmpShiftDistributionForDay[] = [];
  activeDayIsOpen: boolean = true;
  monthShiftDetail :ShiftDetail[];
  refresh: Subject<any> = new Subject();
  events$: CalendarEvent<any>[] ;
  a:string
  constructor(private shiftDetailService: ShiftDetailService) { this.fetchEvents();}

    ngOnInit() {
     this.fetchEvents();
     this.shiftDetailService._demoSubject.subscribe(res=>{
      // Here you will get res as 23.50, so whenever component2 will 
      this.fetchEvents();
      
      }); 
}


 fetchEvents(){
   console.log("hi");
   this.shiftDetailService.getEmpShiftDistributionForMonth("all",this.viewDate.getMonth()+1,this.viewDate.getFullYear(),this.viewDate).toPromise().then(data=>{
    console.log("value:"+JSON.stringify(data))
    this.events$=data
    this.a=JSON.stringify(data)
    //console.log("value:"+JSON.stringify(this.events$));
    this.refresh.next();
   });
   console.log("event"+this.events$);
   
}


beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
   console.log("in before month view Render === start ");
  // console.log()
  // console.log("in before month view Render === end ");
  if(this.events$!=undefined){
  body.forEach(cell => {
    const groups: any = {};
    console.log("inside body")
    cell.events.forEach((event: CalendarEvent<{ type: string }>) => {
      console.log("single event :"+JSON.stringify(event))
      groups[event.meta.type] = groups[event.meta.type] || [];
      groups[event.meta.type].push(event);
    
    });
   console.log("groups --> "+JSON.stringify(this.events$));
    cell['eventGroups'] = Object.entries(groups);
  });
}
}
dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  
  var data ={
    dt : date,
    ev : events
  }
  console.log("day clicked:" + JSON.stringify(data));
  this.shiftDetailService.changeMessage(data);
  if(isSameMonth(date, this.viewDate)) {
  if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
    this.activeDayIsOpen = false;
  } else {
    this.activeDayIsOpen = true;
    this.viewDate = date;
  }
  }
  }
}
