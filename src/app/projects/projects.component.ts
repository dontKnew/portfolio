import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newProjectModule } from '../author/project.module';
import { ProjectService } from '../author/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor( private route:Router, private api:ProjectService) { }
  projectData:any;
  projectLoad:boolean = false;
  getProject(){
    this.api.getProject().subscribe(res=>{
      if(res!==null){
        this.projectData = res.body;
        console.warn(res);
         this.projectLoad = true;
      }else {
        // this.projectLoad = false;
        alert("No Project were found yet");
      }
    },
    error=>{
      alert("server side issue",);
      console.warn(error);
      this.projectLoad = false;
    }
    )
  }
  previewlink(data:any){
    this.route.navigate(['/project', data.project_id]);
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
    this.downloadlink = project.download_link; 
  }

  noImage:boolean = false;
  checkLoadingImage(){
    this.noImage = true;

  }
  ngOnInit(): void {
    this.getProject();
    console.warn(this.projectLoad);
  }
}
