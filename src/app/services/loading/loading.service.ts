import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading: boolean = false;
  labelContent: any;
  constructor(
    private loadingCtrl: LoadingController
  ) {
  }

  //Types spinners
  //lines" | "lines-small" | "bubbles" | "circles" | "crescent" | "dots"'.
  //This function is a style Loading Controller
  //To present loading, use this.loading.present() in your page or component
  //Text parameter is optional, cssClass is optional
  async present({text = '<p class="loadingText">Por favor no cierre su sesión</p>', cssClass = 'textLoading', duration = false}) {
    this.isLoading = true;
    const options: any = {
      message: `${text}<img class="spinner" src="../../assets/img/spinner.svg">`,
      translucent: true,
      animated: true,
      backdropDismiss: false,
      keyboardClose: false,
      mode: 'ios',
      showBackdrop: false,
      spinner: 'hide',
      cssClass: `loadingSpinner ${cssClass}`,
    };

    return await this.loadingCtrl.create(options).then(a => {
      this.labelContent = document.getElementsByTagName('app-tabs');
      if(this.labelContent[0]) {
        this.labelContent[0].classList.add("blur");
      }
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => {
            if(this.labelContent[0]) this.labelContent[0].classList.remove("blur");
            console.log('abort presenting')
          });
        }
      });
    });
  }

//To dismiss loading, use this.loading.dismiss() in your page or component
  async dismiss() {
    this.isLoading = false;
    if(this.labelContent[0]) this.labelContent[0].classList.remove("blur");
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}


