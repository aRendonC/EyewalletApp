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

<<<<<<< HEAD
module.exports = "<ion-content padding class=\"bghome\">\n    <div class=\"move-logo\">\n        <ion-img class=\"resize-logo\" src=\"../../assets/img/home-logo.svg\"></ion-img>\n        <div class=\"center\">\n            <ion-label class=\"text-eyewallet\">EYEWALLET</ion-label>\n            <br>\n            <ion-label class=\"text-crypto\">CRYPTO BANK</ion-label>\n        </div>\n    </div>\n    <form #formulario (ngSubmit)=\"login()\" class=\"transparent move-form\">\n    <!-- <form #formulanrio (submit)=\"login()\" class=\"transparent move-form\"> -->\n        <ion-list class=\"transparent\">\n            <!-- Usuario -->\n            <ion-item class=\"transparent white-line\">\n                <ion-img src=\"../../assets/icon/icon-user.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input  class=\"white move-input\" type=\"email\" name=\"username\" [(ngModel)]=\"username\"  placeholder=\"Correo Electrónico\"></ion-input>\n            </ion-item>\n            <!-- Contraseña -->\n            <ion-item class=\"transparent white-line\">\n                    <ion-img src=\"../../assets/icon/icon-pass.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input class=\"white move-input\" type=\"password\" name=\"password\" [(ngModel)]=\"password\" placeholder=\"Contraseña\"></ion-input>\n            </ion-item>\n        </ion-list>\n        <div class=\"move-btn\">\n                <ion-button type=\"submit\" class=\"btn-start\" mode=\"ios\" >Iniciar Sesión</ion-button>\n            <br>\n            <ion-button href=\"/restore\" class=\"btn-create\" mode=\"ios\">Recuperar Contraseña</ion-button>\n        </div>\n        <div text-center=\"\">\n            <ion-button (click)=\"openModal()\">Open Modal</ion-button>\n        </div>\n    </form>\n</ion-content>\n\n"
=======
module.exports = "<ion-content padding class=\"bghome\">\n    <div class=\"move-logo\">\n        <ion-img class=\"resize-logo\" src=\"../../assets/img/home-logo.svg\"></ion-img>\n        <div class=\"center\">\n            <ion-label class=\"text-eyewallet\">EYEWALLET</ion-label>\n            <br>\n            <ion-label class=\"text-crypto\">CRYPTO BANK</ion-label>\n        </div>\n    </div>\n    <form #formulario (ngSubmit)=\"login()\" class=\"transparent move-form\">\n    <!-- <form #formulanrio (submit)=\"login()\" class=\"transparent move-form\"> -->\n        <ion-list class=\"transparent\">\n            <!-- Usuario -->\n            <ion-item class=\"transparent white-line\">\n                <ion-img src=\"../../assets/icon/icon-user.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input  class=\"white move-input\" type=\"email\" name=\"username\" [(ngModel)]=\"username\"  placeholder=\"Correo Electrónico\"></ion-input>\n            </ion-item>\n            <!-- Contraseña -->\n            <ion-item class=\"transparent white-line\">\n                    <ion-img src=\"../../assets/icon/icon-pass.svg\" class=\"resize-icon\"></ion-img>\n                <ion-input class=\"white move-input\" type=\"password\" name=\"password\" [(ngModel)]=\"password\" placeholder=\"Contraseña\"></ion-input>\n            </ion-item>\n        </ion-list>\n        <div class=\"move-btn\">\n                <ion-button type=\"submit\" class=\"btn-start\" mode=\"ios\" >Iniciar Sesión</ion-button>\n            <br>\n            <ion-button href=\"/registry\" class=\"btn-create\" mode=\"ios\">Recuperar Contraseña</ion-button>\n        </div>\n        <div text-center=\"\">\n            <ion-button (click)=\"openModal()\">Open Modal</ion-button>\n        </div>\n    </form>\n</ion-content>\n\n"
>>>>>>> developers

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

