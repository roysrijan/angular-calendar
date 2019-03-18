import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/model/employee.model';
import { map, first } from "rxjs/operators";
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Router} from '@angular/router';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';
import { DataService } from '../../shared/service/data.service';
import * as CryptoJS from 'crypto-js';
import { EmployeeService } from '../../shared/service/employee.service';

@Component({
  selector: 'app-employee-signin',
  templateUrl: './employee-signin.component.html',
  styleUrls: ['./employee-signin.component.css'],
  
})
export class EmployeeSigninComponent implements OnInit {
  Detailsall : any; 
  s : string;
  short : string[] ;
  Details :Employee;
  dt : Date;
  detail :object;
  errMsg:string;
  forgotPwd=false;
form = new FormGroup({
  
  EmployeeId: new FormControl('', [Validators.required]),
 // firstName: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required,Validators.minLength(6)])
 });

  constructor(private http: Http,private router: Router,private data: DataService,private empService :EmployeeService){
  }
  ngOnInit() {
    this.forgotPwd=false;
    this.errMsg ="";
  }
  onSubmit(){
  console.log("in submit");
    var enteredEmployeeId = this.form.get('EmployeeId').value.trim();
    var enteredPassword = this.form.get('password').value.trim();
    if (this.form.valid) {
      this.empService.validateEmployee(enteredEmployeeId).subscribe(data => 
        {
          var employee = data;
          if(employee.isPasswordExpired){
            this.data.changeMenuDisplay(false);
            this.router.navigate(['/forgot-password'],{ queryParams:{empId:enteredEmployeeId}, queryParamsHandling: 'merge' });
          }else{
            var decryptedPass = CryptoJS.AES.decrypt(employee.password,employee.salt).toString(CryptoJS.enc.Utf8);

            console.log(decryptedPass);
            if(employee.employeeId.trim()==enteredEmployeeId && decryptedPass==enteredPassword)
            {
                sessionStorage.setItem('user',employee.employeeId);
                sessionStorage.setItem('userName',employee.firstName+" "+employee.lastName);
                this.data.setCurrentLoggedUser(sessionStorage.getItem('userName'));
                this.data.changeMenuDisplay(true);
                this.router.navigate(['/home']);
            }else{
                  this.errMsg ="You have entered incorrect credentials";
            }
          }
      });
    }
  }
  validateForgetPassword(event){
    event.preventDefault();
    var employeeId = this.form.get('EmployeeId').value.trim();
    if(employeeId==""){
      this.forgotPwd=true;
    }else{
      this.forgotPwd=false;
      this.router.navigate(['/forgot-password'], { queryParams: { empId: employeeId}, queryParamsHandling: 'merge' });
    }
  }

}
