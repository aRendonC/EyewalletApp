import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AxiosService} from '../services/axios/axios.service';
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";
import {DataLocalService} from "../services/data-local/data-local.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
    public ctrlCssBlur: boolean = false;
    public username: string = null;
    public password: string = null;
    public pockets: any = [];
    public path: string = '';

    constructor(
        private toastController: ToastService,
        private auth: AuthService,
        private menu: MenuController,
        private router: Router,
        private http: AxiosService,
        public modalCtrl: ModalController,
        private touchCtrl: TouchLoginService,
        private store: DataLocalService,
        private loadingCtrl: LoadingService,
        private translateService: TranslateService,
    ) {
    }

    ngOnInit() {
    }

    ionViewDidLeave() {
        this.menu.enable(true);
    }

    async login() {
        if (this.password && this.username) {
            await this.store.clearStore();
            await this.loadingCtrl.present({text: this.translateService.instant('VAULT.loading')});
            this.ctrlCssBlur = true;
            this.auth.login(this.username, this.password)
                .then(async (data: any) => {
                    if (data) {
                        if (data.status == 200) {
                            this.pockets = await this.getPocketsList();
                            this.touchCtrl.isLocked = true;
                            this.ctrlCssBlur = false;
                            await this.loadingCtrl.dismiss();
                            let pocket = this.pockets[0];
                            this.store.setDataLocal('selected-pocket', pocket);
                            await this.router.navigate([
                                '/app/tabs/dashboard']);
                            await this.store.setDataLocal('pockets', this.pockets);
                        } else await this.clearData(data);
                    } else await this.clearData(data)
                })
                .catch(async (error) => {
                    this.ctrlCssBlur = false;
                    console.error('ERROR: ', error);
                    await this.loadingCtrl.dismiss();
                });
        } else {
            if (!this.password && !this.username) {
                await this.toastController.presentToast({
                    text: this.translateService.instant('LOGIN_PAGE.AllFieldsIsRequired'),
                    duration: 1000
                });
            } else if (!this.username) {
                await this.toastController.presentToast({
                    text: this.translateService.instant('LOGIN_PAGE.FieldEmail'),
                    duration: 1000
                });
            } else if (!this.password) {
                await this.toastController.presentToast({
                    text: this.translateService.instant('LOGIN_PAGE.FiledPassword'),
                    duration: 1000
                });
            }
        }
    }

    public async getPocketsList() {
        return await this.http.post('user-wallet/index', {currencyId: ''}, this.auth);
    }

    public async restore() {
        await this.router.navigate(['restore']);
    }

    public async clearData(error) {
        await this.loadingCtrl.dismiss();
        this.ctrlCssBlur = false;
        await this.toastController.presentToast({text: error, duration: 1000});
    }
}
