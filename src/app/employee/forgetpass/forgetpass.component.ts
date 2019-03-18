declare var require:any;
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../shared/service/employee.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  secretQuestion:string ;
  secretAnswer:string ;
  empId :string;
  res : Observable<any>;
  changepassword :FormGroup;
  errMsg:string;
  generator = require('generate-password');
  salt = this.generator.generate({    length: 10,    numbers: true});

  constructor(private http: Http,private router: Router,private empService :EmployeeService,private route: ActivatedRoute) { }

  async ngOnInit() {  

     this.route.queryParams.subscribe(params => {
      this.empId = params['empId'];
      
      console.log("employee Id"+this.empId);
      this.changepassword =  new FormGroup({
        employeeid: new FormControl(this.empId, [Validators.required]),
        answer: new FormControl('', [Validators.required]),
        password : new FormControl('', [Validators.required,Validators.maxLength(12),Validators.minLength(6)]),
        password1: new FormControl('', [Validators.required]),
       });
      this.getSecretInfo(this.empId);
     
    });
   
  }


  redirectToSignIn(){
    console.log("in redirect to signin");
    this.router.navigate(['/user-signin']);
  }

  async getSecretInfo(empId:string){
        // get secret info from database
    await this.empService.getSecretQnA(empId).subscribe(data => 
      {
        if(data!=null && data.length>=1){
          //set secretQuestion and secretAnswer
          this.secretQuestion=data[0];
          this.secretAnswer=data[1];
          console.log("secret :"+this.secretQuestion+"|:"+this.secretAnswer);
        }
        
      });
    
  }

  onSubmit(){
    
    if (this.changepassword.valid) {
      var formValue = this.changepassword.value;
      if(formValue.answer==this.secretAnswer){
         let  encryptedPassword = CryptoJS.AES.encrypt(formValue.password,this.salt).toString();
        formValue.password1= encryptedPassword;
        formValue.password = this.salt;
        this.empService.saveNewPassword(formValue);
        this.errMsg =this.empService.msg;
      }else{
        this.errMsg ="Incorrect answer.Please try again";

      }
    //   var body = JSON.stringify(this.changepassword.value);
    //   var headerOptions = new Headers({'Content-Type':'application/json'});
    //   var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    //   this.res=this.http.post('http://localhost:57489/api/employees/',body,requestOptions).pipe(map(x => x.json()));
    //   this.res.subscribe(response => {
    //     console.log("caught"+JSON.stringify(response));
    //     return response;
    // }, err => {
    //     throw err;
    // });

    }
  }
}
