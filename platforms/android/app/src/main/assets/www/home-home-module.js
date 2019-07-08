(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");








var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [
                _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content padding class=\"bghome\" >\n<div class=\"move-logo\">\n    <ion-img class=\"resize-logo\" src=\"../../assets/img/home-logo.svg\"></ion-img>\n    <div class=\"center\">\n        <ion-label class=\"text-eyewallet\">EYEWALLET</ion-label>\n        <br>\n        <ion-label class=\"text-crypto\">CRYPTO BANK</ion-label>\n    </div>\n</div>\n\n<div class=\"move-btn\">\n    <ion-button href=\"/login\" class=\"btn-start\" mode=\"ios\">Iniciar Sesión</ion-button>\n    <br>\n    <ion-button href=\"/registry\" class=\"btn-create\" mode=\"ios\">Crear Billetera</ion-button>\n</div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"https://fonts.googleapis.com/css?family=Exo+2:400,600|Open+Sans:400,700,800|Poppins:400,500,600|Roboto:400,500,900&display=swap\");\n/** Import Fonts **/\n/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #3880ff;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #3171e0;\n  --ion-color-primary-tint: #4c8dff;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.welcome-card ion-img {\n  max-height: 35vh;\n  overflow: hidden; }\n.bghome {\n  --background: url('bg-home.png') no-repeat center center / cover; }\n.move-logo {\n  margin-top: 5vh;\n  margin-left: 15vh; }\n.resize-logo {\n  width: 60%; }\n.center {\n  margin-top: 6vh;\n  text-align: center;\n  width: 100%;\n  margin-left: -7vh; }\n.text-eyewallet {\n  font-family: 'Poppins', sans-serif;\n  letter-spacing: 2px;\n  font-weight: 500;\n  font-size: 34px;\n  color: white; }\n.text-crypto {\n  font-family: 'Poppins', sans-serif;\n  letter-spacing: 5px;\n  font-weight: 500;\n  font-size: 17px;\n  color: white; }\n.move-btn {\n  margin-top: 30vh;\n  text-align: center; }\n.move-input {\n  margin-left: 4vw !important; }\n.btn-start {\n  --background: #4C6AC0;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 15vh;\n  --padding-end: 14vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --opacity: 0.86;\n  font-family: 'Poppins', sans-serif; }\n.btn-create {\n  margin-top: 2vh;\n  --background: transparent;\n  --background-activated: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --background-hover: linear-gradient(45deg, #7300FF -10%, #5584FF 70%, #4DAAFF 120%) !important;\n  --padding-start: 15vh;\n  --padding-end: 14vh;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --border-radius: 100px;\n  --border-color: white;\n  --border-width:1px;\n  --border-style: solid;\n  font-family: 'Poppins', sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9leWVsaW5lL0RvY3VtZW50cy9HaXRIdWIvRXlld2FsbGV0QXBwL3NyYy90aGVtZS92YXJpYWJsZXMuc2NzcyIsIi9Vc2Vycy9leWVsaW5lL0RvY3VtZW50cy9HaXRIdWIvRXlld2FsbGV0QXBwL3NyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsOElBQVk7QUFGWixtQkFBQTtBQUlBLDBCQUFBO0FBRUE7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLHFDQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQzlFekI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCLEVBQUE7QUFHbEI7RUFDRSxnRUFBYSxFQUFBO0FBR2Y7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCLEVBQUE7QUFHbkI7RUFDRSxVQUFVLEVBQUE7QUFHWjtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGlCQUNGLEVBQUE7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixZQUFZLEVBQUE7QUFHZDtFQUNFLGtDQUFrQztFQUNsQyxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixZQUFZLEVBQUE7QUFHZDtFQUNFLGdCQUFnQjtFQUNoQixrQkFDRixFQUFBO0FBRUE7RUFDRSwyQkFBMkIsRUFBQTtBQUc3QjtFQUNFLHFCQUFhO0VBQ2Isa0dBQXVCO0VBQ3ZCLDhGQUFtQjtFQUNuQixxQkFBZ0I7RUFDaEIsbUJBQWM7RUFDZCxrQkFBYztFQUNkLHFCQUFpQjtFQUNqQixzQkFBZ0I7RUFDaEIsZUFBVTtFQUNWLGtDQUFrQyxFQUFBO0FBR3BDO0VBQ0UsZUFBZTtFQUNmLHlCQUFhO0VBQ2Isa0dBQXVCO0VBQ3ZCLDhGQUFtQjtFQUNuQixxQkFBZ0I7RUFDaEIsbUJBQWM7RUFDZCxrQkFBYztFQUNkLHFCQUFpQjtFQUNqQixzQkFBZ0I7RUFDaEIscUJBQWU7RUFDZixrQkFBZTtFQUNmLHFCQUFlO0VBQ2Ysa0NBQWtDLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgVmFyaWFibGVzIGFuZCBUaGVtaW5nLiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlOlxuLy8gaHR0cDovL2lvbmljZnJhbWV3b3JrLmNvbS9kb2NzL3RoZW1pbmcvXG5cbi8qKiBJbXBvcnQgRm9udHMgKiovXG5cbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9RXhvKzI6NDAwLDYwMHxPcGVuK1NhbnM6NDAwLDcwMCw4MDB8UG9wcGluczo0MDAsNTAwLDYwMHxSb2JvdG86NDAwLDUwMCw5MDAmZGlzcGxheT1zd2FwJyk7XG5cbi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xuXG46cm9vdCB7XG4gIC8qKiBwcmltYXJ5ICoqL1xuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMzg4MGZmO1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogNTYsIDEyOCwgMjU1O1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzMxNzFlMDtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjNGM4ZGZmO1xuXG4gIC8qKiBzZWNvbmRhcnkgKiovXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XG5cbiAgLyoqIHRlcnRpYXJ5ICoqL1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xuXG4gIC8qKiBzdWNjZXNzICoqL1xuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XG5cbiAgLyoqIHdhcm5pbmcgKiovXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcblxuICAvKiogZGFuZ2VyICoqL1xuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XG5cbiAgLyoqIGRhcmsgKiovXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xuXG4gIC8qKiBtZWRpdW0gKiovXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xuXG4gIC8qKiBsaWdodCAqKi9cbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XG59XG4iLCJAaW1wb3J0ICcuLi8uLi90aGVtZS92YXJpYWJsZXMuc2Nzcyc7XG5cbi53ZWxjb21lLWNhcmQgaW9uLWltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5iZ2hvbWV7XG4gIC0tYmFja2dyb3VuZDogdXJsKCcuLi8uLi9hc3NldHMvaW1nL2JnLWhvbWUucG5nJykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgLyBjb3ZlciA7XG4gIH1cblxuLm1vdmUtbG9nb3tcbiAgbWFyZ2luLXRvcDogNXZoO1xuICBtYXJnaW4tbGVmdDogMTV2aDtcbn1cblxuLnJlc2l6ZS1sb2dvIHtcbiAgd2lkdGg6IDYwJTtcbn1cblxuLmNlbnRlcntcbiAgbWFyZ2luLXRvcDogNnZoO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tbGVmdDogLTd2aFxufVxuXG4udGV4dC1leWV3YWxsZXR7XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gIGxldHRlci1zcGFjaW5nOiAycHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMzRweDtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4udGV4dC1jcnlwdG97XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gIGxldHRlci1zcGFjaW5nOiA1cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubW92ZS1idG57XG4gIG1hcmdpbi10b3A6IDMwdmg7XG4gIHRleHQtYWxpZ246IGNlbnRlclxufVxuXG4ubW92ZS1pbnB1dHtcbiAgbWFyZ2luLWxlZnQ6IDR2dyAhaW1wb3J0YW50O1xufVxuXG4uYnRuLXN0YXJ0e1xuICAtLWJhY2tncm91bmQ6ICM0QzZBQzA7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAtLWJhY2tncm91bmQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAtLXBhZGRpbmctc3RhcnQ6IDE1dmg7XG4gIC0tcGFkZGluZy1lbmQ6IDE0dmg7XG4gIC0tcGFkZGluZy10b3A6IDBweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAtLW9wYWNpdHk6IDAuODY7XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG59XG5cbi5idG4tY3JlYXRle1xuICBtYXJnaW4tdG9wOiAydmg7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAtLWJhY2tncm91bmQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzczMDBGRiAtMTAlLCAjNTU4NEZGIDcwJSwgIzREQUFGRiAxMjAlKSAhaW1wb3J0YW50O1xuICAtLXBhZGRpbmctc3RhcnQ6IDE1dmg7XG4gIC0tcGFkZGluZy1lbmQ6IDE0dmg7XG4gIC0tcGFkZGluZy10b3A6IDBweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAtLWJvcmRlci1jb2xvcjogd2hpdGU7XG4gIC0tYm9yZGVyLXdpZHRoOjFweDtcbiAgLS1ib3JkZXItc3R5bGU6IHNvbGlkO1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_axios_axios_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/axios/axios.service */ "./src/app/services/axios/axios.service.ts");
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth/auth.service */ "./src/app/services/auth/auth.service.ts");
/* harmony import */ var _services_camera_camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/camera/camera */ "./src/app/services/camera/camera.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_device_device_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/device/device.service */ "./src/app/services/device/device.service.ts");








var MEDIA_FILES_KEY = 'mediaFiles';
var HomePage = /** @class */ (function () {
    function HomePage(timer, axios, auth, camera, alertCtrl, toastCtrl, device) {
        this.timer = timer;
        this.axios = axios;
        this.auth = auth;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.device = device;
        this.dataDevice = null;
        this.usuario = null;
        this.temporizador = timer.temporizador;
        this.dataDevice = this.deviceData();
    }
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.photo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            buttons: [
                                {
                                    text: 'tomar foto',
                                    handler: function () { return _this.takePhoto(); }
                                },
                                {
                                    text: 'seleccionar foto',
                                    handler: function () { return _this.selecPhoto(); }
                                },
                                {
                                    text: 'cancelar',
                                    role: 'cancel',
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.takePhoto = function () {
        var _this = this;
        this.camera.getPhoto().then(function (data) {
            _this.sendServer(data);
        }).catch(function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.selecPhoto = function () {
        var _this = this;
        this.camera.getPhotoDirectory().then(function (data) {
            _this.sendServer(data);
        }).catch(function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.sendServer = function (data64) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.axios.post('profile/upload-photo', { pic: data64 }, this.auth).then(function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var toast;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.usuario.url_img = data;
                                return [4 /*yield*/, this.toastCtrl.create({
                                        message: 'foto enviada correctamente.',
                                        duration: 2000
                                    })];
                            case 1:
                                toast = _a.sent();
                                toast.present();
                                return [2 /*return*/];
                        }
                    });
                }); }).catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.deviceData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.device.getDataDevice()];
                    case 1:
                        _a.dataDevice = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_axios_axios_service__WEBPACK_IMPORTED_MODULE_3__["AxiosService"],
            _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _services_camera_camera__WEBPACK_IMPORTED_MODULE_5__["CameraProvider"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"],
            _services_device_device_service__WEBPACK_IMPORTED_MODULE_7__["DeviceService"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map