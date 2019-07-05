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
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]],
            entryComponents: []
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

module.exports = "<ion-content padding class=\"bghome\">\n    <div class=\"move-logo\">\n        <ion-img class=\"resize-logo\" src=\"../../assets/img/home-logo.svg\"></ion-img>\n        <div class=\"center\">\n            <ion-label class=\"text-eyewallet\">EYEWALLET</ion-label>\n            <br>\n            <ion-label class=\"text-crypto\">CRYPTO BANK</ion-label>\n        </div>\n    </div>\n    <form #formulario (ngSubmit)=\"login()\" class=\"transparent move-form\">\n    <!-- <form #formulanrio (submit)=\"login()\" class=\"transparent move-form\"> -->\n        <ion-list class=\"transparent\">\n            <!-- Usuario -->\n            <ion-item class=\"transparent white-line\">\n                <ion-img src=\"../../assets/icon/icon-user.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input  class=\"white move-input\" type=\"email\" name=\"username\" [(ngModel)]=\"username\"  placeholder=\"Correo Electrónico\"></ion-input>\n            </ion-item>\n            <!-- Contraseña -->\n            <ion-item class=\"transparent white-line\">\n                    <ion-img src=\"../../assets/icon/icon-pass.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input class=\"white move-input\" type=\"password\" name=\"password\" [(ngModel)]=\"password\" placeholder=\"Contraseña\"></ion-input>\n            </ion-item>\n        </ion-list>\n        <div class=\"move-btn\">\n                <ion-button type=\"submit\" class=\"btn-start\" mode=\"ios\" >Iniciar Sesión</ion-button>\n            <br>\n            <ion-button href=\"/restore\" class=\"btn-create\" mode=\"ios\">Recuperar Contraseña</ion-button>\n        </div>\n        <div text-center=\"\">\n            <ion-button (click)=\"openModal()\">Open Modal</ion-button>\n        </div>\n    </form>\n</ion-content>\n\n"

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".center {\n  margin-top: 6vh;\n  text-align: center;\n  width: 100%;\n  margin-left: -7vh; }\n\n.btn-create {\n  margin-top: 2vh;\n  --background: transparent;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 10vh;\n  --padding-end: 10vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --border-color: white;\n  --border-width:1px;\n  --border-style: solid;\n  font-family: 'OpenSans', sans-serif;\n  font-weight: 400; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWlzbXVuYXItZXllbGluZS9kZXZlbG9wbWVudC9leWVsaW5lL0V5ZXdhbGxldEFwcC9zcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGlCQUNKLEVBQUE7O0FBRUU7RUFDRSxlQUFlO0VBQ2YseUJBQWE7RUFDYixrR0FBdUI7RUFDdkIsOEZBQW1CO0VBQ25CLHFCQUFnQjtFQUNoQixtQkFBYztFQUNkLGtCQUFjO0VBQ2QscUJBQWlCO0VBQ2pCLHNCQUFnQjtFQUNoQixxQkFBZTtFQUNmLGtCQUFlO0VBQ2YscUJBQWU7RUFDZixtQ0FBbUM7RUFDbkMsZ0JBQ0YsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jZW50ZXJ7XG4gICAgbWFyZ2luLXRvcDogNnZoO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tbGVmdDogLTd2aFxufVxuXG4gIC5idG4tY3JlYXRle1xuICAgIG1hcmdpbi10b3A6IDJ2aDtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAgIC0tYmFja2dyb3VuZC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNzMwMEZGIC0xMCUsICM1NTg0RkYgNzAlLCAjNERBQUZGIDEyMCUpICFpbXBvcnRhbnQ7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxMHZoO1xuICAgIC0tcGFkZGluZy1lbmQ6IDEwdmg7XG4gICAgLS1wYWRkaW5nLXRvcDogMHB4O1xuICAgIC0tcGFkZGluZy1ib3R0b206IDBweDtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIC0tYm9yZGVyLWNvbG9yOiB3aGl0ZTtcbiAgICAtLWJvcmRlci13aWR0aDoxcHg7XG4gICAgLS1ib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGZvbnQtZmFtaWx5OiAnT3BlblNhbnMnLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtd2VpZ2h0OiA0MDBcbiAgfVxuXG5cbiJdfQ== */"

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
/* harmony import */ var _pin_modal_pin_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pin-modal/pin-modal.page */ "./src/app/pin-modal/pin-modal.page.ts");
/* harmony import */ var _services_fingerprint_touch_login_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/fingerprint/touch-login.service */ "./src/app/services/fingerprint/touch-login.service.ts");









var LoginPage = /** @class */ (function () {
    function LoginPage(loadingController, toastController, aut, menu, router, loginHttpReq, modalCtrl, touchCtrl) {
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.aut = aut;
        this.menu = menu;
        this.router = router;
        this.loginHttpReq = loginHttpReq;
        this.modalCtrl = modalCtrl;
        this.touchCtrl = touchCtrl;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
        this.touchCtrl.isLocked = true;
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
    LoginPage.prototype.openModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var moda, modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.getTop()];
                    case 1:
                        moda = _a.sent();
                        console.log(moda);
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _pin_modal_pin_modal_page__WEBPACK_IMPORTED_MODULE_6__["PinModalPage"],
                                componentProps: {
                                    paramID: 123,
                                    paramTitle: 'Test title'
                                }
                            })];
                    case 2:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
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
            _services_axios_axios_service__WEBPACK_IMPORTED_MODULE_5__["AxiosService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _services_fingerprint_touch_login_service__WEBPACK_IMPORTED_MODULE_7__["TouchLoginService"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map