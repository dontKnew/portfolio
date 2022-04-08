"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.userForm = new forms_1.FormGroup({
            'name': new forms_1.FormControl(null, forms_1.Validators.required),
            'email': new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            'question': new forms_1.FormControl("", forms_1.Validators.required),
            'hobbies': new forms_1.FormArray([new forms_1.FormControl('')])
        });
    }
    HomeComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(HomeComponent.prototype, "aliases", {
        get: function () {
            return this.userForm.get('aliases');
        },
        enumerable: false,
        configurable: true
    });
    HomeComponent.prototype.addHobby = function () {
        var control = new forms_1.FormControl(null);
        this.userForm.get('hobbies').push(control);
    };
    Object.defineProperty(HomeComponent.prototype, "hobbies", {
        get: function () {
            return this.userForm.get('hobbies');
        },
        enumerable: false,
        configurable: true
    });
    HomeComponent.prototype.onSubmit = function () {
        this.userForm.statusChanges.subscribe(function () {
            console.log("Status Changed");
        });
    };
    Object.defineProperty(HomeComponent.prototype, "name", {
        get: function () {
            return this.userForm.get('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "email", {
        get: function () {
            return this.userForm.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "question", {
        get: function () {
            return this.userForm.get('question');
        },
        enumerable: false,
        configurable: true
    });
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
