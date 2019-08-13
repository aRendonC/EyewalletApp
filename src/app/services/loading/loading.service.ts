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
                if (this.labelContent[0]) {
                    this.labelContent[0].classList.add("blur");
                }
                a.present()
                    .then(() => {
                        if (!this.isLoading) {
                            a.dismiss().then(() => {
                                let cssBlur: any = document.getElementsByClassName('blur');
                                console.log(cssBlur);
                                console.log(this.labelContent);
                                if (cssBlur[0]) {
                                    for (let i = 0; i <= cssBlur.length; i++)
                                        if (cssBlur[i] != undefined)
                                            cssBlur[i].classList.remove("blur");
                                }
                                if (this.labelContent[0]) {
                                    for (let i = 0; i <= this.labelContent.length; i++)

                                        if (this.labelContent[i] != undefined)
                                            this.labelContent[i].classList.remove("blur");
                                }
                            });
                        }
                    });
            });
    }

    async dismiss() {
        this.isLoading = false;
        let cssBlur: any = document.getElementsByClassName('blur');
        console.log(cssBlur.length);
        console.log(this.labelContent);
        if (cssBlur[0]) {
            for (let i = 0; i <= cssBlur.length; i++) {
                console.log(cssBlur[i])
                if (cssBlur[i] != undefined)
                    cssBlur[i].classList.remove("blur");
            }

        }
        if (this.labelContent[0]) {
            for (let i = 0; i <= this.labelContent.length; i++)
                if (this.labelContent[i] != undefined)
                    this.labelContent[i].classList.remove("blur");
        }
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }
}


