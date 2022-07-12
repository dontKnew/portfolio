import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private api:ProjectService, private route:Router) { }

  userData:any;  
  getUser(){
    this.api.getUser().subscribe(res=>{
      console.warn(res);
      if(res!==null){
        this.userData = res.body;
      }else {

      }
    },
    err=>{
      alert("someting wrong sajid bhai");
    }
    )
  }

  editUser(data:any){
    this.route.navigate(['/edituser', data.user_id])    
  }
  deleteUser(data:any){
    this.api.deleteUser(data.user_id).subscribe(res=>{
      alert('User Deleted');
      this.getUser();
    },
    err=>{
      alert("someting wrong sajid bhai"+data.id);
    }
    )
  }
  newUser(){
    this.route.navigate(['/newuser']);
  }
  ngOnInit(): void {
    this.getUser();
  }

}
