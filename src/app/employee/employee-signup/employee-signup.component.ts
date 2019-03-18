declare var require:any;
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Employee } from '../../shared/model/employee.model';
import { EmployeeService } from '../../shared/service/employee.service';
import { ListItem } from '../../shared/model/list-item';
import { CommonService } from '../../shared/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-signup',
  templateUrl: './employee-signup.component.html',
  styleUrls: ['./employee-signup.component.css'],
  
})
export class EmployeeSignupComponent implements OnInit {
  
  emp:Employee;
  generator = require('generate-password');
  salt = this.generator.generate({    length: 10,    numbers: true});
  teamList :ListItem[];
  locationList:ListItem[];

  form = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
  middleName: new FormControl('',[ Validators.pattern('^[a-zA-Z \-\']+')]),
  lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
  EmployeeId: new FormControl('', [Validators.required]),
  Contact :new FormControl('', [Validators.required , Validators.pattern('[0-9]*' ),Validators.minLength(10),Validators.maxLength(10) ]),
  Team : new FormControl('', [Validators.required]),
  Location : new FormControl('',[ Validators.required]),
  email: new FormControl('', [Validators.required,Validators.email]),
  password: new FormControl('', [Validators.required,Validators.minLength(6)]) ,
  confirmPassword :  new FormControl('', [Validators.required]),
  Question : new FormControl('', [Validators.required]),
  Answer :new FormControl('', [Validators.required]),
 
 });

  constructor(private employeeService :EmployeeService,private commonService :CommonService,private modalService: NgbModal,private router: Router){
  }
  ngOnInit() {
    this.initialiseComponent();
  }

  initialiseComponent() {
    this.commonService.getTeams().toPromise().then(data=>{      this.teamList = data;     });
    this.commonService.getLocations().toPromise().then(data=>{      this.locationList = data;     });
  }

  onSubmit(content){
    if (this.form.valid) {
     
      let  encryptedPassword = CryptoJS.AES.encrypt(this.form.get('password').value.trim(),this.salt).toString();
      this.emp ={
        firstName:	this.form.get('firstName').value.trim(),
        middleName:	this.form.get('middleName').value.trim(),
        lastName:	this.form.get('lastName').value.trim(),
        employeeId:	this.form.get('EmployeeId').value.trim(),
        contactPhNo:	this.form.get('Contact'  ).value.trim(),
        teamId:	this.form.get('Team').value.trim(),
        locationId:	this.form.get('Location').value.trim(),
        emailAddress:	this.form.get('email').value.trim(),
        password:encryptedPassword,
        secretQuestion:	this.form.get('Question').value.trim(),
        secretAnswer:	this.form.get('Answer').value.trim(),
        salt: this.salt,
        isPasswordExpired : false
      };
      this.employeeService.registerEmployee(this.emp);
      this.modalService.open(content, { centered: true });
    }
  }
  continueToSignin(){
    this.router.navigate(['/user-signin']);

  }
}
