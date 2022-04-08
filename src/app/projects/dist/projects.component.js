"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectsComponent = void 0;
var core_1 = require("@angular/core");
var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent(route, api) {
        this.route = route;
        this.api = api;
    }
    ProjectsComponent.prototype.getProject = function () {
        var _this = this;
        this.projectLoad = false;
        console.log("project loading...");
        this.api.getProject().subscribe(function (res) {
            _this.projectData = res;
            _this.projectLoad = true;
            console.log("Project Has been loaded");
        }, function (err) {
            alert("someting wrong sajid bhai");
        });
    };
    ProjectsComponent.prototype.previewlink = function (data) {
        this.route.navigate(['/project', data.id]);
    };
    ProjectsComponent.prototype.download = function (project) {
        location.href = project.downloadlink;
    };
    ProjectsComponent.prototype.ngOnInit = function () {
        this.getProject();
    };
    ProjectsComponent = __decorate([
        core_1.Component({
            selector: 'app-projects',
            templateUrl: './projects.component.html',
            styleUrls: ['./projects.component.css']
        })
    ], ProjectsComponent);
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;
