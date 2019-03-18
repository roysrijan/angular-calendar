import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions, RequestMethod ,Response} from '@angular/http';
import { map } from "rxjs/operators";
import { UserShiftDetail, EmpShiftDistributionForDay, CustomCalendarEvent } from '../model/shift-detail.model';
import { CalendarEvent } from 'calendar-utils';
import { BehaviorSubject } from 'rxjs';
import {from} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShiftDetailService {
  serviceUrl ='http://localhost:57489/api/ShiftDetail/';
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  public _demoSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor(private http : Http) { }
  
  changeMessage(message ){
    this.messageSource.next(message);
    console.log("in service :"+message);
  }


  getUsersMonthlyShift(fetchParam,shiftMonth,shiftYear){
    console.log("in getUsersMonthlyShift, shift month :"+shiftMonth+",year :"+shiftYear);
    let requestUrl = this.serviceUrl+"/GetEmployeesMonthlyShift/"+fetchParam+"/"+shiftMonth+"/"+shiftYear;
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ return  data.json() as UserShiftDetail[];    }));
  }


  saveEmployeesMonthlyShift(monthUsersShift,month,year){
    console.log("in save employee monthly shiuft");
    let requestUrl = this.serviceUrl+"/SaveEmployeesMonthlyShift/";
    var object = {month :month,year :year,monthUsersShift:monthUsersShift}
    var body = JSON.stringify(object);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(requestUrl,body,requestOptions).pipe(map(x => x.json())).subscribe();
  }

  getEmpShiftDistributionForMonth(fetchParam,shiftMonth,shiftYear,viewDate){
    let requestUrl = this.serviceUrl+"/GetEmpShiftDistributionForMonth/"+fetchParam+"/"+shiftMonth+"/"+shiftYear;
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ 
     let x : CustomCalendarEvent[] =data.json() ;
     let x1 : CalendarEvent[]=[];
     x.forEach(d => {
       if(d.color==null)
        d.color=""
       let c : CalendarEvent = {title : d.title,start:new Date(),color:d.color,meta:{ type : d.color, shiftName : d.meta.shiftName } };
       c.start.setDate(d.start.day);
       c.start.setFullYear(d.start.year);
       c.start.setMonth(d.start.month-1);
       x1.push(c);
     });
       return  (x1);    
    }));
  }
 getEventColor(cssClass){
 switch(cssClass.toLowerCase().trim()){
    case "generalshift": return {primary :"rgb(204,255,153)",secondary :"#ffffff"};
    case "publicholiday ": return {primary :"rgb(148, 127, 34)",secondary :"#ffffff"};
    case "weekendmorningshift": return {primary :"rgb(102,255,153)",secondary :"#ffffff"};
    case "weekendnightshift": return {primary :"rgb(86,152,248)",secondary :"#ffffff"};
    case "nightshift": return {primary :"rgb(150,233,244)",secondary :"#ffffff"};
    case "compoff": return {primary :"rgb(255,255,153)",secondary :"#ffffff"};
    case "pleave": return {primary :"rgb(252,214,182)",secondary :"#ffffff"};
    case "upleave": return {primary :"rgb(255,117,117)",secondary :"#ffffff"};
    case "weeklyoff": return {primary :"rgb(217,217,217) ",secondary :"#ffffff"};
    case "oncall": return {primary :"rgb(255,153,255)",secondary :"#ffffff"};
    default: return {primary :"#FFFFFF",secondary :"#000000"};
  }


 }


 setSubject(value) {
    if (value) {
      this._demoSubject.next(value);
    } else {
      this._demoSubject.next(null)
    }
  }
  

}
