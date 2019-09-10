import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sesion-modal',
  templateUrl: './sesion-modal.page.html',
  styleUrls: ['./sesion-modal.page.scss'],
})
export class SesionModalPage implements OnInit {
  @Input() dataModal;
  navegador: '';
  dispositivo: '';
  fecha: '';
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {

  }

  pasearData(data: any): any{
    data.forEach(infoSession => {
      infoSession.agent = JSON.parse(infoSession.agent);
    });
    return data;
  }

}
