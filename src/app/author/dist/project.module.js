"use strict";
exports.__esModule = true;
exports.commentModule = exports.newProjectModule = void 0;
var newProjectModule = /** @class */ (function () {
    function newProjectModule() {
        this.projectName = "Sajid";
        this.version = "";
        this.languages = "";
        this.level = "";
        this.downloadlink = "";
        this.previewlink = "";
        this.description = "";
        this.adminId = 0;
        this.thumbnail = "";
        this.date = "";
    }
    return newProjectModule;
}());
exports.newProjectModule = newProjectModule;
var commentModule = /** @class */ (function () {
    function commentModule() {
        // post comment, and comment replies common properites
        this.comment = "";
        this.username = "";
        this.email = "";
        this.replies = [];
    }
    return commentModule;
}());
exports.commentModule = commentModule;
