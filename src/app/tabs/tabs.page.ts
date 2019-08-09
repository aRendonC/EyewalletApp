import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from "../services/loading/loading.service";
import {Router} from "@angular/router";
import {AxiosService} from '../services/axios/axios.service';
import {ToastService} from "../services/toast/toast.service";
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {DataLocalService} from "../services/data-local/data-local.service";

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})

export class TabsPage {
    public currentRoute: any = 'dashboard';
    ctrlCssBlur: boolean = false;
    public tabs = {
        'prices': 'prices',
        'vault': 'vault-list',
        'dashboard': 'dashboard',
        'card-invoice': 'card-invoice',
        'profile': 'profile',
        'request-credit-card': 'request-credit-card',
        'exchange': 'exchange',
        'history-exchange': 'history-exchange'
    };

    constructor(
        private auth: AuthService,
        private loadControl: LoadingService,
        private router: Router,
        private store: DataLocalService,
        private toastCtrl: ToastService,
        private axiosService: AxiosService,
        private authService: AuthService,
        private fingerCtrl: TouchLoginService,
    ) {
        this.getActiveRoute()
    }

    async goToProfile() {
        let profile = await this.store.getDataLocal('profile');
        if (profile.user.firstName) {
            await this.router.navigate(['/app/tabs/profile'])
        } else {
            await this.toastCtrl.presentToast({text: 'Por favor, registre su perfil'});
            await this.router.navigate(['/create-profile'])
        }
    }


    getActiveRoute() {
        this.fingerCtrl.isTouch = true;
        this.currentRoute = this.router.url.split('/')[3];
    }

    public async requestCreditCard(): Promise<any> {
        const profile = await this.getDataProfile();
        await this.validateNavigationRequestCard(profile);
    }

    verifiLoading(data: boolean) {
        this.ctrlCssBlur = data
    }

    public async navigateVault(): Promise<any> {
        this.axiosService.get('vault/index', this.authService)
            .then(async (response: any) => {
                if (response.vault.length > 0) {
                    this.router.navigate(['/app/tabs/vault-list']);
                } else {
                    this.router.navigate(['/app/tabs/vault']);
                }
            })
            .catch(async error => {
                console.error(error);
            });
    }

    async goToExchange(): Promise<any> {
        let pockets = [];
        let listPockets = await this.store.getDataLocal('pockets');
        listPockets.forEach(pocketOfList => {
            if (!pockets[0]) {
                pockets.push(pocketOfList)
            } else {
                let responsePocket = pockets.find(pocket => pocketOfList === pocket);
                console.log(responsePocket);
                if (responsePocket === undefined) pockets.push(pocketOfList)
            }
        });
        console.log(pockets);
        console.log(listPockets);
        if (pockets.length <= 1) {
            await this.toastCtrl.presentToast({text: 'Por favor, cree un pocket de diferente criptomoneda'})
        } else {
            await this.router.navigate(['/app/tabs/exchange'])
        }
    }

    private async getDataProfile(): Promise<any> {
        return await this.store.getDataLocal('profile');
    }

    private async validateNavigationRequestCard(profile: any): Promise<any> {
        if (profile.level === 1) {
            if (profile.completed === 0) {
                await this.toastCtrl.presentToast({text: 'Para solicitar una tarjeta, debe validar sus documentos'});
                await this.router.navigate(['upload-verification-files']);
            } else {
                await this.toastCtrl.presentToast({text: 'Estamos verificando tus documentos'});
            }
        } else if (profile.level === 3 && profile.solicitud === false) {
            await this.router.navigate(['/app/tabs/request-credit-card'])
        } else if (profile.level === 3 && profile.solicitud === true) {
            await this.router.navigate(['/app/tabs/card-invoice']);
        } else {
            await this.toastCtrl.presentToast({text: 'Por favor, verifique su correo y teléfono'});
        }
    }
}
