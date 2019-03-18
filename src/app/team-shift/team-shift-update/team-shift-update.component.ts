import { Component, OnInit, OnDestroy , ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import {ShiftDetail,UserShiftDetail} from '../../shared/model/shift-detail.model';
import { CommonService } from '../../shared/service/common.service';
import { ShiftDetailService } from '../../shared/service/shift-detail.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListItem } from '../../shared/model/list-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-shift-update',
  templateUrl: './team-shift-update.component.html',
  styleUrls: ['.././team-shift.component.css']
  ,providers: [NgbModal]
})
export class TeamShiftUpdateComponent implements  OnDestroy, OnInit {
  ColumnRow: string;
  ShiftTypes : ShiftDetail[];
  monthShiftDetail: ShiftDetail[]  ;
  monthUsersShift: UserShiftDetail[] ;
  noOfDaysInMonth : number;  year:number;  month:number;
  
  selectedEmpId:string;selectedEmpName:string;selectedDay:number;selectedDate:string;
  FromDate:Date;ToDate:Date;
  users : ListItem[]=[];selectedUsers : ListItem[]=[];  dropdownSettings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  
  constructor(private router: Router,private commonService :CommonService,private shiftDetailService : ShiftDetailService,private modalService: NgbModal
  ) { }

  async ngOnInit() {
    await this.commonService.getShifts('all').subscribe(data=>{this.ShiftTypes = data;});
    
    await this.initDates();
    
    await this.shiftDetailService.getUsersMonthlyShift("all",new Date().getMonth()+1,new Date().getFullYear())
          .subscribe(data=>{
              
                this.monthUsersShift =data;
                this.monthUsersShift.forEach(element=>{ 
                   let e={
                   objText :element.employeeName,
                   objValue : element.employeeId};
                   this.users.push(e);
                  console.log("emp:"+e.objText);
                });
                console.log("users :"+JSON.stringify(this.users));
                // Calling the DT trigger to manually render the table
                this.dtTrigger.next();
              });;
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



  initDates()
  {
    let d = new Date();
    this.month=d.getMonth()+1;
    this.year = d.getFullYear();
    this.noOfDaysInMonth = new Date(this.year,this.month,0).getDate();
    this.dropdownSettings = {singleSelection: false,idField: 'objValue',textField: 'objText',
      selectAllText: 'Select All',unSelectAllText: 'UnSelect All',itemsShowLimit: 3,allowSearchFilter: true
    };
  }
  saveShift(selectedShift) {
    let shiftDetail :ShiftDetail;
    
    if(this.ColumnRow!=undefined && this.ColumnRow.indexOf("|")>0){
    let selectedEmp = this.ColumnRow.split("|")[0];
    let selectedDate = this.ColumnRow.split("|")[1];
    console.log("selected Emp :"+selectedEmp+",selected Date :"+selectedDate);
    this.ShiftTypes.forEach(shift => {
      if(shift.shiftId==selectedShift){
        shiftDetail = shift;
      }
    });

    this.monthUsersShift.forEach(element => { 
      if(element.employeeId==selectedEmp){
        element.monthShift.forEach(dailyShift => {
          
          if(dailyShift.shiftDay.toString()==selectedDate){
             dailyShift.shiftCssClass = shiftDetail.shiftCssClass;
             dailyShift.shiftId = shiftDetail.shiftId;
             dailyShift.shiftName = shiftDetail.shiftName;
             dailyShift.shiftShortName = shiftDetail.shiftShortName;
             this.ColumnRow =undefined;
             this.dtTrigger.next();         
          }
        });
      }
      
    });
    
  }
  }

  copyDay(callback){
    console.log("copy day");
    let fromDt :number = JSON.parse(JSON.stringify(this.FromDate)).day;
    let toDt :number =JSON.parse(JSON.stringify(this.ToDate)).day;
    this.monthUsersShift.forEach(element=>{
      let selectedShift :ShiftDetail;
      this.selectedUsers.forEach(selUser=>{
        if(selUser.objValue==element.employeeId){
          // get shift for that employee of the selected date
          element.monthShift.forEach(shift=>{
            if(shift.shiftDay==this.selectedDay){
              selectedShift = shift;
            }           
          });
          // copy shift to selected date range for the same employee
          element.monthShift.forEach(s=>{
            if(s.shiftDay >= fromDt && s.shiftDay<=toDt){
              s.shiftCssClass = selectedShift.shiftCssClass;
              s.shiftId = selectedShift.shiftId;
              s.shiftName = selectedShift.shiftName;
              s.shiftShortName = selectedShift.shiftShortName;
              
            }
          });
        }
      });
    });
    console.log("-----------copying done");
    // Calling the DT trigger to manually render the table
    this.dtTrigger.next();
    this.resetModal(callback);
  }


  copyShift(callback){
   // console.log("copy shift,employeeId :"+this.selectedEmpId+"from date :"+JSON.stringify(this.FromDate)+"to date:"+JSON.stringify(this.ToDate));
   // console.log("selected users :"+JSON.stringify(this.selectedUsers)  );
    let selectedShiftDetail : ShiftDetail[]=[];
    let fromDt :number = JSON.parse(JSON.stringify(this.FromDate)).day;
    let toDt :number =JSON.parse(JSON.stringify(this.ToDate)).day;
   // console.log("fromDt :"+fromDt+",toDt:"+toDt);
    this.monthUsersShift.forEach(element=>{ 
      if(element.employeeId==this.selectedEmpId){
        element.monthShift.forEach(s=>{
          if(s.shiftDay >= fromDt && s.shiftDay<=toDt){
            selectedShiftDetail.push(s);
          }
        });
    }
  });
  //console.log("++++++"+JSON.stringify(selectedShiftDetail));
    this.monthUsersShift.forEach(element=>{
      this.selectedUsers.forEach(user=>{
        if(element.employeeId==user.objValue){
          element.monthShift.forEach(s=>{
            selectedShiftDetail.forEach(d=>{
              if(s.shiftDay==d.shiftDay){
                s.shiftCssClass = d.shiftCssClass;
                s.shiftId = d.shiftId;
                s.shiftName = d.shiftName;
                s.shiftShortName = d.shiftShortName;
              }
            });
          });
        }
      });
    });
    // Calling the DT trigger to manually render the table
    this.dtTrigger.next();
    this.resetModal(callback);
    
  }

  resetModal(callback){
    this.selectedEmpId="";
    this.selectedEmpName="";
    this.selectedUsers=[];
    this.selectedDate="";
    this.selectedDay=0;
    this.FromDate= new Date();
    this.ToDate = new Date();
    callback();
  }

  getDetails( shiftDay, employeeId) {
    this.ColumnRow = employeeId +"|"+ shiftDay;
   // console.log("shift Date:" + shiftDay + "|shift type:" + shiftType + "|columnRow:" + this.ColumnRow);

  }
  copyEmpShiftToOtherEmp(employeeId,employeeName,content){
    this.selectedEmpId=employeeId;
    this.selectedEmpName=employeeName;
    console.log("copyEmpShiftToOtherEmp, employee Id:"+employeeId+",employee Name:"+employeeName);
    this.modalService.open(content);
  }

  copyDayShiftToOtherDays(day,content){
    console.log("copyDayShiftToOtherDays, day:"+day);
    this.selectedDay=day;
    this.selectedDate = day+"-"+this.month+"-"+this.year;
    this.modalService.open(content);
  }

  save(){
   // console.log("save to db");
    let replyMessage = this.shiftDetailService.saveEmployeesMonthlyShift(this.monthUsersShift,this.month,this.year);
  }
  async reset(){
    await this.shiftDetailService.getUsersMonthlyShift("all",new Date().getMonth()+1,new Date().getFullYear())
    .subscribe(data=>{
        
          this.monthUsersShift =data;
          this.monthUsersShift.forEach(element=>{ 
             let e={
             objText :element.employeeName,
             objValue : element.employeeId};
             this.users.push(e);
            console.log("emp:"+e.objText);
          });
          console.log("users :"+JSON.stringify(this.users));
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });;
    console.log("reset");
  }
  cancel(){
    this.router.navigate(['/home']);
    console.log("cancel");
  }

  // getMonthName(monthNo){
  //   switch(monthNo){
  //     case 1:return "Jan";
  //     case 2:return "Feb";
  //     case 3:return "Mar";
  //     case 4:return "Apr";
  //     case 5:return "May";
  //     case 6:return "Jun";
  //     case 7:return "Jul";
  //     case 8:return "Aug";
  //     case 9:return "Sep";
  //     case 10:return "Oct";
  //     case 11:return "Nov";
  //     case 12:return "Dec";
  //     default :return "";      
  //   }
  // }
}
