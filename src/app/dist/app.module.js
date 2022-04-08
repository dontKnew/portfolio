"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var footer_component_1 = require("./footer/footer.component");
var projects_component_1 = require("./projects/projects.component");
var about_component_1 = require("./about/about.component");
var contact_component_1 = require("./contact/contact.component");
var home_component_1 = require("./home/home.component");
var animations_1 = require("@angular/platform-browser/animations");
var sidenav_1 = require("@angular/material/sidenav");
var slider_1 = require("@angular/material/slider");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var list_1 = require("@angular/material/list");
var header_component_1 = require("./header/header.component");
var project_info_component_1 = require("./projects/project-info/project-info.component");
var http_1 = require("@angular/common/http");
var no_page_component_1 = require("./no-page/no-page.component");
var author_module_1 = require("./author/author.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                footer_component_1.FooterComponent,
                projects_component_1.ProjectsComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                home_component_1.HomeComponent,
                header_component_1.HeaderComponent,
                project_info_component_1.ProjectInfoComponent,
                no_page_component_1.NoPageComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                list_1.MatListModule,
                http_1.HttpClientModule,
                author_module_1.AuthorModule,
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
