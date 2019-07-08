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

module.exports = ".center {\n  margin-top: 6vh;\n  text-align: center;\n  width: 100%;\n  margin-left: -7vh; }\n\n.btn-create {\n  margin-top: 2vh;\n  --background: transparent;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 10vh;\n  --padding-end: 10vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --border-color: white;\n  --border-width:1px;\n  --border-style: solid;\n  font-family: 'OpenSans', sans-serif;\n  font-weight: 400; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9leWVsaW5lL0RvY3VtZW50cy9HaXRIdWIvRXlld2FsbGV0QXBwL3NyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsaUJBQ0osRUFBQTs7QUFFRTtFQUNFLGVBQWU7RUFDZix5QkFBYTtFQUNiLGtHQUF1QjtFQUN2Qiw4RkFBbUI7RUFDbkIscUJBQWdCO0VBQ2hCLG1CQUFjO0VBQ2Qsa0JBQWM7RUFDZCxxQkFBaUI7RUFDakIsc0JBQWdCO0VBQ2hCLHFCQUFlO0VBQ2Ysa0JBQWU7RUFDZixxQkFBZTtFQUNmLG1DQUFtQztFQUNuQyxnQkFDRixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNlbnRlcntcbiAgICBtYXJnaW4tdG9wOiA2dmg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtN3ZoXG59XG5cbiAgLmJ0bi1jcmVhdGV7XG4gICAgbWFyZ2luLXRvcDogMnZoO1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNzMwMEZGIC0xMCUsICM1NTg0RkYgNzAlLCAjNERBQUZGIDEyMCUpICFpbXBvcnRhbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM3MzAwRkYgLTEwJSwgIzU1ODRGRiA3MCUsICM0REFBRkYgMTIwJSkgIWltcG9ydGFudDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDEwdmg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTB2aDtcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTAwcHg7XG4gICAgLS1ib3JkZXItY29sb3I6IHdoaXRlO1xuICAgIC0tYm9yZGVyLXdpZHRoOjFweDtcbiAgICAtLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgZm9udC1mYW1pbHk6ICdPcGVuU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC13ZWlnaHQ6IDQwMFxuICB9XG5cblxuIl19 */"

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
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_aesjs_aes_js_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/aesjs/aes-js.service */ "./src/app/services/aesjs/aes-js.service.ts");











var LoginPage = /** @class */ (function () {
    function LoginPage(loadingController, toastController, auth, menu, router, http, modalCtrl, touchCtrl, store, aesjs) {
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.auth = auth;
        this.menu = menu;
        this.router = router;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.touchCtrl = touchCtrl;
        this.store = store;
        this.aesjs = aesjs;
        this.pockets = [];
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
                this.auth.login(this.username, this.password).then(function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.info('datos de inicio de sesión', data);
                                if (!data) return [3 /*break*/, 5];
                                // @ts-ignore
                                // this.router.navigateByUrl(`/perfil/${data.serializeToken}`);
                                // this.router.navigate(['/perfil',data.id]);
                                return [4 /*yield*/, this.getPocketsList()];
                            case 1:
                                // @ts-ignore
                                // this.router.navigateByUrl(`/perfil/${data.serializeToken}`);
                                // this.router.navigate(['/perfil',data.id]);
                                _a.sent();
                                console.info('mis pockets', this.pockets);
                                return [4 /*yield*/, this.router.navigate(['/app/tabs', { pockets: JSON.stringify(this.pockets) }])];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, this.getUserProfile()];
                            case 3:
                                _a.sent();
                                this.pockets = this.aesjs.encrypt(JSON.stringify(this.pockets));
                                return [4 /*yield*/, this.store.set('pockets', this.pockets)];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, this.presentToast()];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); }).catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.getUserProfile = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var profile;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get('profile/1/view', this.auth, null)];
                    case 1:
                        profile = _a.sent();
                        console.info(profile);
                        profile = this.aesjs.encrypt(JSON.stringify(profile));
                        return [4 /*yield*/, this.store.set('profile', profile)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
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
    LoginPage.prototype.getPocketsList = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.http.get('user-wallet/index', this.auth, null)];
                    case 1:
                        _a.pockets = _b.sent();
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
            _services_fingerprint_touch_login_service__WEBPACK_IMPORTED_MODULE_7__["TouchLoginService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"],
            _services_aesjs_aes_js_service__WEBPACK_IMPORTED_MODULE_9__["AesJsService"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map