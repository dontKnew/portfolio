"use strict";
exports.__esModule = true;
exports.AuthService = void 0;
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.loggedIn = false;
    }
    // isAuthenticated(){
    //     const temp:Observable<any> = new Observable<any>((observer)=>{
    //         setTimeout(()=>{
    //             this.loggedIn = false;
    //         }, 3000)
    //     })
    // }
    AuthService.prototype.login = function () {
        this.loggedIn = true;
    };
    AuthService.prototype.logout = function () {
        this.loggedIn = false;
    };
    return AuthService;
}());
exports.AuthService = AuthService;
