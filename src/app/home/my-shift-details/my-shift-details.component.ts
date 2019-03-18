import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Employee } from '../../shared/model/employee.model';
import { map, first } from "rxjs/operators";
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { EmployeeService } from '../../shared/service/employee.service';
import { EmployeeShiftDetails } from '../../shared/model/employee-shift-details.model';

@Component({
  selector: 'app-my-shift-details',
  templateUrl: './my-shift-details.component.html',
  styleUrls: ['./my-shift-details.component.css']
})
export class MyShiftDetailsComponent implements OnInit {
  Detailsall : any; 
  s : string;
  short : string[] ;
  Details :object;
  dt : Date;
  detail :object;
  holiday : object;
  holidays : any[]=[];
   empDetails :EmployeeShiftDetails;

  constructor(private http: Http,private router: Router,private empService :EmployeeService) { }

  async ngOnInit() { 
    this.getData();
  }
  

  
getData(){
  if(!sessionStorage.getItem('user'))
  this.router.navigate(['/user-signin']);
  this.empService.getEmpComOffHolidayRequest(sessionStorage.getItem('user')).subscribe(data => 
    {
      if(data!=null && data.length>0)
      {
        this.empDetails = data[0];
        if(this.empDetails.requestInQueue!=undefined){
          if(this.empDetails.requestInQueue.length<=0){
            console.log("no requests");
            this.empDetails.requestInQueue=[];
          }
        }
        console.log("in get data:"+JSON.stringify(this.empDetails));
      }
    });
}

//  async dataload():Promise<object>{
//   if(!sessionStorage.getItem('user'))
//   this.router.navigate(['/user-signin']);
 
 
 
//   await this.http.get('http://localhost:57489/api/employees/'+sessionStorage.getItem('user'))
//   .pipe(map((data : Response) =>{
//     console.log("response:"+JSON.stringify(data.json()));
//     return data.json() as Employee[];
//   })).toPromise().then(x => {
//     this.Detailsall = JSON.stringify(x);
//     this.s = this.Detailsall.split("],")[1];
//     this.short=this.s.split(':[');
//     this.s=this.short[1];
    
//     this.Details=eval('['+this.s+']');
//     console.log(JSON.stringify(this.Details));
//     this.s = this.Detailsall.split("],")[3];
    
//     this.short=this.s.split(':[');
//     this.s=this.short[1];
//     this.holiday=eval('['+this.s+']');
//     console.log("log:"+JSON.stringify(this.holiday));
//   });

//   return this.Details;
//  }   
 

}
