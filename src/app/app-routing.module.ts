import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AdminloginComponent } from './author/adminlogin/adminlogin.component';
import { AuthGuardService } from './author/auth-guard.service';
import { DashboardComponent } from './author/dashboard/dashboard.component';
import { NewprojectComponent } from './author/newproject/newproject.component';
import { UnSecurePageGuard } from './author/un-secure-page.guard';
import { UsersComponent } from './author/users/users.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NewuserComponent } from './newuser/newuser.component';
import { NewUserAuthor } from './author/newuser/newuser.component';
import { NoPageComponent } from './no-page/no-page.component';
import { ProjectInfoComponent } from './projects/project-info/project-info.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"about", component:AboutComponent, data:{message:"I am dummoy data from router"}},
  {path:"contact",component:ContactComponent},
  {path:"projects",component:ProjectsComponent},
  {path:"project/:id",component:ProjectInfoComponent,
    children:[
      {path:"user/:id",component:UserComponent},
      {path:"newuser/:id",component:NewuserComponent},
    ]
  },
  {path:"userLogin",component:UserComponent},
  {path:"userCreate",component:NewuserComponent},
  {path:'author', component:AdminloginComponent, canActivate:[UnSecurePageGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuardService]},
  {path:'dashboard/:id', component:DashboardComponent, canActivate:[AuthGuardService]},
  {path:'newproject', component:NewprojectComponent, canActivate:[AuthGuardService]},
  {path:'editproject/:id', component:NewprojectComponent, canActivate:[AuthGuardService]},
  {path:'newuser', component:NewUserAuthor, canActivate:[AuthGuardService]},
  {path:'edituser/:id', component:NewUserAuthor, canActivate:[AuthGuardService]},
  // {path:'users', component:UsersComponent, canActivate:[AuthGuardService]},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'**', component:NoPageComponent}
  
];

@NgModule({
  //  imports: [RouterModule.forRoot(routes,{useHash:true})],
  imports: [RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
    }) 
export class AppRoutingModule { }
