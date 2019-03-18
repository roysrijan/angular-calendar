import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions, RequestMethod ,Response} from '@angular/http';
import { map } from "rxjs/operators";
import { LoginApproval } from '../model/login-approval.model';
import { ShiftRequest } from '../model/shift-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  serviceUrl:string="http://localhost:57489/api/";

  constructor(private http:Http) { }
  
  getAllLoginRequests(managerId){
    
    let requestUrl = this.serviceUrl+"Worklist/GetAllLoginRequests/"+managerId;
  //  console.log("request URL :"+ requestUrl);
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ console.log("approvalService --> getAllLoginRequests"); return  data.json() as LoginApproval[];   
   }));
  }

  getAllShiftRequests(managerId){
    let requestUrl = this.serviceUrl+"Worklist/GetAllShiftRequests/"+managerId;
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{
    console.log("approvalService --> getAllShiftRequests");
     return  data.json()    ;}));
  }

  saveLoginApproval(approveOrReject,requestId,managerId){
    let requestUrl = this.serviceUrl+"Worklist/SaveLoginApproval/";
    var obj = {approveOrReject :approveOrReject, requestId : requestId, managerId : managerId};
    var body = JSON.stringify(obj);
    console.log("body"+body);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(requestUrl,body,requestOptions).pipe(map(x => x.json()));
   // console.log("approvalService --> saveLoginApproval ==>"+approveOrReject+",requestId:"+requestId+",managerId:"+managerId);
  }

  saveShiftApproval(approveOrReject,requestId,managerId){
    let requestUrl = this.serviceUrl+"Worklist/SaveShiftApproval/";
    var obj = {approveOrReject :approveOrReject, requestId : requestId, managerId : managerId};
    var body = JSON.stringify(obj);
    console.log("body:::"+body);
    console.log("requestUrl:"+requestUrl);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(requestUrl,body,requestOptions).pipe(map(x => x.json()));
   // console.log("approvalService --> saveShiftApproval ==>"+approveOrReject+",requestId:"+requestId+",managerId:"+managerId);

  }

}
