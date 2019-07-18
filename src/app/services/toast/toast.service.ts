import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private position: any = 'middle';
 private cssClass: any = false;
  constructor(
      private toastCtrl: ToastController
  ) { }

  async presentToast(
      {
        text = 'Error interno',
        duration = 2000,
        closeButtonText = 'Cerrar',
        position = this.position,
        showCloseButton = false,
        cssClass = this.cssClass}
      )
  {
    if(cssClass) {
      cssClass = 'clase- success'
    } else {
      cssClass = 'Clase- error'
    }
    const toast = await this.toastCtrl.create({
      message: `<p class="${{cssClass}}" style="color: white; background: black; height: 100px">` + text + `</p>`,
      duration: duration,
      keyboardClose: true,
      closeButtonText: closeButtonText,
      position: position,
      showCloseButton: showCloseButton,
      // cssClass: cssClass,
    });
    await toast.present();
  }
}

