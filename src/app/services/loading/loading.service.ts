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
  ) { }

  async present({text = 'Por favor no cierre su sesión', cssClass = 'textLoading', classColorText = 'loadingText', duration = false}) {
    this.isLoading = true;
    const options: any = {
      message: `<p class="${classColorText}">${text}</p><img class="spinner" src="../../assets/img/spinner.svg">`,
      translucent: true,
      animated: true,
      backdropDismiss: false,
      keyboardClose: false,
      mode: 'ios',
      showBackdrop: false,
      spinner: 'hide',
      cssClass: `loadingSpinner ${cssClass}`,
    };
    return await this.loadingCtrl.create(options)
    .then(a => {
      this.labelContent = document.getElementsByTagName('app-tabs');
      if(this.labelContent[0]) {
        this.labelContent[0].classList.add("blur");
      }
      a.present()
      .then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {
            let cssBlur = document.getElementsByClassName('blur')
            console.log(cssBlur)
            console.log(this.labelContent)
            if(cssBlur[0]) cssBlur[0].classList.remove("blur");
            if(this.labelContent[0]) this.labelContent[0].classList.remove("blur");
          });
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    let cssBlur = document.getElementsByClassName('blur')
    console.log(cssBlur)
    console.log(this.labelContent)
    if(cssBlur[0]) cssBlur[0].classList.remove("blur");
    if(this.labelContent[0]) this.labelContent[0].classList.remove("blur");
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}


