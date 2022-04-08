"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewprojectComponent = void 0;
var core_1 = require("@angular/core");
var NewprojectComponent = /** @class */ (function () {
    function NewprojectComponent(el, projectType, api, currentRoute, route) {
        this.el = el;
        this.projectType = projectType;
        this.api = api;
        this.currentRoute = currentRoute;
        this.route = route;
        this.imageUrl = "";
        this.showImage = false;
        this.showbtnfetch = false;
        this.today = new Date();
    }
    NewprojectComponent.prototype.thumbnailProcessing = function (event) {
        var _this = this;
        var file = event.target.files[0];
        if (event.target.files.length > 0) {
            this.showImage = true;
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                _this.imageUrl = reader_1.result;
            };
            reader_1.readAsDataURL(file);
        }
        else {
            this.showImage = false;
        }
    };
    NewprojectComponent.prototype.newProject = function (data) {
        var _this = this;
        this.projectType.projectName = data.value.projectName;
        this.projectType.version = data.value.version;
        this.projectType.languages = data.value.languages;
        this.projectType.level = data.value.level;
        this.projectType.downloadlink = data.value.downloadlink;
        this.projectType.previewlink = data.value.previewlink;
        this.projectType.previewlink = data.value.previewlink;
        this.projectType.description = data.value.description;
        this.projectType.thumbnail = this.imageUrl;
        this.projectType.date = this.today;
        this.api.newProject(this.projectType).subscribe(function (res) {
            alert("data has been added");
            data.resetForm();
            _this.imageUrl = "";
            _this.showImage = false;
        }, function (erro) {
            console.warn(erro);
        });
    };
    // update functionality...
    NewprojectComponent.prototype.getEditProject = function (data) {
        var _this = this;
        var id = this.currentRoute.snapshot.params['id'];
        this.api.getOneProject(id).subscribe(function (res) {
            data.form.patchValue({ projectName: res.projectName, version: res.version, level: res.level, languages: res.languages, description: res.description, downloadlink: res.downloadlink, previewlink: res.previewlink });
            _this.imageUrl = res.thumbnail;
            _this.showImage = true;
        }, function (err) {
            alert("someting wrong sajid bhai");
        });
    };
    NewprojectComponent.prototype.updateProject = function (data) {
        var _this = this;
        this.projectType.projectName = data.value.projectName;
        this.projectType.version = data.value.version;
        this.projectType.languages = data.value.languages;
        this.projectType.level = data.value.level;
        this.projectType.downloadlink = data.value.downloadlink;
        this.projectType.previewlink = data.value.previewlink;
        this.projectType.previewlink = data.value.previewlink;
        this.projectType.description = data.value.description;
        this.projectType.thumbnail = this.imageUrl;
        // this.projectType.date = this.today;
        var id = this.currentRoute.snapshot.params['id'];
        this.api.updateProject(this.projectType, id).subscribe(function (res) {
            alert("data has been updated");
            data.resetForm();
            _this.imageUrl = "";
            _this.showImage = false;
            _this.route.navigate(['/dashboard']);
        }, function (erro) {
            console.warn(erro);
        });
    };
    NewprojectComponent.prototype.ngOnInit = function () {
        // for edit page show buttons or not 
        if (this.currentRoute.snapshot.params['id']) {
            this.showbtnfetch = true;
        }
    };
    NewprojectComponent = __decorate([
        core_1.Component({
            selector: 'app-newproject',
            templateUrl: './newproject.component.html',
            styleUrls: ['./newproject.component.css']
        })
    ], NewprojectComponent);
    return NewprojectComponent;
}());
exports.NewprojectComponent = NewprojectComponent;
