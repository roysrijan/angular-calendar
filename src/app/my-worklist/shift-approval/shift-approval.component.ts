import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalService } from '../../shared/service/approval.service';
import { Subject } from 'rxjs';
import { ShiftRequest } from '../../shared/model/shift-request.model';
import { ShiftDetailService } from '../../shared/service/shift-detail.service';

@Component({
  selector: 'app-shift-approval',
  templateUrl: './shift-approval.component.html',
  styleUrls: ['./shift-approval.component.css']
})
export class ShiftApprovalComponent implements OnInit {
  dtTrigger= new Subject();
  shiftRequestList:ShiftRequest[]=[];
  loggedUser :string;
  constructor(private router :Router,private approvalService : ApprovalService,private shiftDetailService:ShiftDetailService) { }

  ngOnInit() {
    this.getShiftRequest();
  }
  

  getShiftRequest(){
    if(!sessionStorage.getItem('user'))
    this.router.navigate(['/user-signin']);
    this.loggedUser =sessionStorage.getItem('user');
  this.approvalService.getAllShiftRequests(sessionStorage.getItem('user')).subscribe(data => 
    {
      if(data!=null && data.length>0)
      {
        this.shiftRequestList = data;
        this.dtTrigger.next();
      console.log("in getShiftRequest:"+JSON.stringify(this.shiftRequestList));
      }
    });
  }

  saveShiftRequest(approveOrReject,requestId){
    console.log("inshavereq");
    this.approvalService.saveShiftApproval(approveOrReject,requestId,this.loggedUser).subscribe(data=>{
    //referesh team calendar
    this.refreshCalendar();
    //refresh the table
    this.getShiftRequest();
    });
    }

refreshCalendar(){
this.shiftDetailService.setSubject(1);
}

}
