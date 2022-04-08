"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminloginComponent = void 0;
var core_1 = require("@angular/core");
var AdminloginComponent = /** @class */ (function () {
    function AdminloginComponent(route, api, ServiceAuth) {
        this.route = route;
        this.api = api;
        this.ServiceAuth = ServiceAuth;
        alert("Email : admin@failureboy.com\nPassword : failureboy786\n\nNote : login will be  expired while refersh browser");
    }
    AdminloginComponent.prototype.ngOnInit = function () {
    };
    AdminloginComponent.prototype.loginAdmin = function (data) {
        var _this = this;
        this.api.isLogin(data.email, data.password).subscribe(function (response) {
            if (response.length > 0) {
                _this.route.navigate(['/dashboard']);
                _this.ServiceAuth.loggedIn = true;
            }
            else {
                alert("Please enter correct email and password");
            }
        }, function (err) {
            console.warn("someting wrong sajid bhai", err);
        });
    };
    AdminloginComponent = __decorate([
        core_1.Component({
            selector: 'app-adminlogin',
            templateUrl: './adminlogin.component.html',
            styleUrls: ['./adminlogin.component.css']
        })
    ], AdminloginComponent);
    return AdminloginComponent;
}());
exports.AdminloginComponent = AdminloginComponent;
