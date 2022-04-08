import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { newProjectModule } from '../project.module';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewUserAuthor implements OnInit {

  constructor(private projectType:newProjectModule, private api:ProjectService, private currentRoute:ActivatedRoute, private route:Router, private location:Location){}
  imageUrl:string = "";
  showImage:boolean = false;
  showbtnfetch:boolean = false;
  profile:boolean = false;
  file!:File;
  userid:number = this.currentRoute.snapshot.params['id'];
  profileProcessing(event:any){
    this.profile = true;
    this.file = event.target.files[0];
    if(event.target.files.length > 0 ){
      this.showImage = true;
      this.profile = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      }
      reader.readAsDataURL(this.file)
    }else {
      this.showImage  = false;
      this.profile = true;
    }
  }
  newUserForm:any = new FormGroup({
    "userName":new FormControl("", [Validators.required]),
    "email":new FormControl("", [Validators.required]),
    "selectedGender":new FormControl("", [Validators.required]),
    "gender":new FormControl("", [Validators.required]),
    "question":new FormControl("", [Validators.required]),
    "answer":new FormControl("", [Validators.required]),
    "password":new FormControl("", [Validators.required]),
    "cpassword":new FormControl("", [Validators.required]),
  })
  onChangeGender(){
    const gender  = this.newUserForm.value.gender;
    this.newUserForm.patchValue({selectedGender:gender}); //testing purpose
    }
  get userName(){
    return this.newUserForm.get('userName');
  }
  get question(){
    return this.newUserForm.get('question');
  }
  get email(){
    return this.newUserForm.get('email');
  }
  get selectedGender(){
    return this.newUserForm.get('selectedGender');
  }
  get gender(){
    return this.newUserForm.get('gender');
  }
  get answer(){
    return this.newUserForm.get('answer');
  }
  get password(){
    return this.newUserForm.get('password');
  }
  get cpassword(){
    return this.newUserForm.get('cpassword');
  }
  btnAddUser:string = "Add User";
  formData = new FormData();
  newUser(){
      if(this.newUserForm.value.password === this.newUserForm.value.cpassword){
          this.formData.append("name", this.newUserForm.value.userName);
          this.formData.append("email", this.newUserForm.value.email);
          this.formData.append("gender", this.newUserForm.value.gender);
          this.formData.append("question", this.newUserForm.value.question);
          this.formData.append("answer", this.newUserForm.value.answer);
          this.formData.append("password", this.newUserForm.value.password);
          this.formData.append("cpassword", this.newUserForm.value.cpassword);
          if(!this.file){
          this.profile = true;
          console.warn("file not selected");
          }else {
          this.btnAddUser = "Please wait...";
          this.formData.append("profile",this.file);
          this.api.newUserByImage(this.formData).subscribe(res=>{
          console.warn(res);
              this.imageUrl= "";
              this.showImage=false;
              this.btnAddUser = "Add User";
              alert("User Added");
              // this.location.back();
          }, erro=>{
              console.warn(erro);
          }) 
          }
      }else {
          alert("Please enter same password");
      }
    }

  // update functionality...
  getEditUser(){
    console.warn("function called");
    let id:number  = this.currentRoute.snapshot.params['id'];
    this.api.getOneUser(id).subscribe(res1=>{
      const res = res1.body;
      this.newUserForm.setValue({
          userName:res.user_name, 
          email:res.user_email,
          gender:res.user_gender,
          selectedGender:res.user_gender,
          password:res.user_password, 
          cpassword:res.user_password, 
          question:res.user_question, 
          answer:res.user_answer, 
      });
      this.imageUrl= res.user_profile;
      this.showImage=true;
    },
    err=>{
      alert("someting wrong sajid bhai");
    })
  }
  updateUser(){
    console.warn(this.newUserForm.value.userName);
    if(this.newUserForm.value.password === this.newUserForm.value.cpassword){
        this.formData.append("name", this.newUserForm.value.userName);
        this.formData.append("email", this.newUserForm.value.email);
        this.formData.append("gender", this.newUserForm.value.gender);
        this.formData.append("question", this.newUserForm.value.question);
        this.formData.append("answer", this.newUserForm.value.answer);
        this.formData.append("password", this.newUserForm.value.password);
        this.formData.append("cpassword", this.newUserForm.value.cpassword);
        this.formData.append("profile",this.file);
        let id = this.currentRoute.snapshot.params['id']
        this.api.updateUser(this.formData,id).subscribe(res=>{
        alert("User Data has been Updated");
        this.imageUrl= "";
        this.showImage=false;
        // this.location.back();
        localStorage.setItem('usersTab',"true")
        }, erro=>{
        console.warn(erro);
        })
    }else {
        alert("Please enter the same password");
    }
  }
  ngOnInit(): void {
    // for edit page show buttons or not 
    if(this.currentRoute.snapshot.params['id']){
      this.showbtnfetch  = true;
      this.getEditUser();
    }
  }
}
