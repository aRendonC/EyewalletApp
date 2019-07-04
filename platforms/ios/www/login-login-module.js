(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/login/login.page.ts");







var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/login/login.page.html":
/*!***************************************!*\
  !*** ./src/app/login/login.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content padding class=\"bghome\">\n    <div class=\"move-logo\">\n        <ion-img class=\"resize-logo\" src=\"../../assets/img/home-logo.svg\"></ion-img>\n        <div class=\"center\">\n            <ion-label class=\"text-eyewallet\">EYEWALLET</ion-label>\n            <br>\n            <ion-label class=\"text-crypto\">CRYPTO BANK</ion-label>\n        </div>\n    </div>\n    <form #formulario (ngSubmit)=\"login()\" class=\"transparent move-form\">\n    <!-- <form #formulanrio (submit)=\"login()\" class=\"transparent move-form\"> -->\n        <ion-list class=\"transparent\">\n            <!-- Usuario -->\n            <ion-item class=\"transparent white-line\"> \n                <ion-img src=\"../../assets/icon/icon-user.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input  class=\"white move-input\" type=\"email\" name=\"username\" [(ngModel)]=\"username\"  placeholder=\"Correo Electrónico\"></ion-input>\n            </ion-item>\n            <!-- Contraseña -->\n            <ion-item class=\"transparent white-line\">\n                    <ion-img src=\"../../assets/icon/icon-pass.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input class=\"white move-input\" type=\"password\" name=\"password\" [(ngModel)]=\"password\" placeholder=\"Contraseña\"></ion-input>\n            </ion-item>\n        </ion-list>\n        <div class=\"move-btn\">\n                <ion-button type=\"submit\" class=\"btn-start\" mode=\"ios\" >Iniciar Sesión</ion-button>\n            <br>\n            <ion-button href=\"/registry\" class=\"btn-create\" mode=\"ios\">Recuperar Contraseña</ion-button>\n        </div>\n    </form>\n</ion-content>\n\n"

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bghome {\n  --background:  url('bg-home.png');\n  --background-repeat: no-repeat; }\n\n.move-logo {\n  margin-top: 5vh;\n  margin-left: 15vh; }\n\n.resize-logo {\n  width: 60%; }\n\n.text-eyewallet {\n  font-family: 'Poppins', sans-serif;\n  letter-spacing: 2px;\n  font-weight: 500;\n  font-size: 34px;\n  color: white; }\n\n.text-crypto {\n  font-family: 'Poppins', sans-serif;\n  letter-spacing: 5px;\n  font-weight: 500;\n  font-size: 17px;\n  color: white; }\n\n.center {\n  margin-top: 6vh;\n  text-align: center;\n  width: 100%;\n  margin-left: -7vh; }\n\n.move-btn {\n  margin-top: 5vh;\n  text-align: center; }\n\n.btn-start {\n  --background: #4C6AC0;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 15vh;\n  --padding-end: 14vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --opacity: 0.86;\n  font-family: 'Poppins', sans-serif; }\n\n.btn-create {\n  margin-top: 2vh;\n  --background: transparent;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 10vh;\n  --padding-end: 10vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --border-color: white;\n  --border-width:1px;\n  --border-style: solid;\n  font-family: 'OpenSans', sans-serif;\n  font-weight: 400; }\n\n.transparent {\n  --background: transparent !important;\n  background: transparent !important; }\n\n.move-form {\n  margin-top: 6.5vh;\n  margin-bottom: 6.5vh; }\n\n.white {\n  --placeholder-color: white;\n  color: white; }\n\n.resize-icon {\n  width: 5%; }\n\n.move-input {\n  margin-left: 4vw; }\n\n.white-line {\n  --border-color:white;\n  --highlight-height: 0\n; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9leWVsaW5lL0RvY3VtZW50cy95ZWlzb24vRXlld2FsbGV0QXBwL3NyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUNBQWE7RUFDYiw4QkFBb0IsRUFBQTs7QUFJeEI7RUFDSSxlQUFlO0VBQ2YsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksVUFBVSxFQUFBOztBQUdkO0VBQ0ksa0NBQWtDO0VBQ2xDLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFlBQVksRUFBQTs7QUFHaEI7RUFDSSxrQ0FBa0M7RUFDbEMsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsWUFBWSxFQUFBOztBQUdoQjtFQUNJLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGlCQUNKLEVBQUE7O0FBR0E7RUFDSSxlQUFlO0VBQ2Ysa0JBQ0YsRUFBQTs7QUFFQTtFQUNFLHFCQUFhO0VBQ2Isa0dBQXVCO0VBQ3ZCLDhGQUFtQjtFQUNuQixxQkFBZ0I7RUFDaEIsbUJBQWM7RUFDZCxrQkFBYztFQUNkLHFCQUFpQjtFQUNqQixzQkFBZ0I7RUFDaEIsZUFBVTtFQUNWLGtDQUFrQyxFQUFBOztBQUdwQztFQUNFLGVBQWU7RUFDZix5QkFBYTtFQUNiLGtHQUF1QjtFQUN2Qiw4RkFBbUI7RUFDbkIscUJBQWdCO0VBQ2hCLG1CQUFjO0VBQ2Qsa0JBQWM7RUFDZCxxQkFBaUI7RUFDakIsc0JBQWdCO0VBQ2hCLHFCQUFlO0VBQ2Ysa0JBQWU7RUFDZixxQkFBZTtFQUNmLG1DQUFtQztFQUNuQyxnQkFDRixFQUFBOztBQUVGO0VBQ0ksb0NBQWE7RUFDYixrQ0FBa0MsRUFBQTs7QUFHdEM7RUFDSSxpQkFBaUI7RUFDakIsb0JBQW9CLEVBQUE7O0FBR3hCO0VBQ0ksMEJBQW9CO0VBQ3BCLFlBQ0osRUFBQTs7QUFFQTtFQUNJLFNBQVMsRUFBQTs7QUFHYjtFQUNJLGdCQUNKLEVBQUE7O0FBRUE7RUFDSSxvQkFBZTtFQUNmO0FBQW1CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmdob21le1xuICAgIC0tYmFja2dyb3VuZDogIHVybCgnLi4vLi4vYXNzZXRzL2ltZy9iZy1ob21lLnBuZycpO1xuICAgIC0tYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBcbn1cblxuLm1vdmUtbG9nb3tcbiAgICBtYXJnaW4tdG9wOiA1dmg7XG4gICAgbWFyZ2luLWxlZnQ6IDE1dmg7XG59XG5cbi5yZXNpemUtbG9nbyB7XG4gICAgd2lkdGg6IDYwJTtcbn1cblxuLnRleHQtZXlld2FsbGV0e1xuICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi50ZXh0LWNyeXB0b3tcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICAgIGxldHRlci1zcGFjaW5nOiA1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG4uY2VudGVye1xuICAgIG1hcmdpbi10b3A6IDZ2aDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWxlZnQ6IC03dmhcbn1cblxuXG4ubW92ZS1idG57XG4gICAgbWFyZ2luLXRvcDogNXZoO1xuICAgIHRleHQtYWxpZ246IGNlbnRlclxuICB9XG4gIFxuICAuYnRuLXN0YXJ0e1xuICAgIC0tYmFja2dyb3VuZDogIzRDNkFDMDtcbiAgICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM3MzAwRkYgLTEwJSwgIzU1ODRGRiA3MCUsICM0REFBRkYgMTIwJSkgIWltcG9ydGFudDtcbiAgICAtLWJhY2tncm91bmQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAgIC0tcGFkZGluZy1zdGFydDogMTV2aDtcbiAgICAtLXBhZGRpbmctZW5kOiAxNHZoO1xuICAgIC0tcGFkZGluZy10b3A6IDBweDtcbiAgICAtLXBhZGRpbmctYm90dG9tOiAwcHg7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgICAtLW9wYWNpdHk6IDAuODY7XG4gICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcbiAgfVxuICBcbiAgLmJ0bi1jcmVhdGV7XG4gICAgbWFyZ2luLXRvcDogMnZoO1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNzMwMEZGIC0xMCUsICM1NTg0RkYgNzAlLCAjNERBQUZGIDEyMCUpICFpbXBvcnRhbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM3MzAwRkYgLTEwJSwgIzU1ODRGRiA3MCUsICM0REFBRkYgMTIwJSkgIWltcG9ydGFudDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDEwdmg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTB2aDtcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTAwcHg7XG4gICAgLS1ib3JkZXItY29sb3I6IHdoaXRlO1xuICAgIC0tYm9yZGVyLXdpZHRoOjFweDtcbiAgICAtLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgZm9udC1mYW1pbHk6ICdPcGVuU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC13ZWlnaHQ6IDQwMFxuICB9XG5cbi50cmFuc3BhcmVudHtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn1cblxuLm1vdmUtZm9ybXtcbiAgICBtYXJnaW4tdG9wOiA2LjV2aDtcbiAgICBtYXJnaW4tYm90dG9tOiA2LjV2aDtcbn1cblxuLndoaXRle1xuICAgIC0tcGxhY2Vob2xkZXItY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiB3aGl0ZVxufVxuXG4ucmVzaXplLWljb257XG4gICAgd2lkdGg6IDUlO1xufVxuXG4ubW92ZS1pbnB1dHtcbiAgICBtYXJnaW4tbGVmdDogNHZ3IFxufVxuXG4ud2hpdGUtbGluZXtcbiAgICAtLWJvcmRlci1jb2xvcjp3aGl0ZTtcbiAgICAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/login/login.page.ts":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth/auth.service */ "./src/app/services/auth/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_axios_axios_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/axios/axios.service */ "./src/app/services/axios/axios.service.ts");






var LoginPage = /** @class */ (function () {
    function LoginPage(loadingController, toastController, aut, menu, router, loginHttpReq) {
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.aut = aut;
        this.menu = menu;
        this.router = router;
        this.loginHttpReq = loginHttpReq;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(true);
    };
    LoginPage.prototype.login = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.aut.login(this.username, this.password).then(function (data) {
                    if (data !== null) {
                        // @ts-ignore
                        // this.router.navigateByUrl(`/perfil/${data.serializeToken}`);
                        // this.router.navigate(['/perfil',data.id]);
                        _this.router.navigate(['/app/tabs']);
                    }
                    else {
                        _this.presentToast();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.presentToast = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Usuario o contraseña incorrecta.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _services_axios_axios_service__WEBPACK_IMPORTED_MODULE_5__["AxiosService"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map