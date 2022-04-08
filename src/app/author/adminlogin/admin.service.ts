import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  databaseurl = "https://myfirstjson.herokuapp.com/admins"
  constructor(private _http:HttpClient) { }
  getUser(data:any){
    return this._http.get<any>("https://myfirstjson.herokuapp.com/admins").pipe(map((res:any)=>{
      return res;
    }))
  }
}

// export class AddProjectStructure{
//   id:number = 0;
//   name:string = "";
//   version:string  = "";
//   languages:string = "";
//   level:string = "";
//   downloadLink:string = "";
//   previewLink:string = "";
//   description:string = "";
//   date:string = "";
// }
