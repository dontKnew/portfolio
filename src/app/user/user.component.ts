import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private currentR: ActivatedRoute, private userapi:AppserviceService, private api:AppserviceService, private route:Router, private location:Location) { }
  projectid:number = this.currentR.snapshot.params['id'];
  loginUser(data:any){
    this.api.isUserLogin(data.email,data.password).subscribe((response=>{
      if(response.status > 0 ){
        this.api.loginUser(data.email);
        this.api.LoginHeader = false;
        alert("Hey, Welcome back");
        // this.route.navigate(['project/'+this.projectid],{fragment:"userLogged"});
      }else {
        alert("login failed due to wrong credientials");
      }
    }))
  }
  
  ngOnInit(): void {
    if(this.api.isAuthenticatedUser()){
      console.warn("login true");
    }else {
      console.warn("user logout");
    }
  }
}
