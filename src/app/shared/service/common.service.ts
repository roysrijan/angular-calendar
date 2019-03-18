import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";
import { ListItem } from '../model/list-item';
import { ShiftDetail } from '../model/shift-detail.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  serviceUrl='http://localhost:57489/api/';

  constructor(private http : Http) { }


  getShifts(fetchType){
    let requestUrl = this.serviceUrl+"Common/GetShifts/"+fetchType;
  console.log("in common service , getShifts function . requestUrl :"+requestUrl);
    return this.http.get(requestUrl)
    .pipe(map((data : Response) =>{ console.log("got the data"); return  data.json() as ShiftDetail[];    }));
      
  }

  getLocations(){
    let requestUrl = this.serviceUrl+"Common/GetLocations/";
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ console.log("got the data from getLocations"); return  data.json() as ListItem[];    }));
  }

  getTeams(){
    let requestUrl = this.serviceUrl+"Common/GetTeams/";
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ console.log("got the data from getTeams"); return  data.json() as ListItem[];    }));
  }

  getRoles(){
    let requestUrl = this.serviceUrl+"Common/GetRoles/";
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ console.log("got the data from getRoles"); return  data.json() as ListItem[];    }));
  }

  getAllActiveUsers(fetchParam){
    let requestUrl = this.serviceUrl+"Common/GetUsers/"+fetchParam;
    return this.http.get(requestUrl)
   .pipe(map((data : Response) =>{ console.log("got the data from getTeams"); return  data.json() as ListItem[];    }));
  }
}
