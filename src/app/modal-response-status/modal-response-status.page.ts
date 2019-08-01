// Dependencies.
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-response-status',
  templateUrl: './modal-response-status.page.html',
  styleUrls: ['./modal-response-status.page.scss'],
})

// En la variable/propiedad "typeIcon" de tipo numero, se le envia un numero entre 1 y 2, 1 muestra icono de "ok", 2 muestra icono de "error".
// En la variable/propiedad "message" de tipo cadena, se le envia el mensaje a mostrar.
export class ModalResponseStatusPage implements OnInit {
  @Input() typeIcon: number;
  @Input() message: string;
  @Input() path: string;
  public iconStatus: string;

  public constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  public ngOnInit() {
    this.iconStatus = `../../assets/images/icon-status-${this.typeIcon === 1 ? 'ok' : 'error'}.svg`;

    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  private async closeModal(): Promise<any> {
    this.modalController.dismiss();
    await this.router.navigate([this.path]);
  }
}
