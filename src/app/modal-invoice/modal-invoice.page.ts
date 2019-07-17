// Dependencies.
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//Services.
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-modal-invoice',
  templateUrl: './modal-invoice.page.html',
  styleUrls: ['./modal-invoice.page.scss'],
})
export class ModalInvoicePage implements OnInit {
  @Input() dataPocket: any;
  public dataBill: any = {};

  public constructor(
    private modalController: ModalController,
    private router: Router,
    private axiosService: AxiosService,
    private authService: AuthService
  ) { }

  public async ngOnInit() {
    this.dataBill = await this.getDataBill(this.dataPocket);
    console.log('DATA: ', this.dataBill);
  }

  private async getDataBill(data: any): Promise<any> {
    const path: string = 'card-request/price';
    const dataBody: any = {
      currencyId: data.currencyId,
	    address: data.address
    }

    return this.axiosService.post(path, dataBody, this.authService)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Connection error: ', error);
    });
  }

  public closeModalInvoice(): void {
    this.modalController.dismiss();
  }

  public async payRequestCard(): Promise<any> {
    console.log('Paying...');
    this.modalController.dismiss();
    // await this.router.navigate(['/app/tabs/card-invoice']);
  }
}
