"use strict";
exports.__esModule = true;
exports.AuthService = void 0;
// Injectable();
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.loggedIn = false;
    }
    AuthService.prototype.login = function () {
        this.loggedIn = true;
    };
    AuthService.prototype.logout = function () {
        this.loggedIn = false;
    };
    return AuthService;
}());
exports.AuthService = AuthService;
