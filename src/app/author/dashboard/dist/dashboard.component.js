"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(route, currentR, api, projectType) {
        this.route = route;
        this.currentR = currentR;
        this.api = api;
        this.projectType = projectType;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getProject(); // display data onload component
    };
    DashboardComponent.prototype.getProject = function () {
        var _this = this;
        this.api.getProject().subscribe(function (res) {
            _this.projectData = res;
        }, function (err) {
            alert("someting wrong sajid bhai");
        });
    };
    DashboardComponent.prototype.deleteProject = function (data) {
        var _this = this;
        this.api.deleteProject(data.id).subscribe(function (res) {
            alert("data has be  en deleted" + data.id);
            _this.getProject();
        }, function (err) {
            alert("someting wrong sajid bhai" + data.id);
        });
    };
    DashboardComponent.prototype.editProject = function (data) {
        this.route.navigate(['/editproject', data.id]);
    };
    DashboardComponent.prototype.newproject = function () {
        this.route.navigate(['/newproject']);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
