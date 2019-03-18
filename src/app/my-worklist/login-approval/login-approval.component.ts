import { Component, OnInit } from '@angular/core';
import { LoginApproval } from '../../shared/model/login-approval.model';
import { Router } from '@angular/router';
import { ApprovalService } from '../../shared/service/approval.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-approval',
  templateUrl: './login-approval.component.html',
  styleUrls: ['./login-approval.component.css']
})
export class LoginApprovalComponent implements OnInit {

  constructor(private router :Router,private approvalService : ApprovalService) { }
  dtTrigger= new Subject();
  userList:LoginApproval[]=[];
  loggedUser :string;
  ngOnInit() {
    this.getLoginRequest();
  }
  
  getLoginRequest(){
    if(!sessionStorage.getItem('user'))
    this.router.navigate(['/user-signin']);
    this.loggedUser =sessionStorage.getItem('user');
  this.approvalService.getAllLoginRequests(sessionStorage.getItem('user')).subscribe(data => 
    {
      if(data!=null && data.length>0)
      {
        this.userList = data;
        this.dtTrigger.next();
      //  console.log("in getLoginRequest:"+JSON.stringify(this.userList));
      }
    });
  }

saveLoginRequest(approveOrReject,requestId){
    
this.approvalService.saveLoginApproval(approveOrReject,requestId,this.loggedUser).subscribe();
  }
}
