import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-invoice',
  templateUrl: './modal-invoice.page.html',
  styleUrls: ['./modal-invoice.page.scss'],
})
export class ModalInvoicePage implements OnInit {

  public constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  public ngOnInit() {

  }

  public closeModalInvoice(): void {
    this.modalController.dismiss();
  }

  public async payRequestCard(): Promise<any> {
    this.modalController.dismiss();
    await this.router.navigate(['/app/tabs/card-invoice']);
  }
}
