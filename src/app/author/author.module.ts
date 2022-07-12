import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewprojectComponent } from './newproject/newproject.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project.service';
import { newProjectModule } from './project.module';
import { AuthService } from './auth.service';
import { UsersComponent } from './users/users.component';
import { ProjectComponent } from './project/project.component';
import { NewUserAuthor } from './newuser/newuser.component';


@NgModule({
  declarations: [
    AdminloginComponent,
    DashboardComponent,
    NewprojectComponent,
    UsersComponent,
    ProjectComponent,
    NewUserAuthor,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [ProjectService, newProjectModule, AuthService],
})
export class AuthorModule { }
