import {Injectable, OnInit} from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {ModalController, Platform} from "@ionic/angular";
import {Subscription} from "rxjs";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {AuthService} from '../auth/auth.service'
import { Router } from '@angular/router';
import {PinModalPage} from "../../pin-modal/pin-modal.page";

@Injectable()
export class TouchLoginService implements OnInit{

  private subscription: any = null
  public isTouch:boolean = true;
  private isLocked: boolean = false;
  private initialized: boolean = false;
  private onPauseSubscription: Subscription;
  private onResumeSubscription: Subscription;

  constructor(
      private faio: FingerprintAIO,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private auth: AuthService,
      private router: Router,
      public modalCtrl: ModalController
      ) {
  }

      ngOnInit() {
      console.info('este es el touch login')
          if (this.initialized) {
              return;
          }

          this.platform.ready().then(() => {
              this.onPauseSubscription = this.platform.pause.subscribe(() => {
                  this.splashScreen.show();
              });
              this.onResumeSubscription = this.platform.resume.subscribe(() => {
                  if (!this.isLocked) {
                      this.isLocked = true;
                      if (this.auth.isLogin()) {
                          if (this.isTouch) {
                              this.showFingerPrint();
                              // this.login();
                              console.log('bloqueado', this.isLocked);

                          }
                      } else {
                          console.log('verificar este if')
                          // let nav = this.app.getActiveNav();

                          // nav.setRoot('LoginPage');
                          // nav.popToRoot;
                      }
                  }
                  console.log('no bloqueado', this.isLocked)
                  this.splashScreen.hide();
                  this.isLocked = false;

              });
          }).catch(er => {
              console.info('esto sería para navegador', er)
          });
      }


    showFingerPrint() {
        this.faio.isAvailable()
            .then(result => {
                console.log('huella avaliable', result)
                this.faio.show({
                    clientId: 'Identificar de huella',
                    clientSecret: 'password',   //Only necessary for Android
                    disableBackup: false,  //Only for Android(optional)
                    localizedFallbackTitle: 'Use Pin',      //Only for iOS
                    localizedReason: 'Please authenticate', //Only for iOS

                })
                    .then((result: any) => {
                        console.log('huella verificada', result)
                        this.login();
                        this.isLocked = false;

                    }).catch((error: any) => {
                    console.log('entro al catch, cuando canelo', error)
                    this.openModal()
                    // this.exitApp();
                });
            }).catch((error: any) => console.log('entro al carch sin cancelar', error));
    }

  login() {
      this.router.navigate(['/app/tabs']);
  }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: PinModalPage,
            componentProps: {
                paramID: 123,
                paramTitle : 'Test title'
            }
        });

        return await modal.present();
    }
  exitApp() {
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }
}


