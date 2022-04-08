import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../author/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public ServiceAuth:AuthService, private route:Router) { }

  ngOnInit(): void {
  }

  loginAdminBtn(){
    if(this.ServiceAuth.isLogin()){
        this.ServiceAuth.logout();
        this.route.navigate(['/home']);
    }else{
      this.route.navigate(['/author']);
    }
  }

}
