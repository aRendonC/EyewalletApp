import {Component, QueryList, ViewChildren} from '@angular/core';

import {
    ActionSheetController,
    AlertController,
    IonRouterOutlet,
    MenuController,
    ModalController,
    NavController,
    Platform,
    PopoverController
} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth/auth.service';
import {TimerService} from './services/timer/timer.service';
import {TouchLoginService} from "./services/fingerprint/touch-login.service";
import {Router} from "@angular/router";
import {ToastService} from "./services/toast/toast.service";
import {text} from "@angular/core/src/render3";
import {LanguageService} from "./services/language/language.service";
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Socket } from 'ngx-socket-io';
import { AesJsService } from './services/aesjs/aes-js.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    // set up hardware back button event.


    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController,
        private auth: AuthService,
        private timer: TimerService,
        private touchLogin: TouchLoginService,
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController,
        public modalCtrl: ModalController,
        private menu: MenuController,
        private router: Router,
        private toast: ToastService,
        private aletrCtrl: AlertController,
        private languageService: LanguageService,
        private uniqueDeviceID: UniqueDeviceID,
        private socket: Socket,
        private aesJ: AesJsService,
    ) {
        this.initializeApp();

        // this.backButtonEvent();
    }

    initializeApp() {
        //const des = this.createChannel();
        //const valor = this.aesJ.decrypt(des);
        this.socket.on('connection', data => console.log("==================", data));
        
        this.platform.ready().then(() => {
            document.addEventListener("backbutton", async (element) => {
                // code that is executed when the user pressed the back button
                this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
                    if (this.router.url === '/app/tabs/dashboard') {
                        let alert = await this.aletrCtrl.getTop();
                        if(alert == undefined) await this.presentAlert()
                    }
                });
            });
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.touchLogin.ngOnInit()
            this.languageService.setInitialAppLanguage()
        });
    }

    async presentAlert() {
        const alert = await this.aletrCtrl.create({
            backdropDismiss: false,
            header: 'Cerrar',
            message: '¿Desea cerrar la aplicación?',
            mode: 'ios',
            keyboardClose: false,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Aceptar',
                    handler: async () => {
                        navigator['app'].exitApp(); // work in ionic 4
                    }
                }
            ]
        });
        await alert.present();
    }

    async createChannel() {
        const dates = new Date().getTime();
        const rando = Math.random().toString(36).substring(7);
        const valor = this.aesJ.encrypt(rando + dates);
        return valor;
    }

}
