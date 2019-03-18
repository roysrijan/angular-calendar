import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";
import { ShiftDetail } from '../model/shift-detail.model';




@Injectable()
export class HomeService {
  serviceUrl ='http://localhost:57489/api/';
  empMonthlyShift : ShiftDetail[];
  constructor(private http : Http) { }

   getEmployeeMonthlyShift(employeeId,shiftMonth,shiftYear){
    let requestUrl = this.serviceUrl+"ShiftDetail/MonthlyShift/"+employeeId+"/"+shiftMonth+"/"+shiftYear;
    return this.http.get(requestUrl)
    .pipe(map((data : Response) =>{ return  data.json() as ShiftDetail[];    }));
       
  }

}
