// Dependencies.
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

//Services.
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { LoadingService } from '../services/loading/loading.service';

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
    private toastController: ToastController
  ) { }

  public async ngOnInit() {
    this.loadingServices.present({cssClass: 'textLoadingBlack'});
    this.dataBill = await this.getDataBill(this.dataPocket);
    this.priceCardCoin = this.dataBill.card.priceCripto.toFixed(8);
  }

  private async getDataBill(data: any): Promise<any> {
    const path: string = 'card-request/price';
    const dataBody: any = {
      currencyId: data.currencyId,
	    address: data.address
    }

    return this.axiosService.post(path, dataBody, this.authService)
    .then( async response => {
      await this.loadingServices.dismiss()
      return response;
    })
    .catch(async error => {
      await this.loadingServices.dismiss()
      console.error('Connection error: ', error);
    });
  }

  public closeModalInvoice(): void {
    this.modalController.dismiss();
  }

  public async payRequestCard(): Promise<any> {
    const responsePay = await this.requestCard();
    if (responsePay.status === 200) {
      this.closeModalInvoice();
      await this.router.navigate(['/app/tabs/card-invoice']);
    } else if (responsePay.status === 401) {
      this.presentToast(responsePay.error.msg);
    } else {
      this.presentToast('Error de conexión');
    }
  }

  private async requestCard(): Promise<any> {
    this.loadingServices.present({cssClass: 'textLoadingBlack'});
    const path: string = 'card-request/request';
    const dataBody: any = {
      address: this.dataPocket.address,
	    currencyId: this.dataPocket.currencyId
    }

    return this.axiosService.post(path, dataBody, this.authService)
    .then( async response => {
      await this.loadingServices.dismiss();
      return response;
    })
    .catch(async error => {
      await this.loadingServices.dismiss();
      console.error('Connection error: ', error);
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });

    toast.present();
  }
}
