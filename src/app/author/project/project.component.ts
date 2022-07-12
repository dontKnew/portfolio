import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { newProjectModule } from '../project.module';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectData:any;
  constructor(private route:Router, private currentR:ActivatedRoute, private api:ProjectService, private projectType:newProjectModule) { }
  
  noProject:boolean = false;
  getProject(){
    this.api.getProject().subscribe(res=>{
      if(res!==null){
        this.projectData = res.body;
        this.noProject = true;
      }else {
        this.noProject = false;
      }
    },
    err=>{
      alert("someting wrong sajid bhai");
    }
    )
  }

  deleteProject(data:any){ 
    this.api.deleteProject(data.project_id).subscribe(res=>{
      alert('Project Deleted');
      this.getProject();
    },
    err=>{
      alert("someting wrong sajid bhai"+data.id);
    }
    )
  }

  editProject(data:any){
    this.route.navigate(['/editproject', data.project_id])
  }
  newproject(){
    this.route.navigate(['/newproject']);
  }

  ngOnInit(): void {
    this.getProject(); // display data onload component
  }

}
