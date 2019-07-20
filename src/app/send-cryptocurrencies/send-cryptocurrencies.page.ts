import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import {AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";
import {TouchLoginService} from "../services/fingerprint/touch-login.service";

@Component({
  selector: 'app-send-cryptocurrencies',
  templateUrl: './send-cryptocurrencies.page.html',
  styleUrls: ['./send-cryptocurrencies.page.scss'],
})
export class SendCryptocurrenciesPage implements OnInit {
  @Input() public pockets: any = [];
  public cssGradient = 'backGroundGradient';
  public cssCtrlContents = true;
    totalSend: any = null;
    ctrlNavigation: number = 1;
    isOn  = false;
    scanner: any;
    ctrlButtonSend: boolean = true;
    bodyForm: FormGroup;
    placeHolder: any = '';
    body = {
        amount: '',
        to_address: '',
        priority: '',
        from_address: '',
        pin: '',
        description: 'descripcion',
        currencyId: ''
    };
    fee: any = null;
    scanSub: any;
    feeAndSend: any = null;
  constructor(
      private route: ActivatedRoute,
      private qrScanner: QRScanner,
      private http: AxiosService,
      protected auth: AuthService,
      private alerrtCtrl: AlertController,
      protected store: Storage,
      private aesjs: AesJsService,
      private toastCtrl: ToastService,
      private loadingCtrl: LoadingService,
      private router: Router,
      private touchCtrl: TouchLoginService
  ) { }


  ngOnInit() {
      this.bodyForm = new FormGroup({
          amount: new FormControl('', Validators.compose([
              Validators.required,
              Validators.maxLength(8)
          ])),
          to_address: new FormControl('', Validators.compose([
              Validators.required
              ])),
          priority: new FormControl('', Validators.compose([
              Validators.required
          ])),
          from_address: new FormControl(''),
          description: new FormControl(''),
          currencyId: new FormControl(''),
          fee: new FormControl('')
      });
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pocket'));
      this.body.from_address = this.pockets.address
  }

    presentQRScanner() {
        this.qrScanner.prepare()
            .then(async (status: QRScannerStatus) => {
                this.touchCtrl.isTouch = false
                if (status.authorized) {
                    this.isOn = true;
                    this.cssGradient = 'backGroundGradientQr';
                    this.cssCtrlContents = false;
                    // start scanning
                     this.scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        this.placeHolder = text;
                         this.bodyForm.get('to_address').setValue(text);
                        await this.unSuscribed()
                    });

                    await this.qrScanner.show();


                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                    this.qrScanner.openSettings();
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    async unSuscribed() {
        this.touchCtrl.isTouch = true
        this.isOn = false;
        this.cssGradient = 'backGroundGradient';
        this.cssCtrlContents = true;
        let element = document.getElementById('QRScaner');
        console.log(element);
        element.classList.remove('show-qr-scanner');
       await this.qrScanner.destroy();
        this.scanSub.unsubscribe();
    }

    async getFeeTransaction() {
      if(this.bodyForm.value.to_address && this.bodyForm.value.amount) {
          console.log(this.bodyForm);
          this.fee = await this.http.post('transaction/feeNetworkBTC', this.bodyForm.value, this.auth);
          console.log(this.fee);
          if(this.fee.status === 200) {
              this.fee = this.fee.data;
              this.totalSend = 'Total del envío ' + ((parseFloat(this.bodyForm.value.amount) + parseFloat(this.fee)).toFixed(8));
              this.feeAndSend = (parseFloat(this.bodyForm.value.amount) + parseFloat(this.fee)).toFixed(8)
              // this.totalSend = this.fee.error_message
          }
      } else {
          console.log('falta un campo')
      }
    }

    async sendCoin() {
      console.log(this.bodyForm)
        this.ctrlButtonSend = false;
        if(this.pockets.balance >= this.feeAndSend) {
            console.info('listo para enviar');
            // await this.presentAlertSend()
        } else {
            await this.toastCtrl.presentToast({text: 'No tiene fondos suficientes'})
        }
    }

    async presentAlertSend() {
        const alert = await this.alerrtCtrl.create({
            backdropDismiss: false,
            header: 'Ingresa tu PIN',
            keyboardClose: false,
            inputs: [
                {
                    name: 'pin',
                    type: 'text',
                    placeholder: 'Ingrese su pin',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (alertData) => {
                        this.ctrlButtonSend = true;
                        console.log(alertData);
                    }
                }, {
                    text: 'Ok',
                    handler: async (alertData) => {
                        let security = await this.store.get('user');
                        security = this.aesjs.decryptNoJson(security.pin);
                        if(security === alertData.pin) {
                            await this.loadingCtrl.present({});
                            security = this.aesjs.encryptNoJson(security);
                            this.bodyForm.value.currencyId = this.pockets.currencyId;
                            this.bodyForm.value.pin = security;
                            this.bodyForm.value.from_address = this.pockets.address;
                            this.bodyForm.value.fee = this.fee;
                            console.log('body para enviar criptos', this.bodyForm);
                            let response = await this.http.post('transaction/sendBTC', this.bodyForm.value, this.auth);
                            console.log('respuesta de la transaccion', response);
                            if (response.status === 200) {
                                await this.loadingCtrl.dismiss();
                               await this.toastCtrl.presentToast({text: 'Transacción realizada con éxito'});
                                let dataResponse = await this.getPocketTransaction();
                                await this.store.set('pockets',  this.pockets);
                                if(dataResponse.status === 200) {
                                    dataResponse.pocket = this.pockets;
                                  await this.store.set('transaction', dataResponse)
                                } else {
                                    await this.toastCtrl.presentToast({text: dataResponse.error.msg})
                                }
                                await this.router.navigate(['app/tabs/dashboard'])
                            } else {
                                await this.loadingCtrl.dismiss();
                                await this.toastCtrl.presentToast({text: 'Hubo un error'})
                            }
                        } else {
                            await this.toastCtrl.presentToast({text: 'Pin incorrecto'})
                        }
                        this.ctrlButtonSend = true;
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }

    // async presentToast(text) {
    //     const toast = await this.toastCtrl.create({
    //         message: text,
    //         duration: 2000
    //     });
    //     await toast.present();
    // }

    async getPocketTransaction() {
        let body = {
            userId: this.pockets.userId,
            type: 0,
            address: this.pockets.address
        };
        return await this.http.post('transaction/index', body, this.auth);
    }
}