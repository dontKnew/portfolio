// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {ChangeDetectorRef, Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../author/auth.service';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private router:Router, public userAuth:AppserviceService,  public ServiceAuth:AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route:Router, private currentR:ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logoutUser(){
    // this.router.navigate['']
    this.userAuth.logoutUser();

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  backTo(url:any){
    this.route.navigate([url], {relativeTo:this.currentR})
  }
  search(data:any){
    alert("This search function is not working yet...");
    data.reset();
  }
  // loginBtnText = this.ServiceAuth.loginBtnText;
  loginAdminBtn(){
    if(this.ServiceAuth.isLogin()){
        this.ServiceAuth.logout();
        this.backTo("/home");
    }else{
        this.backTo('/author');
    }
  }

  showUserForm!:boolean;
  formHeading!:boolean;
  newUserForm(){
    this.formHeading = false;
    this.newUserHeading = true;
    this.router.navigate(['userCreate']);
  }
  loginUserForm(){
    this.formHeading = true;
    this.newUserHeading = false;
    this.router.navigate(['userLogin']);
  }
  newUserHeading:boolean = false;
  showModal = false;
  toggleuserFormModal(){
    this.showUserForm = false;
  }
  ngOnInit(): void {
    this.ServiceAuth.isLogin();
    this.userAuth.isAuthenticatedUser();
  }
}
