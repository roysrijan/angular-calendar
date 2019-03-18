import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../shared/service/common.service';
import { ListItem } from '../../shared/model/list-item';
import { NgForm } from '@angular/forms';
import { ShiftRequestService } from '../../shared/service/shift-request.service';
import { ShiftDetail } from '../../shared/model/shift-detail.model';


@Component({
  selector: 'app-add-leave-request',
  templateUrl: './add-leave-request.component.html',
  styleUrls: ['./add-leave-request.component.css']
 })
export class AddLeaveRequestComponent implements OnInit {
  shiftList :ShiftDetail[];
  requestTypeSelected : string;
  selectedShiftHidden :number;
  constructor(private commonService:CommonService,private shiftRequestService : ShiftRequestService) { }

  ngOnInit() 
  {
    
    this.getShifts('all');
  }

  getShifts(fetchType)
  {
    console.log("in get shifts");
    this.commonService.getShifts(fetchType).toPromise().then(data=>{
      this.shiftList = data; 
      this.selectedShiftHidden = data[0].shiftId;
    });
  }


  onSubmit(form: NgForm) {
    
    this.shiftRequestService.postShiftRequest(form.value,sessionStorage.getItem('user'),this.selectedShiftHidden).subscribe(data => {
      console.log("Request submitted. requestId:"+data.requestId);
    });
    console.log("end Submit");
    
  }
}
