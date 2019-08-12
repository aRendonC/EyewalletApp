import {Injectable} from '@angular/core';
import {AxiosService} from '../axios/axios.service';
import {MenuController, ModalController} from '@ionic/angular';
import {TimerService} from '../timer/timer.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {DeviceService} from '../device/device.service';
import {PinModalPage} from '../../pin-modal/pin-modal.page';
import {AesJsService} from '../aesjs/aes-js.service';
import {LoadingService} from '../loading/loading.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    usuario: any = {
        id: null,
        rolId: null,
        segundoFactor: null,
        accessToken: null,
    };

    constructor(
        private  api: AxiosService,
        private timer: TimerService,
        private router: Router,
        private menu: MenuController,
        private store: Storage,
        private device: DeviceService,
        private modalCtrl: ModalController,
        private aesjs: AesJsService,
        private loadingCtrl: LoadingService
    ) {
    }

    async login(user, password) {
        const device: any = await this.device.getDataDevice();
        console.log('UUID: ', device.uuid);
        if (!device.uuid) {
            // device.uuid = '9A8C1EF2-8354-4EFB-ACD7-DB8A543CFD1D';
            // device.uuid = 'd03ed04e9ecb6d8b';
            device.uuid = '7219d0c4ee046311';
            // device.uuid = 'asd6544asd';
            // device.uuid = '37cd19cb5739fb4';
            //  device.uuid = '928e019bd3cdb0fa';
        }
        
        return new Promise((resolve) => {
            this.api.post('auth/login', {email: user, password, deviceId: device.uuid})
                .then(async (data: any) => {
                    if (data.status === 200) {
                        this.usuario = data.data;
                        await this.store.set('user', this.usuario);
                        await this.setUserProfile(data.data.profile);

                        resolve(data);
                    } else if (data.status === 404) {

                        resolve(data.error.msg)
                    } else if (data.status === 401) {
                        resolve(data.error.msg)

                    } else if (data.status === 500) {
                        resolve(data.error.msg)
                    } else {
                        resolve(null);
                    }
                })
                .catch(err => console.log('error data response', err));
        }).catch((error) => {
            console.log(error);
        });
    }

    async setUserProfile(profile) {
        profile = this.aesjs.encrypt(profile);
        await this.store.set('profile', profile);
    }

    async accessParam() {
        this.usuario = await this.store.get('user');
        if (this.usuario != null) {
            return this.usuario.accessToken;
        }
        return null;
    }

    async persistenceLogin() {
        this.usuario = await this.store.get('user');
        if (this.usuario.pin) {
            await this.openModal();
        }
    }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: PinModalPage,
            componentProps: {
                paramID: 123,
                paramTitle: 'Test title'
            }
        });

        return await modal.present();
    }

    setUserId(userId) {
        this.usuario.id = userId;
        localStorage.setItem('user', JSON.stringify(this.usuario));
    }

    async isLogin() {
        const user = await this.store.get('user');
        return !!user;
    }

    async logout() {
        await this.store.clear();
        await this.menu.enable(false);
        await this.router.navigate(['']);
        await this.loadingCtrl.dismiss();
    }

}
