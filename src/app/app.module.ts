import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AxiosService} from './services/axios/axios.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptadorService} from './services/axios/interceptador.service';
import {Camera} from '@ionic-native/camera/ngx';
import {CameraProvider} from './services/camera/camera';
import {Device} from '@ionic-native/device/ngx';
import {NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {TouchLoginService} from './services/fingerprint/touch-login.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {PinModalPage} from "./pin-modal/pin-modal.page";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// LocalStorage.
import { IonicStorageModule } from '@ionic/storage';
import {ComponentsModule} from "./components/components.module";


@NgModule({

  declarations: [AppComponent, PinModalPage],
  entryComponents: [PinModalPage],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptadorService, multi: true},
    AxiosService,
    Camera,
    CameraProvider,
    Device,
    NativePageTransitions,
    FingerprintAIO,
    TouchLoginService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
