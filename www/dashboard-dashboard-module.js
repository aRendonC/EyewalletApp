(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.page */ "./src/app/dashboard/dashboard.page.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");








var routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]
    }
];
var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
            ],
            declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]]
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.page.html":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n    <!--<ion-toolbar>\n        <ion-img  [class]=\"classLeft\" [src]=\"imgLeft\" (click)=\"enviar()\"></ion-img>\n        <ion-img class=\"resize-logo\" src=\"../../assets/img/dashboard-logo.svg\"></ion-img>\n        <ion-img class=\"resize-logo-right\" [src]=\"imgRight\" (click)=\"recibir()\" *ngIf=\"imgRight\"></ion-img>\n      </ion-toolbar>-->\n</ion-header>\n\n<ion-content class=\"bgdashboard1\">\n  <div class=\"contentdash\">\n      <app-pocket [pockets]=\"pockets\"></app-pocket>\n  </div>\n  <br>\n  <br>\n  <br>\n  <br>\n  <!--<app-chart name=\"transaction\" limit=\"10\"></app-chart>-->\n\n    <app-sliders name=\"Bitcoin\"></app-sliders>\n<ion-button (click)=\"openModalVerification()\">Modal verificación</ion-button>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.page.scss":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bgdashboard {\n  --background:  url('bg-dashboard.png');\n  --background-repeat: no-repeat; }\n\n.resize-logo {\n  width: 30%;\n  top: 5%;\n  left: 35%;\n  display: block;\n  margin: auto;\n  position: absolute; }\n\n.resize-logo-left1 {\n  width: 30%;\n  top: 3.5%;\n  position: absolute;\n  right: 90%; }\n\n.resize-logo-left {\n  width: 30%;\n  top: 2%;\n  position: absolute;\n  right: 70%; }\n\n.resize-logo-right {\n  width: 10%;\n  top: 3.5%;\n  position: absolute;\n  left: 90%; }\n\n.text-moneda {\n  margin-top: 5%;\n  font-family: 'Poppins', sans-serif;\n  font-weight: 500;\n  color: black;\n  font-size: 34px; }\n\n.center {\n  top: 10%;\n  text-align: center;\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9leWVsaW5lL0RvY3VtZW50cy9HaXRIdWIvRXlld2FsbGV0QXBwL3NyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxzQ0FBYTtFQUNiLDhCQUFvQixFQUFBOztBQU14QjtFQUNJLFVBQVU7RUFDVixPQUFPO0VBQ1AsU0FBUztFQUNULGNBQWE7RUFDakIsWUFBVztFQUNYLGtCQUFrQixFQUFBOztBQUlsQjtFQUNJLFVBQVU7RUFDVixTQUFRO0VBQ1Isa0JBQWtCO0VBQ2xCLFVBQVUsRUFBQTs7QUFHZDtFQUNJLFVBQVU7RUFDVixPQUFNO0VBQ04sa0JBQWtCO0VBQ2xCLFVBQVUsRUFBQTs7QUFHZDtFQUNJLFVBQVU7RUFDVixTQUFRO0VBQ1Isa0JBQWtCO0VBQ2xCLFNBQ0osRUFBQTs7QUFFQTtFQUNJLGNBQWE7RUFDYixrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixlQUFlLEVBQUE7O0FBR25CO0VBQ0ksUUFBTztFQUNQLGtCQUFrQjtFQUNsQixXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmJnZGFzaGJvYXJke1xuICAgIC0tYmFja2dyb3VuZDogIHVybCgnLi4vLi4vYXNzZXRzL2ltZy9iZy1kYXNoYm9hcmQucG5nJyk7XG4gICAgLS1iYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXG59XG5cblxuXG4ucmVzaXplLWxvZ28ge1xuICAgIHdpZHRoOiAzMCU7XG4gICAgdG9wOiA1JTtcbiAgICBsZWZ0OiAzNSU7XG4gICAgZGlzcGxheTpibG9jaztcbm1hcmdpbjphdXRvO1xucG9zaXRpb246IGFic29sdXRlO1xuXG59XG5cbi5yZXNpemUtbG9nby1sZWZ0MXtcbiAgICB3aWR0aDogMzAlO1xuICAgIHRvcDozLjUlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogOTAlO1xufVxuXG4ucmVzaXplLWxvZ28tbGVmdHtcbiAgICB3aWR0aDogMzAlO1xuICAgIHRvcDoyJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDcwJTtcbn1cblxuLnJlc2l6ZS1sb2dvLXJpZ2h0e1xuICAgIHdpZHRoOiAxMCU7XG4gICAgdG9wOjMuNSU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDkwJVxufVxuXG4udGV4dC1tb25lZGF7XG4gICAgbWFyZ2luLXRvcDo1JTtcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGZvbnQtc2l6ZTogMzRweDtcbn1cblxuLmNlbnRlcntcbiAgICB0b3A6MTAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.page.ts":
/*!*********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.ts ***!
  \*********************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _verification_modal_verification_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../verification-modal/verification-modal.page */ "./src/app/verification-modal/verification-modal.page.ts");
/* harmony import */ var _animations_enter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animations/enter */ "./src/app/animations/enter.ts");
/* harmony import */ var _animations_leave__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animations/leave */ "./src/app/animations/leave.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_aesjs_aes_js_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/aesjs/aes-js.service */ "./src/app/services/aesjs/aes-js.service.ts");









var DashboardPage = /** @class */ (function () {
    function DashboardPage(route, modalCtrl, store, aesjs) {
        this.route = route;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.aesjs = aesjs;
        this.imgLeft = null;
        this.imgRight = null;
        this.classLeft = null;
        this.bandera = null;
        this.pockets = [];
        this.classLeft = "resize-logo-left1";
        this.imgLeft = "../../assets/img/btn-left-s.svg";
        this.imgRight = "../../assets/img/btn-right.svg";
    }
    DashboardPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
                console.log('estos son mis pockets', this.pockets);
                return [2 /*return*/];
            });
        });
    };
    DashboardPage.prototype.openModalVerification = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _verification_modal_verification_modal_page__WEBPACK_IMPORTED_MODULE_4__["VerificationModalPage"],
                            enterAnimation: _animations_enter__WEBPACK_IMPORTED_MODULE_5__["enterAnimation"],
                            leaveAnimation: _animations_leave__WEBPACK_IMPORTED_MODULE_6__["leaveAnimation"]
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DashboardPage.prototype.enviar = function () { };
    DashboardPage.prototype.recibir = function () {
    };
    DashboardPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.page.html */ "./src/app/dashboard/dashboard.page.html"),
            styles: [__webpack_require__(/*! ./dashboard.page.scss */ "./src/app/dashboard/dashboard.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"],
            _services_aesjs_aes_js_service__WEBPACK_IMPORTED_MODULE_8__["AesJsService"]])
    ], DashboardPage);
    return DashboardPage;
}());



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map