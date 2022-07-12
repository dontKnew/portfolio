import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private api:ProjectService){}

  showDataP:boolean = false;
  showDataU:boolean = false;
  showData(){
    this.showDataP = true;
    this.showDataU = false;
    localStorage.setItem("usersTab", "false");
  }
  showData1(){
    this.showDataU = true;
    this.showDataP = false;
    localStorage.setItem("usersTab", "true");
  }

  ngOnInit(): void {
    if(localStorage.getItem("usersTab")=="true") {
      this.showDataU = true;
    }else {
      this.showDataP = true;
    }
  }
}
