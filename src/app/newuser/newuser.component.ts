import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  constructor(private api:AppserviceService, private currentR:ActivatedRoute, private router:Router, private location:Location) { }
  projectid:number = this.currentR.snapshot.params['id'];
  newUserForm = new FormGroup({
    'name':new FormControl('', [Validators.required]),
    'email':new FormControl('', [Validators.required]),
    'password':new FormControl('', [Validators.required]),
    'cpassword':new FormControl('', [Validators.required]),
    'answer':new FormControl('', [Validators.required]),
    'question':new FormControl('', [Validators.required]),
    'gender' : new FormControl('', [Validators.required]),
    'selectedGender': new FormControl('', [Validators.required])
  })

  onChangeGender(){
  const gender  = this.newUserForm.value.gender;
  this.newUserForm.patchValue({selectedGender:gender}); //testing purpose
  }
  get name(){
    return this.newUserForm.get('name');
  }
  get email(){
    return this.newUserForm.get('email');
  }
  get password(){
    return this.newUserForm.get('password');
  }
  get cpassword(){
    return this.newUserForm.get('cpassword');
  }
  get answer(){
    return this.newUserForm.get('answer');
  }
  get question(){
    return this.newUserForm.get('question');
  }
  get gender(){
    return this.newUserForm.get('gender');
  }
  userFormData = new FormData();
  addUser(){
    if(this.newUserForm.value.password === this.newUserForm.value.cpassword){
      this.userFormData.append("name", this.newUserForm.value.name);
      this.userFormData.append("email", this.newUserForm.value.email);
      this.userFormData.append("gender", this.newUserForm.value.gender);
      this.userFormData.append("question", this.newUserForm.value.question);
      this.userFormData.append("answer", this.newUserForm.value.answer);
      this.userFormData.append("password", this.newUserForm.value.password);
      this.userFormData.append("cpassword", this.newUserForm.value.cpassword);      
      console.warn(this.userFormData);
      this.api.addUser(this.userFormData).subscribe((res=>{
        if(res.status!==0){
            alert("You have been registered\nNow you can comment anywhere in my project/s");
            this.router.navigate(['home'])
        }else {
          alert("something wrong");
          console.warn(res);
        }
      }),
      error=>{
        alert("Please Reload the Page try again");
        console.warn(error);
        // window.location.reload();
       }
      )
    }else {
      alert("Please enter same password");
    }
  }

  ngOnInit(): void {

  }

}
