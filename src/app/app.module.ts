import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AxiosService} from './services/axios/axios.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InterceptadorService} from './services/axios/interceptador.service';
import {Camera} from '@ionic-native/camera/ngx';
import {CameraProvider} from './services/camera/camera';
import {Device} from '@ionic-native/device/ngx';
import {NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {TouchLoginService} from './services/fingerprint/touch-login.service';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {PinModalPage} from './pin-modal/pin-modal.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {LoadingService} from "./services/loading/loading.service";
import {IonicStorageModule} from '@ionic/storage';
import {ComponentsModule} from './components/components.module';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {VerificationModalPage} from './verification-modal/verification-modal.page';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {HammerService} from "./services/hammer/hammer.service";
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ModalDetailsPageModule } from './modal-details/modal-details.module';
import { ModalDetailsPage } from './modal-details/modal-details.page';
import { PinModalRegistryPage } from './pin-modal-registry/pin-modal-registry.page';
import { SesionModalPage } from './sesion-modal/sesion-modal.page';

const config: SocketIoConfig = { url: 'https://83a4f4e9.ngrok.io', options: {}};

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({

    declarations: [AppComponent, PinModalPage, VerificationModalPage, PinModalRegistryPage, SesionModalPage],
    entryComponents: [PinModalPage, VerificationModalPage, ModalDetailsPage, SesionModalPage],
    imports: [
        ComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        ModalDetailsPageModule,
        IonicModule.forRoot({
            hardwareBackButton: false,
            mode: "ios",
            swipeBackEnabled: false,
            persistConfig: true
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        NgxQRCodeModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [
        StatusBar,
        Geolocation,
        LocationAccuracy,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: InterceptadorService, multi: true},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerService
        },
        AxiosService,
        Camera,
        CameraProvider,
        Device,
        UniqueDeviceID,
        NativePageTransitions,
        FingerprintAIO,
        TouchLoginService,
        Clipboard,
        InAppBrowser,
        LoadingService,
        Diagnostic
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
