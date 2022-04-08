"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ProjectService = /** @class */ (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.newProject = function (data) {
        return this.http.post("https://myfirstjson.herokuapp.com/myproject", data).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.getProject = function () {
        return this.http.get("https://myfirstjson.herokuapp.com/myproject").pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.getOneProject = function (id) {
        return this.http.get("https://myfirstjson.herokuapp.com/myproject/" + id).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.deleteProject = function (id) {
        return this.http["delete"]("https://myfirstjson.herokuapp.com/myproject/" + id).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.updateProject = function (data, id) {
        return this.http.put("https://myfirstjson.herokuapp.com/myproject/" + id, data).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.isLogin = function (email, password) {
        return this.http.get("https://myfirstjson.herokuapp.com/admins?email=" + email + "&password=" + password).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.addComment = function (data) {
        return this.http.post("https://myfirstjson.herokuapp.com/comments", data).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.getComments = function (projectid) {
        return this.http.get("https://myfirstjson.herokuapp.com/comments?projectid=" + projectid + "&_sort=id&_order=desc").pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.addReplyComment = function (data) {
        return this.http.post("https://myfirstjson.herokuapp.com/repliesComment", data).pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.getReplyComment = function (commentid) {
        return this.http.get("https://myfirstjson.herokuapp.com/repliesComment?commentid=" + commentid + "&_sort=id&_order=desc").pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService.prototype.getCountReplies = function (commentid) {
        return this.http.get("https://myfirstjson.herokuapp.com/repliesComment?commentid=" + commentid + "&_sort=id&_order=desc").pipe(rxjs_1.map(function (res) {
            return res;
        }));
    };
    ProjectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
