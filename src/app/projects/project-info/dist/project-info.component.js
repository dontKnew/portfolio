"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectInfoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var project_module_1 = require("src/app/author/project.module");
var ProjectInfoComponent = /** @class */ (function () {
    function ProjectInfoComponent(currentR, api, commentModule) {
        this.currentR = currentR;
        this.api = api;
        this.commentModule = commentModule;
        this.project = "";
        this.projectid = this.currentR.snapshot.params['id'];
        this.showCommentBox = false;
        this.showReplyCommentBox = false;
        this.fetchedComment = "";
        this.fetchedRepliesComment = "";
        this.today = new Date();
        this.hideReplies = 0;
        this.hidePostReply = false;
        this.commentForm = new forms_1.FormGroup({
            username: new forms_1.FormControl("", [forms_1.Validators.required]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            comment: new forms_1.FormControl("", [forms_1.Validators.required])
        });
        this.commentPostMessage = "";
        this.disableBtn = false;
        this.replyCommentForm = new forms_1.FormGroup({
            username: new forms_1.FormControl("", [forms_1.Validators.required]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            comment: new forms_1.FormControl("", [forms_1.Validators.required])
        });
        this.noComment = false;
    }
    ProjectInfoComponent.prototype.commentBox = function () {
        this.showCommentBox = true;
    };
    ProjectInfoComponent.prototype.replyCommentBox = function () {
        this.showReplyCommentBox = true;
    };
    ProjectInfoComponent.prototype.addComment = function () {
        var _this = this;
        if (this.commentForm.invalid) {
            this.commentPostMessage = "All fields are required";
        }
        else {
            this.commentPostMessage = "Processing...";
            this.commentLoad = false;
            this.disableBtn = true;
            this.commentModule.username = this.commentForm.value.username;
            this.commentModule.email = this.commentForm.value.email;
            this.commentModule.comment = this.commentForm.value.comment;
            this.commentModule.projectid = this.projectid;
            this.commentModule.date = this.today;
            this.api.addComment(this.commentModule).subscribe(function (res) {
                _this.fetchComments();
                _this.commentLoad = true;
                _this.commentPostMessage = "Your Comment Added!";
                _this.commentForm.reset();
                _this.disableBtn = false;
            }, function (error) {
                console.warn("you got an error", error);
                _this.commentPostMessage = error.message;
            });
        }
        setTimeout(function () { _this.commentPostMessage = ""; }, 3000);
    };
    Object.defineProperty(ProjectInfoComponent.prototype, "comment", {
        get: function () {
            return this.commentForm.get('comment');
        },
        enumerable: false,
        configurable: true
    });
    ProjectInfoComponent.prototype.addReplyComment = function (commentid) {
        var _this = this;
        if (!this.replyCommentForm.invalid) {
            this.disableBtn = true;
            this.commentModule.username = this.replyCommentForm.value.username;
            this.commentModule.email = this.replyCommentForm.value.email;
            this.commentModule.comment = this.replyCommentForm.value.comment;
            this.commentModule.date = this.today;
            this.commentModule.commentid = commentid;
            this.api.addReplyComment(this.commentModule).subscribe(function (res) {
                _this.fetchReplies(commentid);
                _this.replyCommentForm.reset();
                _this.disableBtn = false;
            }, function (err) {
                console.warn("you got an error", err);
                alert("something wrong...");
            });
        }
        else {
            alert("Please Fill up comment Input");
        }
    };
    ProjectInfoComponent.prototype.fetchComments = function () {
        var _this = this;
        this.api.getComments(this.projectid).subscribe(function (res) {
            if (res.length === 0) {
                _this.noComment = true;
            }
            else {
                _this.fetchedComment = res;
                _this.noComment = false;
            }
        }, function (err) {
            console.warn("you got an error", err);
        });
    };
    ProjectInfoComponent.prototype.fetchReplies = function (commentid) {
        var _this = this;
        this.api.getReplyComment(commentid).subscribe(function (res) {
            _this.fetchedRepliesComment = res;
            // console.warn("replies comment id", res)
            _this.hideReplies = commentid;
            _this.hidePostReply = true;
        }, function (err) {
            console.warn("you got an error", err);
        });
    };
    ProjectInfoComponent.prototype.PreviewProject = function () {
        var _this = this;
        this.projectLoad = false;
        this.api.getOneProject(this.projectid).subscribe(function (res) {
            _this.project = res;
            _this.projectLoad = true;
        }, function (err) {
            alert("someting wrong sajid bhai");
        });
    };
    ProjectInfoComponent.prototype.countReplies = function () {
        this.api.getCountReplies(2).subscribe(function (res) {
        });
    };
    ProjectInfoComponent.prototype.ngOnInit = function () {
        this.PreviewProject();
        this.fetchComments();
        // fetchRepliesComments();
    };
    ProjectInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-project-info',
            templateUrl: './project-info.component.html',
            styleUrls: ['./project-info.component.css'],
            providers: [project_module_1.commentModule]
        })
    ], ProjectInfoComponent);
    return ProjectInfoComponent;
}());
exports.ProjectInfoComponent = ProjectInfoComponent;
