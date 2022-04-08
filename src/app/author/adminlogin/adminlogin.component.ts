import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';  

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  loadingLoginBtn:boolean   = false;
  constructor( private route:Router, private api:ProjectService, private ServiceAuth:AuthService){
    // alert("Email : admin@failureboy.com\nPassword : failureboy786\n\nNote : login will be  expired while refersh browser")
  }
  ngOnInit(): void {
    this.ServiceAuth.isLogin();
  }
  loginAdmin(data:any){
    this.loadingLoginBtn = true;
      this.api.isLogin(data.email,data.password).subscribe(response=>{
        console.warn(response);
        if(response.count > 0){
          //authentication... 
          this.ServiceAuth.login(data.email);
          this.route.navigate(['/dashboard']);
          // styling...
          this.loadingLoginBtn = false;
        }else{
          alert("Please enter correct email and password");
          this.loadingLoginBtn = false;
        }
      },
      err=>{
        console.warn("someting wrong sajid bhai", err);
      })
  }
}
