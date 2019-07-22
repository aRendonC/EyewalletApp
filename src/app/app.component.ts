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

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    // set up hardware back button event.
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;
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
        private aletrCtrl: AlertController
    ) {
        this.initializeApp();

        // this.backButtonEvent();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            document.addEventListener("backbutton", async (element) => {
                // code that is executed when the user pressed the back button
                console.log('hola, estás intentando salir de la aplicación', element)
                // try {
                //     const element = await this.actionSheetCtrl.getTop();
                //     console.log('', element);
                //     if (element) {
                //         await element.dismiss();
                //         return;
                //     }
                // } catch (error) {
                //     console.error(error)
                // }
                this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
                    console.log('esto es el outlet', outlet)
                    console.log('esta es mi ruta', this.router.url)
                    if (this.router.url === '/app/tabs/dashboard') {
                        await this.presentAlert()
                        // console.log('desde acá se sale la aplicaicón')
                        // if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                        //     console.log('acá agarra no sé qué tiempo')
                        //     // this.platform.exitApp(); // Exit from app
                        //     navigator['app'].exitApp(); // work in ionic 4
                        //
                        // } else {
                        //     console.log('Acá le muestra un toast para decirle que cerrará la aplicación')
                        //     await this.toast.presentToast({
                        //         text: `Press back again to exit App.`,
                        //         duration: 2000,
                        //     });
                        //     this.lastTimeBackPress = new Date().getTime();
                        // }
                    }
                });
            });
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.touchLogin.ngOnInit()
        });
    }

    async presentAlert() {
        const alert = await this.aletrCtrl.create({
            backdropDismiss: false,
            header: 'Cerrar aplicación',
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

}
