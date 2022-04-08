"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AdminService = /** @class */ (function () {
    function AdminService(_http) {
        this._http = _http;
        this.databaseurl = "https://myfirstjson.herokuapp.com/admins";
    }
    AdminService.prototype.getUser = function (data) {
        return this._http.get("https://myfirstjson.herokuapp.com/admins").pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    AdminService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
// export class AddProjectStructure{
//   id:number = 0;
//   name:string = "";
//   version:string  = "";
//   languages:string = "";
//   level:string = "";
//   downloadLink:string = "";
//   previewLink:string = "";
//   description:string = "";
//   date:string = "";
// }
