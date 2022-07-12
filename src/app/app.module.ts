import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { ProjectInfoComponent } from './projects/project-info/project-info.component';

import {HttpClientModule } from '@angular/common/http';
import { NoPageComponent } from './no-page/no-page.component';
import { AuthorModule } from './author/author.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { NewuserComponent } from './newuser/newuser.component';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { ImageLoadedDirective } from './directives/image-loaded.directive';
// import { UserAuthService } from './users/user-service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    HeaderComponent,
    ProjectInfoComponent,
    NoPageComponent,
    UserComponent,
    NewuserComponent,
    TitleCasePipe,
    ImageLoadedDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    AuthorModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
