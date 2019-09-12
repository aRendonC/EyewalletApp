import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import { AlertController, ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {TranslateService} from "@ngx-translate/core";
import { PinModalPage } from "../pin-modal/pin-modal.page";
import { DataLocalService } from '../services/data-local/data-local.service';

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
    isOn = false;
    scanner: any;
    ctrlButtonSend: boolean = true;
    bodyForm: FormGroup;
    placeHolder: any = '';
    sendCrypto: boolean = true;
    body = {
        amount: '',
        to_address: '',
        priority: '',
        from_address: '',
        pin: '',
        description: 'descripcion',
        currencyId: ''
    };
    totalApplied: any = {
        fee: 0,
        priceCriptoUsd: 0,
        amountMin: 0.001,
        amountMaxUsd: 0,
        amountMaxBtc: 0,
        address: null
    };
    scanSub: any;
    feeAndSend: any = null;

    constructor(
        private route: ActivatedRoute,
        private qrScanner: QRScanner,
        private http: AxiosService,
        protected auth: AuthService,
        private alerrtCtrl: AlertController,
        private store1: DataLocalService,
        protected store: Storage,
        private aesjs: AesJsService,
        private toastCtrl: ToastService,
        private loadingCtrl: LoadingService,
        private router: Router,
        private touchCtrl: TouchLoginService,
        private translateService: TranslateService,
        public modalController: ModalController
    ) {
    }


    async ngOnInit() {
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

    async ionViewDidEnter() {
        await this.getPriceCripto();
    }

    presentQRScanner() {
        this.bodyForm.get('to_address').setValue('');
        this.qrScanner.prepare()
            .then(async (status: QRScannerStatus) => {
                this.touchCtrl.isTouch = false;
                if (status.authorized) {
                    this.isOn = true;
                    this.cssGradient = 'backGroundGradientQr';
                    this.cssCtrlContents = false;
                    this.scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        this.placeHolder = text;
                        this.bodyForm.get('to_address').setValue(text);
                        await this.removeCamera()
                    });

                    await this.qrScanner.show();


                } else if (status.denied) {

                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    async removeCamera() {
        this.isOn = false;
        this.cssGradient = 'backGroundGradient';
        this.cssCtrlContents = true;
        let element = document.getElementById('QRScaner');
        element.classList.remove('show-qr-scanner');
        await this.toastCtrl.presentToast({
            text: this.translateService.instant('SEND_CRYPTO_CURRENCY.QrOk'),
            duration: 3000
        });
        await this.qrScanner.destroy();
        this.scanSub.unsubscribe();
        this.touchCtrl.isTouch = true;
    }

    async getPriceCripto() {
        if (this.pockets.balance > 0) {
            const data = await this.http.post('currency/price-cripto', {shortName: "BTC"}, this.auth);
            this.totalApplied.priceCriptoUsd = data.data.USD;
            this.totalApplied.address = this.pockets.address;
            this.bodyForm.get('priority').setValue('high');
            this.bodyForm.get('amount').setValue(this.pockets.balance);
            await this.getFeeTransaction(true);
        } else {
            await this.toastCtrl.presentToast({text: this.translateService.instant('SEND_CRYPTO_CURRENCY.NotFoundToTransaction')})
        }
    }

    async getFeeTransaction(isTransaccion) {
        if (this.pockets.balance > 0) {
            const dataFee = await this.http.post('transaction/feeNetworkBTC', {
                amount: this.bodyForm.value.amount,
                to_address: this.pockets.address,
                priority: this.bodyForm.value.priority,
                currencyId: this.pockets.currencyId
            }, this.auth);
            if (dataFee.status === 200) {
                this.totalApplied.fee = dataFee.data;
                this.bodyForm.get('fee').setValue(this.totalApplied.fee);
                if (isTransaccion)
                    await this.firstTransaction();
            } else {
                await this.toastCtrl.presentToast({text: dataFee.error.msg})
            }
        }
    }

    async firstTransaction() {
        this.totalApplied.amountMaxBtc = (this.pockets.balance - this.totalApplied.fee).toFixed(8);
        this.totalApplied.amountMaxUsd = (this.totalApplied.amountMaxBtc * this.totalApplied.priceCriptoUsd).toFixed(5);
    }

    async calculateBTC(event) {
        if (event.length <= 13 && this.pockets.balance > 0) {
            this.totalApplied.amountMaxBtc = event;
            this.totalApplied.amountMaxUsd = (this.totalApplied.amountMaxBtc * this.totalApplied.priceCriptoUsd).toFixed(5);
            this.totalApplied.fee = 0;
            this.bodyForm.get('fee').setValue(0);
            this.bodyForm.get('amount').setValue(this.totalApplied.amountMaxBtc);
        }
    }

    async calculateUSD(event) {
        if (event.length <= 13 && this.pockets.balance > 0) {
            this.totalApplied.amountMaxBtc = (event / this.totalApplied.priceCriptoUsd).toFixed(8);
            this.totalApplied.amountMaxUsd = event;
            this.totalApplied.fee = 0;
            this.bodyForm.get('fee').setValue(0);
            this.bodyForm.get('amount').setValue(this.totalApplied.amountMaxBtc);
        }
    }

    async sendCoin() {
        this.bodyForm.value.fee = this.totalApplied.fee;
        if (this.bodyForm.value.amount != "" && this.bodyForm.value.fee != "" && this.bodyForm.value.to_address != "") {
            this.ctrlButtonSend = false;
            this.feeAndSend = parseFloat(this.totalApplied.fee) + parseFloat(this.totalApplied.amountMaxBtc);

            if (this.pockets.balance >= this.feeAndSend) {
                await this.presentAlertSend();
            } else {
                this.toastCtrl.presentToast({text: this.translateService.instant('SEND_CRYPTO_CURRENCY.NotFoundToTransaction')})
            }
        } else {
            this.toastCtrl.presentToast({text: this.translateService.instant('SEND_CRYPTO_CURRENCY.FillFields')});
        }
    }

    async presentAlertSend() {
        const modal = await this.modalController.create({
            component: PinModalPage,
            componentProps: { 'sendCrypto': this.sendCrypto}
        });

        modal.onDidDismiss()
            .then(async (data) => {
                const pin = data;
                let security = await this.store.get('user');
                await this.loadingCtrl.present({});
                security = this.aesjs.encryptNoJson(pin.data);
                this.bodyForm.value.currencyId = this.pockets.currencyId;
                this.bodyForm.value.pin = security;
                this.bodyForm.value.from_address = this.pockets.address;
                this.bodyForm.value.fee = this.totalApplied.fee;
                let response = await this.http.post('transaction/sendBTC', this.bodyForm.value, this.auth);
                if (response.status === 200) {
                    await this.loadingCtrl.dismiss();
                    await this.toastCtrl.presentToast({text: this.translateService.instant('SEND_CRYPTO_CURRENCY.TransactionOK')});
                    let dataResponse = await this.getPocketTransaction();
                    let pocketss = await this.getPocketsList();
                    //await this.store1.setDataLocal('pockets', pocketss);
                    //await this.store.set('pockets', this.pockets);

                    if (dataResponse.status === 200) {
                        dataResponse.pocket = this.pockets;
                        //await this.store.set('transaction', dataResponse)
                    } else {
                        await this.toastCtrl.presentToast({text: dataResponse.error.msg})
                    }
                    await this.router.navigate(['app/tabs/dashboard'])
                } else {
                    await this.loadingCtrl.dismiss();
                    await this.toastCtrl.presentToast({text: response.error.msg})
                }
            });
        return await modal.present();
    }

    public async getPocketsList() {
        return await this.http.post('user-wallet/index', { currencyId: '' }, this.auth);
    }

    async getPocketTransaction() {
        let body = {
            userId: this.pockets.userId,
            type: 0,
            address: this.pockets.address,
            currencyShortName: this.pockets.currency.shortName
        };
        return await this.http.post('transaction/index', body, this.auth);
    }
}
