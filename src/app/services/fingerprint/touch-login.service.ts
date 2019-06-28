import {Injectable, OnInit} from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {Platform} from "@ionic/angular";
import {Subscription} from "rxjs";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {AuthService} from '../auth/auth.service'
import { Router } from '@angular/router';

@Injectable()
export class TouchLoginService implements OnInit{

  private subscription: any = null
  public isTouch = true;
  private isLocked: boolean = false;
  private initialized: boolean = false;
  private onPauseSubscription: Subscription;
  private onResumeSubscription: Subscription;

  constructor(
      private faio: FingerprintAIO,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private auth: AuthService,
      private router: Router
      ) {
  }

      ngOnInit() {
    console.log('inició el touch login')
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
              console.info(this.auth.isLogin)
              if (this.auth.isLogin) {
                if (this.isTouch) {
                  this.showFingerPrint();
                  this.login();
                  console.log('bloqueado', this.isLocked);

                }
              } else {
                console.log('verificar este if')
                this.router.navigate(['']);
              }
            }
            console.log('no bloqueado', this.isLocked)
            this.splashScreen.hide();
            this.isLocked = false;
              this.showFingerPrint();
          });
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
            this.exitApp();
          });
        }).catch((error: any) => console.log('entro al carch sin cancelar', error));
  }

  login() {
    this.router.navigate(['/app/tabs/home']);
  }

  exitApp() {
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }
}


