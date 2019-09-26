import {Component, OnInit} from '@angular/core';
import * as CONSTANTS from '../constanst';
import {AuthService} from "../services/auth/auth.service";
import {AxiosService} from "../services/axios/axios.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast/toast.service";
import {DataLocalService} from "../services/data-local/data-local.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-verification-modal',
    templateUrl: './verification-modal.page.html',
    styleUrls: ['./verification-modal.page.scss'],
})
export class VerificationModalPage implements OnInit {
    public constants: any = CONSTANTS;
    ctrlContent: boolean = true;
    ctrlInput: boolean = false;
    ctrlVerification: boolean = false;
    public profile: any = '';
    public code: any = '';

    constructor(
        private store: DataLocalService,
        protected auth: AuthService,
        private http: AxiosService,
        private modalCtrl: ModalController,
        private router: Router,
        private toastCtrl: ToastService,
        private translateService: TranslateService,
    ) {
    }

    async ngOnInit() {
        this.profile = await this.store.getDataLocal('profile');
        console.log(this.profile)
    }

    async closeModal(data) {
        await this.modalCtrl.dismiss(data);
    }

    async goToCreateProfile() {
        await this.router.navigate(['/create-profile']);
        await this.modalCtrl.dismiss();
    }

    async startVerification() {
        if (!this.ctrlInput) {
            this.ctrlInput = true;
        } else {

        }
    }

    async sendCodeVerification() {
        const type = 'phone';
        const response = await this.http.post('user/sendCodeVerification', {type}, this.auth,);
        this.ctrlVerification = true
    }

    async verifyCode() {
        if (this.code) {
            let body = {
                type: 'phone',
                code: this.code
            };
            let response = await this.http.post('user/validateCodePhone', body, this.auth);
            if (response.status === 200) {
                let profile = await this.store.getDataLocal('profile');
                profile.level = response.level;
                this.router.navigate(['app/tabs/profile']);
                await this.store.setDataLocal('profile', profile);
                await this.closeModal(profile);
                await this.toastCtrl.presentToast({text: this.translateService.instant('VERIFICATION_MODAL_PAGE.PhoneVerified')})
            } else {
                await this.toastCtrl.presentToast({text: this.translateService.instant('VERIFICATION_MODAL_PAGE.CodeError')})
            }
        }
    }
}
