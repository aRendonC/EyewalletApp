// Dependencies.
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Modal.
import { ModalResponseStatusPage } from '../modal-response-status/modal-response-status.page';

@Component({
  selector: 'app-vault-created',
  templateUrl: './vault-created.page.html',
  styleUrls: ['./vault-created.page.scss'],
})
export class VaultCreatedPage implements OnInit {
  public buttonDisabled: boolean = false;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {

  }

  public acceptCreationVault(): void {
    this.showModalResponseStatus();
  }

  private async showModalResponseStatus(): Promise<any> {
    const modalResponseStatus = await this.modalController.create({
      component: ModalResponseStatusPage,
      componentProps: {
        typeIcon: 1,
        message: 'Tu nueva bóveda fue añadida con éxito.',
        path: ''
      }
    });

    return await modalResponseStatus.present();
  }
}
