import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading: boolean = false;
  constructor(
      private loadingCtrl: LoadingController
  ) { }
  //Types spinners
  //lines" | "lines-small" | "bubbles" | "circles" | "crescent" | "dots"'.
  //This function is a style Loading Controller
  //To present loading, use this.loading.present() in your page or component
  //Text parameter is optional, cssClass is optional
  async present({text = 'Por favor no cierre su sesión', cssClass = 'textLoading'}) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: text,
      translucent: true,
      animated: true,
      backdropDismiss: false,
      keyboardClose: false,
      mode: 'ios',
      showBackdrop: false,
      spinner: 'crescent',
      cssClass: `loadingSpinner ${cssClass}`,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

//To dismiss loading, use this.loading.dismiss() in your page or component
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}


