import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule,Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule} from 'angular-calendar';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppComponent } from './app.component';
import { EmployeeSigninComponent } from './employee/employee-signin/employee-signin.component';
import { EmployeeSignupComponent } from './employee/employee-signup/employee-signup.component';
import { HomeComponent } from './home/home.component';
import { MyCalendarComponent } from './home/my-calendar/my-calendar.component';
import { MyShiftDetailsComponent } from './home/my-shift-details/my-shift-details.component';
import { AddLeaveRequestComponent } from './home/add-leave-request/add-leave-request.component';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { TeamShiftComponent } from './team-shift/team-shift.component';
import { ForgetpassComponent } from './employee/forgetpass/forgetpass.component';
import { TeamShiftUpdateComponent } from './team-shift/team-shift-update/team-shift-update.component';
import { TeamShiftViewComponent } from './team-shift/team-shift-view/team-shift-view.component';
import { MyWorklistComponent } from './my-worklist/my-worklist.component';
import { TeamCalendarComponent } from './my-worklist/team-calendar/team-calendar.component';
import { ShiftApprovalComponent } from './my-worklist/shift-approval/shift-approval.component';
import { LoginApprovalComponent } from './my-worklist/login-approval/login-approval.component';
import { ShiftEmployeeListComponent } from './my-worklist/shift-employee-list/shift-employee-list.component';




const routeLists:Routes=[
  {path:"", component:EmployeeSigninComponent},
  {path:"home", component:HomeComponent},
  {path:"team-shift",component:TeamShiftComponent},
  {path:"team-shift-update",component:TeamShiftUpdateComponent},
  {path:"user-signin",component:EmployeeSigninComponent},
  {path:"user-signup",component:EmployeeSignupComponent},
  {path:"forgot-password",component:ForgetpassComponent},
  {path:"team-shift-view",component:TeamShiftViewComponent},
  {path:"my-worklist",component:MyWorklistComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeSigninComponent,
    EmployeeSignupComponent,
    HomeComponent,
    MyCalendarComponent,
    MyShiftDetailsComponent,
    AddLeaveRequestComponent,
    AppHeaderComponent,
    TeamShiftComponent,
    ForgetpassComponent,
    TeamShiftUpdateComponent,
    TeamShiftViewComponent,
    MyWorklistComponent,
    TeamCalendarComponent,
    ShiftApprovalComponent,
    LoginApprovalComponent,
    ShiftEmployeeListComponent
    
   
  ],
  imports: [
    BrowserModule
    ,FormsModule
    ,CommonModule
    ,HttpClientModule
    ,HttpModule
    ,ToastrModule.forRoot()
    ,BrowserAnimationsModule
    ,RouterModule.forRoot(routeLists)
    ,NgbModule.forRoot()
    ,CalendarModule.forRoot()
    ,DataTablesModule
    ,ReactiveFormsModule
    ,NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
