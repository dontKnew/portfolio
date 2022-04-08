"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_component_1 = require("./about/about.component");
var adminlogin_component_1 = require("./author/adminlogin/adminlogin.component");
var auth_guard_service_1 = require("./author/auth-guard.service");
var dashboard_component_1 = require("./author/dashboard/dashboard.component");
var newproject_component_1 = require("./author/newproject/newproject.component");
var contact_component_1 = require("./contact/contact.component");
var home_component_1 = require("./home/home.component");
var no_page_component_1 = require("./no-page/no-page.component");
var project_info_component_1 = require("./projects/project-info/project-info.component");
var projects_component_1 = require("./projects/projects.component");
var routes = [
    { path: "home", component: home_component_1.HomeComponent },
    { path: "about", component: about_component_1.AboutComponent, data: { message: "I am dummoy data from router" } },
    { path: "contact", component: contact_component_1.ContactComponent },
    { path: "projects", component: projects_component_1.ProjectsComponent },
    { path: "project/:id", component: project_info_component_1.ProjectInfoComponent },
    { path: 'author', component: adminlogin_component_1.AdminloginComponent },
    { path: 'error', component: no_page_component_1.NoPageComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'dashboard/:id', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'newproject', component: newproject_component_1.NewprojectComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'editproject/:id', component: newproject_component_1.NewprojectComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: '**', redirectTo: 'error' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
