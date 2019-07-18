// Dependencies.
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Storage} from "@ionic/storage";

//Services.
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { LoadingService } from '../services/loading/loading.service';
import {AesJsService} from "../services/aesjs/aes-js.service";

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
    private toastController: ToastController,
    private storage: Storage,
    private aesjs: AesJsService
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
    console.log(this.dataPocket)
    let profile: any = await this.storage.get('profile')
    console.log(profile)
    profile = this.aesjs.decrypt(profile)
    if(this.dataPocket.balance >= this.priceCardCoin){
      const responsePay = await this.requestCard();
      console.log('respuesta de solicitud de card', responsePay)
      if (responsePay.status === 200) {
        this.closeModalInvoice();
        await this.router.navigate(['/app/tabs/card-invoice']);
        profile.solicitud = true;
        profile = this.aesjs.encrypt(profile)
        await this.storage.set('profile', profile)
        console.log()
      } else if (responsePay.status === 401) {
        await this.presentToast(responsePay.error.msg);
      } else {
        await this.presentToast('Error de conexión');
      }
    }else{
      await this.presentToast('Este pocket no tiene saldo suficiente. Pot favor seleccione otro pocket');
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
