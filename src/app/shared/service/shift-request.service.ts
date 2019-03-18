import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map } from "rxjs/operators";
import { ShiftRequest } from '../model/shift-request.model';
@Injectable({
  providedIn: 'root'
})
export class ShiftRequestService {
  serviceUrl ='http://localhost:57489/api/ShiftDetail/';
  constructor(private http : Http) { }
 
  postShiftRequest(shiftRequest : ShiftRequest, _employeeId : string,selectedShiftHidden :number){
    let requestUrl = this.serviceUrl+"PostShiftRequest/";
    console.log("selectedshift in object :"+ shiftRequest.selectedShift +",hidd:"+selectedShiftHidden);
    if(shiftRequest.selectedShift==undefined){
      shiftRequest.selectedShift = selectedShiftHidden;
    }
    console.log("--selected shift :"+shiftRequest.selectedShift);
    shiftRequest.employeeId = _employeeId;
    var body = JSON.stringify(shiftRequest);
    console.log("body"+body);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(requestUrl,body,requestOptions).pipe(map(x => x.json()));
  }
}
