"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthorModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var adminlogin_component_1 = require("./adminlogin/adminlogin.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var forms_1 = require("@angular/forms");
var newproject_component_1 = require("./newproject/newproject.component");
var http_1 = require("@angular/common/http");
var project_service_1 = require("./project.service");
var project_module_1 = require("./project.module");
var auth_service_1 = require("./auth.service");
var AuthorModule = /** @class */ (function () {
    function AuthorModule() {
    }
    AuthorModule = __decorate([
        core_1.NgModule({
            declarations: [
                adminlogin_component_1.AdminloginComponent,
                dashboard_component_1.DashboardComponent,
                newproject_component_1.NewprojectComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
            ],
            providers: [project_service_1.ProjectService, project_module_1.newProjectModule, auth_service_1.AuthService]
        })
    ], AuthorModule);
    return AuthorModule;
}());
exports.AuthorModule = AuthorModule;
