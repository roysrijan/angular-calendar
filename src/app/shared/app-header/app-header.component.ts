import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent  implements OnInit  {

  headerClass='jumbotron';
  navClass='navDown';
 
  menuDisplay:boolean;
  loggedUser:string;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMenuDisplay.subscribe(menuDisplay=> this.menuDisplay= menuDisplay);
    this.data.currentLoggedUser.subscribe(loggedUser=>this.loggedUser= loggedUser);
  }

  
 
}
