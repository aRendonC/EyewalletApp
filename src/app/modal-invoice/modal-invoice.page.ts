// Dependencies.
import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from '../services/loading/loading.service';
import {ToastService} from "../services/toast/toast.service";
import {DataLocalService} from "../services/data-local/data-local.service";

@Component({
    selector: 'app-modal-invoice',
    templateUrl: './modal-invoice.page.html',
    styleUrls: ['./modal-invoice.page.scss'],
})
export class ModalInvoicePage implements OnInit {
    @Input() dataPocket: any;
    public dataBill: any = {
        card: {
            currency: '',
            priceCripto: 0,
            priceUSD: 0,
        },
        cripto: {
            currency: "",
            price: 0
        }
    };
    public priceCardCoin: number = 0;

    public constructor(
        private modalController: ModalController,
        private router: Router,
        private axiosService: AxiosService,
        private authService: AuthService,
        private loadingServices: LoadingService,
        private toastController: ToastService,
        private storage: DataLocalService,
    ) {
    }

    public async ngOnInit() {
        this.loadingServices.present({cssClass: 'textLoadingBlack'});
        this.dataBill = await this.getDataBill(this.dataPocket);
        this.priceCardCoin = this.dataBill.card.priceCripto.toFixed(8);
    }

    public closeModalInvoice(): void {
        this.modalController.dismiss();
    }

    public async payRequestCard(): Promise<any> {
        let profile: any = await this.storage.getDataLocal('profile');
        if (this.dataPocket.balance >= this.priceCardCoin) {
            const responsePay = await this.requestCard();
            if (responsePay.status === 200) {
                this.closeModalInvoice();
                await this.router.navigate(['/app/tabs/card-invoice']);
                profile.solicitud = true;
                await this.storage.setDataLocal('profile', profile);
            } else if (responsePay.status === 401) {
                await this.toastController.presentToast({text: responsePay.error.msg});
            } else {
                await this.toastController.presentToast({text: 'Error de conexión'});
            }
        } else {
            await this.toastController.presentToast({text: 'Este pocket no tiene saldo suficiente. Pot favor seleccione otro pocket'});
        }
    }

    private async getDataBill(data: any): Promise<any> {
        const path: string = 'card-request/price';
        const dataBody: any = {
            currencyId: data.currencyId,
            address: data.address
        };

        return this.axiosService.post(path, dataBody, this.authService)
            .then(async response => {
                await this.loadingServices.dismiss();
                return response;
            })
            .catch(async error => {
                await this.loadingServices.dismiss();
            });
    }

    private async requestCard(): Promise<any> {
        this.loadingServices.present({cssClass: 'textLoadingBlack'});
        const path: string = 'card-request/request';
        const dataBody: any = {
            address: this.dataPocket.address,
            currencyId: this.dataPocket.currencyId
        };

        return this.axiosService.post(path, dataBody, this.authService)
            .then(async response => {
                await this.loadingServices.dismiss();
                return response;
            })
            .catch(async error => {
                await this.loadingServices.dismiss();
                console.error('Connection error: ', error);
            });
    }
}
