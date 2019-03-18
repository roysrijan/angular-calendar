import { Component, OnInit } from '@angular/core';
import { ShiftDetailService } from '../../shared/service/shift-detail.service';

@Component({
  selector: 'app-shift-employee-list',
  templateUrl: './shift-employee-list.component.html',
  styleUrls: ['./shift-employee-list.component.css']
})
export class ShiftEmployeeListComponent implements OnInit {

  constructor(private shiftDetailService: ShiftDetailService) { }
  message :string;
  ngOnInit() {
    this.shiftDetailService.currentMessage.subscribe(message => this.message = message)
  }


}