<<<<<<< HEAD
module.exports = ".bghome {\n  --background:  url('bg-home.png') no-repeat center center / cover;\n  --background-repeat: no-repeat; }\n\n.move-logo {\n  margin-top: 5vh;\n  margin-left: 15vh; }\n\n.resize-logo {\n  width: 60%; }\n\n.text-eyewallet {\n  font-family: 'Poppins', sans-serif;\n  letter-spacing: 2px;\n  font-weight: 500;\n  font-size: 34px;\n  color: white; }\n\n.text-crypto {\n  font-family: 'Poppins', sans-serif;\n  letter-spacing: 5px;\n  font-weight: 500;\n  font-size: 17px;\n  color: white; }\n\n.center {\n  margin-top: 6vh;\n  text-align: center;\n  width: 100%;\n  margin-left: -7vh; }\n\n.move-btn {\n  margin-top: 5vh;\n  text-align: center; }\n\n.btn-start {\n  --background: #4C6AC0;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 15vh;\n  --padding-end: 14vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --opacity: 0.86;\n  font-family: 'Poppins', sans-serif; }\n\n.btn-create {\n  margin-top: 2vh;\n  --background: transparent;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 10vh;\n  --padding-end: 10vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --border-color: white;\n  --border-width:1px;\n  --border-style: solid;\n  font-family: 'OpenSans', sans-serif;\n  font-weight: 400; }\n\n.transparent {\n  --background: transparent !important;\n  background: transparent !important; }\n\n.move-form {\n  margin-top: 6.5vh;\n  margin-bottom: 6.5vh; }\n\n.white {\n  --placeholder-color: white;\n  color: white; }\n\n.resize-icon {\n  width: 5%; }\n\n.move-input {\n  margin-left: 4vw; }\n\n.white-line {\n  --border-color:white;\n  --highlight-height: 0\n; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWlzbXVuYXItZXllbGluZS9kZXZlbG9wbWVudC9leWVsaW5lL0V5ZXdhbGxldEFwcC9zcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlFQUFhO0VBQ2IsOEJBQW9CLEVBQUE7O0FBSXhCO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQixFQUFBOztBQUdyQjtFQUNJLFVBQVUsRUFBQTs7QUFHZDtFQUNJLGtDQUFrQztFQUNsQyxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksa0NBQWtDO0VBQ2xDLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFlBQVksRUFBQTs7QUFHaEI7RUFDSSxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxpQkFDSixFQUFBOztBQUdBO0VBQ0ksZUFBZTtFQUNmLGtCQUNGLEVBQUE7O0FBRUE7RUFDRSxxQkFBYTtFQUNiLGtHQUF1QjtFQUN2Qiw4RkFBbUI7RUFDbkIscUJBQWdCO0VBQ2hCLG1CQUFjO0VBQ2Qsa0JBQWM7RUFDZCxxQkFBaUI7RUFDakIsc0JBQWdCO0VBQ2hCLGVBQVU7RUFDVixrQ0FBa0MsRUFBQTs7QUFHcEM7RUFDRSxlQUFlO0VBQ2YseUJBQWE7RUFDYixrR0FBdUI7RUFDdkIsOEZBQW1CO0VBQ25CLHFCQUFnQjtFQUNoQixtQkFBYztFQUNkLGtCQUFjO0VBQ2QscUJBQWlCO0VBQ2pCLHNCQUFnQjtFQUNoQixxQkFBZTtFQUNmLGtCQUFlO0VBQ2YscUJBQWU7RUFDZixtQ0FBbUM7RUFDbkMsZ0JBQ0YsRUFBQTs7QUFFRjtFQUNJLG9DQUFhO0VBQ2Isa0NBQWtDLEVBQUE7O0FBR3RDO0VBQ0ksaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUd4QjtFQUNJLDBCQUFvQjtFQUNwQixZQUNKLEVBQUE7O0FBRUE7RUFDSSxTQUFTLEVBQUE7O0FBR2I7RUFDSSxnQkFDSixFQUFBOztBQUVBO0VBQ0ksb0JBQWU7RUFDZjtBQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJnaG9tZXtcbiAgICAtLWJhY2tncm91bmQ6ICB1cmwoJy4uLy4uL2Fzc2V0cy9pbWcvYmctaG9tZS5wbmcnKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciAvIGNvdmVyIDtcbiAgICAtLWJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cbn1cblxuLm1vdmUtbG9nb3tcbiAgICBtYXJnaW4tdG9wOiA1dmg7XG4gICAgbWFyZ2luLWxlZnQ6IDE1dmg7XG59XG5cbi5yZXNpemUtbG9nbyB7XG4gICAgd2lkdGg6IDYwJTtcbn1cblxuLnRleHQtZXlld2FsbGV0e1xuICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi50ZXh0LWNyeXB0b3tcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICAgIGxldHRlci1zcGFjaW5nOiA1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG4uY2VudGVye1xuICAgIG1hcmdpbi10b3A6IDZ2aDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWxlZnQ6IC03dmhcbn1cblxuXG4ubW92ZS1idG57XG4gICAgbWFyZ2luLXRvcDogNXZoO1xuICAgIHRleHQtYWxpZ246IGNlbnRlclxuICB9XG5cbiAgLmJ0bi1zdGFydHtcbiAgICAtLWJhY2tncm91bmQ6ICM0QzZBQzA7XG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNzMwMEZGIC0xMCUsICM1NTg0RkYgNzAlLCAjNERBQUZGIDEyMCUpICFpbXBvcnRhbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM3MzAwRkYgLTEwJSwgIzU1ODRGRiA3MCUsICM0REFBRkYgMTIwJSkgIWltcG9ydGFudDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE1dmg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTR2aDtcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTAwcHg7XG4gICAgLS1vcGFjaXR5OiAwLjg2O1xuICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gIH1cblxuICAuYnRuLWNyZWF0ZXtcbiAgICBtYXJnaW4tdG9wOiAydmg7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM3MzAwRkYgLTEwJSwgIzU1ODRGRiA3MCUsICM0REFBRkYgMTIwJSkgIWltcG9ydGFudDtcbiAgICAtLWJhY2tncm91bmQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAgIC0tcGFkZGluZy1zdGFydDogMTB2aDtcbiAgICAtLXBhZGRpbmctZW5kOiAxMHZoO1xuICAgIC0tcGFkZGluZy10b3A6IDBweDtcbiAgICAtLXBhZGRpbmctYm90dG9tOiAwcHg7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgICAtLWJvcmRlci1jb2xvcjogd2hpdGU7XG4gICAgLS1ib3JkZXItd2lkdGg6MXB4O1xuICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBmb250LWZhbWlseTogJ09wZW5TYW5zJywgc2Fucy1zZXJpZjtcbiAgICBmb250LXdlaWdodDogNDAwXG4gIH1cblxuLnRyYW5zcGFyZW50e1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuXG4ubW92ZS1mb3Jte1xuICAgIG1hcmdpbi10b3A6IDYuNXZoO1xuICAgIG1hcmdpbi1ib3R0b206IDYuNXZoO1xufVxuXG4ud2hpdGV7XG4gICAgLS1wbGFjZWhvbGRlci1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IHdoaXRlXG59XG5cbi5yZXNpemUtaWNvbntcbiAgICB3aWR0aDogNSU7XG59XG5cbi5tb3ZlLWlucHV0e1xuICAgIG1hcmdpbi1sZWZ0OiA0dndcbn1cblxuLndoaXRlLWxpbmV7XG4gICAgLS1ib3JkZXItY29sb3I6d2hpdGU7XG4gICAgLS1oaWdobGlnaHQtaGVpZ2h0OiAwXG59XG5cbiJdfQ== */"
=======
module.exports = ".center {\n  margin-top: 6vh;\n  text-align: center;\n  width: 100%;\n  margin-left: -7vh; }\n\n.btn-create {\n  margin-top: 2vh;\n  --background: transparent;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 10vh;\n  --padding-end: 10vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --border-color: white;\n  --border-width:1px;\n  --border-style: solid;\n  font-family: 'OpenSans', sans-serif;\n  font-weight: 400; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9leWVsaW5lL0RvY3VtZW50cy9HaXRIdWIvRXlld2FsbGV0QXBwL3NyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsaUJBQ0osRUFBQTs7QUFFRTtFQUNFLGVBQWU7RUFDZix5QkFBYTtFQUNiLGtHQUF1QjtFQUN2Qiw4RkFBbUI7RUFDbkIscUJBQWdCO0VBQ2hCLG1CQUFjO0VBQ2Qsa0JBQWM7RUFDZCxxQkFBaUI7RUFDakIsc0JBQWdCO0VBQ2hCLHFCQUFlO0VBQ2Ysa0JBQWU7RUFDZixxQkFBZTtFQUNmLG1DQUFtQztFQUNuQyxnQkFDRixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNlbnRlcntcbiAgICBtYXJnaW4tdG9wOiA2dmg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtN3ZoXG59XG5cbiAgLmJ0bi1jcmVhdGV7XG4gICAgbWFyZ2luLXRvcDogMnZoO1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNzMwMEZGIC0xMCUsICM1NTg0RkYgNzAlLCAjNERBQUZGIDEyMCUpICFpbXBvcnRhbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM3MzAwRkYgLTEwJSwgIzU1ODRGRiA3MCUsICM0REFBRkYgMTIwJSkgIWltcG9ydGFudDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDEwdmg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTB2aDtcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTAwcHg7XG4gICAgLS1ib3JkZXItY29sb3I6IHdoaXRlO1xuICAgIC0tYm9yZGVyLXdpZHRoOjFweDtcbiAgICAtLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgZm9udC1mYW1pbHk6ICdPcGVuU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC13ZWlnaHQ6IDQwMFxuICB9XG5cblxuIl19 */"
>>>>>>> developers

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