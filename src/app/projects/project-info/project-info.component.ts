import { Component, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProjectService } from 'src/app/author/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { commentModule } from 'src/app/author/project.module';
import { AppserviceService } from 'src/app/appservice.service';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css'],
  providers:[commentModule]
})
export class ProjectInfoComponent implements OnInit {
  showUserForm!:boolean;
  formHeading!:boolean;
  formData = new FormData(); // used for the send data to php
  constructor(
    
    private currentR:ActivatedRoute, public userapi:AppserviceService, private api:ProjectService, private commentModule:commentModule, private router:Router) {}
  project:any = "";
  projectid:number = this.currentR.snapshot.params['id'];
  comments:any;
  showCommentBox:boolean = false;
  showReplyCommentBox:boolean = false;
  fetchedComment:any = "";
  fetchedRepliesComment:any = "";
  today:any = new Date();
  hidePostReply:boolean = false;
  commentBox(){
      this.showCommentBox = true; 
  }
  replyCommentBox(){
    this.showReplyCommentBox = true; 
  }
alreadyUser:string = "";
commentForm = new FormGroup({
  comment:new FormControl("",[Validators.required])
})

commentPostMessage:string = ""
commentLoad!:boolean;
disableBtn:boolean= false;
newUserForm(){
  this.router.navigate(['newuser/'+this.projectid], {relativeTo:this.currentR});
  this.formHeading = false;
  this.newUserHeading = true;
}
newUserHeading:boolean = false;
loginUserForm(){
  this.formHeading = true;
  this.newUserHeading = false;
  this.router.navigate(['user/'+this.projectid], {relativeTo:this.currentR});
}


addComment(){  
  if(this.userapi.isAuthenticatedUser()){
    if(this.commentForm.invalid){
      this.commentPostMessage = "Please do not blank input box...";
    }else{
      this.commentLoad = true;
      this.commentPostMessage = "Processing...";
      this.disableBtn = true;
      
      this.commentModule.email = localStorage.getItem("sessionUserEmail");
      this.commentModule.comment = this.commentForm.value.comment;
      this.commentModule.projectid = this.projectid;

      this.formData.append("email",this.commentModule.email); 
      this.formData.append("comment",this.commentModule.comment);
      this.formData.append("projectid", this.commentModule.projectid); 

      this.api.addComment(this.formData).subscribe((res=>{
        this.commentPostMessage = "New comment added";
        this.commentForm.reset();
        this.fetchComments();
      }));
    }
  }else {
    this.formHeading = true;
    this.showUserForm = true;
    this.router.navigate(['user/'+this.projectid], {relativeTo:this.currentR});
  }
  setTimeout(() =>{this.commentPostMessage = "";},5000)
}
noComment:boolean = false;
bottomPostCmt:boolean = false;
  fetchComments(){
      this.api.getComments(this.projectid).subscribe(res=>{
      if(res!==null){
        if(res.itemCount < 0){
        }else{
          this.fetchedComment = res.body;
          this.noComment = false;
        }
        if(res.replyItemCount < 20){
          // this.hidePostReply = true;
          this.bottomPostCmt = true;
        }
      }else {
        this.noComment = true;
        this.bottomPostCmt = false;
      }
    },
    err=>{
      console.warn( "you got an error", err);
    }
    )
  }

  
  fetchReplies(commentid:number){
    this.hidePostReply = true;
}

  replyCommentForm = new FormGroup({
    commentreply:new FormControl("",[Validators.required]),
  })

  addReplyComment(commentid:number){
    if(this.userapi.isAuthenticatedUser()){
      if(this.replyCommentForm.invalid){
        alert("do not blank field comment");
      }else {
        this.disableBtn = true;
        this.commentModule.email = localStorage.getItem('sessionUserEmail');
        this.commentModule.comment = this.replyCommentForm.value.commentreply;
        this.commentModule.commentid = commentid; 
        this.formData.append("email", this.commentModule.email);
        this.formData.append("comment", this.commentModule.comment);
        this.formData.append("commentid", this.commentModule.commentid);
        this.api.addReplyComment(this.formData).subscribe(res=>{
          this.fetchComments();
          this.replyCommentForm.reset();
          this.disableBtn = false;
          this.showReplyCommentBox = false; 
        },
        err=>{
          console.warn( "you got an error", err); 
          alert("something wrong...");
        })
      }
  }else {
    this.formHeading = true;
    this.showUserForm = true;
    this.router.navigate(['user/'+this.projectid], {relativeTo:this.currentR});
  }
 }
  projectLoad!:boolean
  PreviewProject(){
    this.projectLoad = false;
    this.api.getOneProject(this.projectid).subscribe(res=>{
    this.project = res.body;
    console.warn(this.project);
    if(!res.body){
      this.router.navigate(['error']);
    }
    this.projectLoad = true;
    },
    err=>{
      alert("someting wrong sajid bhai");
    })
  }

  countReplies(){
    this.api.getCountReplies(2).subscribe(res=>{

    })
  }

  subscribeBtnText = "Subscribe";
  subscribe:boolean = false;
  showDownload = false;
  SubscribeYt(){
    this.subscribeBtnText = "Verifying...";
    setTimeout(() => {
      this.subscribe = true;
      this.subscribeBtnText = "Subscription Verified";
      this.showDownload = true;
    }, 10000);
  window.open("https://www.youtube.com/channel/UCx17TpbQ8JoQ-EdeltD1LIA",'popUpWindow','height=400,width=600,left=10,top=10,,scrollbars=yes,menubar=no'); return false;
  }
  showModal = false;
  downloadlink:any = "Not set download link"; 
  toggleModal(project:any){
    this.showModal = !this.showModal;
    this.downloadlink = project.downloadlink; 
  }

  toggleuserFormModal(){
    this.showUserForm = false;
    this.router.navigate(['project/'+this.projectid]);
  }
  
  ngOnInit(): void {
    this.PreviewProject();
    this.fetchComments();
    this.newUserHeading = this.userapi.LoginHeader;
    this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
  }
}

