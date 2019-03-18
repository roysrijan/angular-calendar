import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions, RequestMethod ,Response} from '@angular/http';
import { map } from "rxjs/operators";
import { EmployeeShiftDetails } from '../model/employee-shift-details.model';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  serviceUrl ='http://localhost:57489/api/Employees/';
  msg : string;
  constructor(private http: Http) { }
  
  registerEmployee(employee :Employee) {
    let requestUrl = this.serviceUrl+"RegisterEmployee/";
    var body = JSON.stringify(employee);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(requestUrl,body,requestOptions).pipe(map(x => x.json())).subscribe();
  }

  validateEmployee(employeeId:string){
    console.log("in validate Employee");
   return this.http.get(this.serviceUrl+employeeId)
    .pipe(map((data : Response) =>{return data.json() as Employee;}));
  }

  
  getEmpComOffHolidayRequest(employeeId:string){
    console.log("in getEmpComOffHolidayRequest");
   return this.http.get(this.serviceUrl+"GetDetails/"+employeeId)
    .pipe(map((data : Response) =>{return data.json() as EmployeeShiftDetails[];}));
  }

  getSecretQnA(employeeId:string){
    console.log("in employee service ");
    return this.http.get(this.serviceUrl+"GetSecretQnA/"+employeeId)
    .pipe(map((data : Response) =>{return data.json() as string[];}));
  }

  saveNewPassword(obj){
    console.log("save new password"+JSON.stringify(obj));
    let requestUrl = this.serviceUrl+"SaveNewPassword/";
    var body = JSON.stringify(obj);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(requestUrl,body,requestOptions)
    .pipe(map(x => {console.log("save password : "+JSON.stringify(x.json()));this.msg = JSON.stringify(x.json());return x.json(); }))
    .subscribe();
  }
}
