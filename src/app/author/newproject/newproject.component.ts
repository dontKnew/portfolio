import { Component, ElementRef, OnInit } from '@angular/core';  
import { ProjectService } from '../project.service';
import { newProjectModule } from '../project.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
constructor(private el:ElementRef, private projectType:newProjectModule, private api:ProjectService, private currentRoute:ActivatedRoute, private route:Router, private location:Location){}
imageUrl:string = "";
showImage:boolean = false;
showbtnfetch:boolean = false;
thumbnail:boolean = false;
file!:File;
thumbnailProcessing(event:any){
  this.thumbnail = true;
  this.file = event.target.files[0];
  if(event.target.files.length > 0 ){
    this.showImage = true;
    this.thumbnail = false;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }else {
    this.showImage  = false;
    this.thumbnail = true;
  }
}
newProjectForm:any = new FormGroup({
  "projectName":new FormControl("Work", [Validators.required]),
  "version":new FormControl("0.1", [Validators.required]),
  "languages":new FormControl("HTML, CSS, PHP", [Validators.required]),
  "level":new FormControl("BEGINNER", [Validators.required]),
  "previewlink":new FormControl("#", [Validators.required]),
  "downloadlink":new FormControl("#", [Validators.required]),
  "description":new FormControl("I have made work management syste hop you will be like this :)", [Validators.required]),
})
get projectName(){
  return this.newProjectForm.get('projectName');
} 
get version(){
  return this.newProjectForm.get('version');
}
get languages(){
  return this.newProjectForm.get('languages');
}
get level(){
  return this.newProjectForm.get('level');
}
get previewlink(){
  return this.newProjectForm.get('previewlink');
}
get downloadlink(){
  return this.newProjectForm.get('previewlink');
}
get description(){
  return this.newProjectForm.get('description');
}

btnAddProject:string = "Add Project";
formData = new FormData();
newProject(){
  this.formData.append("adminId", "0");
  this.formData.append("version", this.newProjectForm.value.version);
  this.formData.append("name", this.newProjectForm.value.projectName);
  this.formData.append("language", this.newProjectForm.value.languages);
  this.formData.append("level", this.newProjectForm.value.level);
  this.formData.append("previewlink", this.newProjectForm.value.previewlink);
  this.formData.append("downloadlink", this.newProjectForm.value.downloadlink);
  this.formData.append("description", this.newProjectForm.value.description);  
    if(!this.file){
      this.thumbnail = true;
      console.warn("file not selected");
    }else {
      this.btnAddProject = "Please wait...";
      this.formData.append("thumbnail",this.file);
      this.api.newProject(this.formData).subscribe(res=>{
       console.warn(res);
        this.imageUrl= "";
        this.showImage=false;
        this.btnAddProject = "Add Project";
        alert("Project Added");
        this.location.back();
      }, erro=>{
        console.warn(erro);
      }) 
    }
  }

  // update functionality...
  getEditProject(){
    let id:number  = this.currentRoute.snapshot.params['id'];
    this.api.getOneProject(id).subscribe(res1=>{
      const res = res1.body;
      this.newProjectForm.setValue({
          projectName:res.project_name, 
          version:res.project_version,
          level:res.project_level,
          languages:res.project_language,
          description:res.project_description, 
          downloadlink:res.project_download_link,
          previewlink:res.project_preview
      });
      this.imageUrl= res.project_thumbnail;
      this.showImage=true;
    },
    err=>{
      alert("someting wrong sajid bhai");
    })
  }
  adminId:any = 0;
  updateProject(){
  this.formData.append("adminId",this.adminId);
  this.formData.append("version", this.newProjectForm.value.version);
  this.formData.append("name", this.newProjectForm.value.projectName);
  this.formData.append("language", this.newProjectForm.value.languages);
  this.formData.append("level", this.newProjectForm.value.level);
  this.formData.append("previewlink", this.newProjectForm.value.previewlink);
  this.formData.append("downloadlink", this.newProjectForm.value.downloadlink);
  this.formData.append("description", this.newProjectForm.value.description);  
  this.formData.append("thumbnail",this.file);
  let id = this.currentRoute.snapshot.params['id']
    this.api.updateProject(this.formData,id).subscribe(res=>{
      alert("data has been updated");
      this.imageUrl= "";
      this.showImage=false;
      console.warn(res);
      this.route.navigate(['/dashboard']);
    }, erro=>{
      console.warn(erro);
    })
  }
  ngOnInit(): void {
    // for edit page show buttons or not 
    if(this.currentRoute.snapshot.params['id']){
      this.showbtnfetch  = true;
      this.getEditProject();
    }
  } 

}


