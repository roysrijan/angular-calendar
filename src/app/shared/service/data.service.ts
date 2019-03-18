import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedUser = new BehaviorSubject("");
  
  private menuDisplayFlg = new BehaviorSubject(false);

  constructor() { }

  currentMenuDisplay = this.menuDisplayFlg.asObservable();
  changeMenuDisplay(menuDisplay:boolean){
    this.menuDisplayFlg.next(menuDisplay);
  }

  currentLoggedUser = this.loggedUser.asObservable();
  setCurrentLoggedUser(loggedUser:string){
    this.loggedUser.next(loggedUser);
  }

  


}
