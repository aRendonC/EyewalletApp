import {Injectable} from '@angular/core';
import {AxiosService} from '../axios/axios.service';
import {MenuController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {PinModalPage} from '../../pin-modal/pin-modal.page';
import {AesJsService} from '../aesjs/aes-js.service';
import {LoadingService} from '../loading/loading.service';
import { Socket } from 'ng-socket-io';

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
        private router: Router,
        private menu: MenuController,
        private store: Storage,
        private modalCtrl: ModalController,
        private aesjs: AesJsService,
        private loadingCtrl: LoadingService,
        private socket: Socket
    ) {
        this.persistenceLogin();
    }

    async login(user, password, plattform, channel) {
        return new Promise((resolve) => {
            this.api.post('auth/login', {email: user, password,plattform,channel})
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
        await this.store.remove('pockets');
        await this.store.remove('profile');
        await this.store.remove('selected-pocket');
        await this.store.remove('user');
        await this.store.remove('userVerification');

        await this.menu.enable(false);
        await this.router.navigate(['']);
        await this.loadingCtrl.dismiss();
        this.socket.on('disconnect',function(){
            console.log("Disconnet:");
        });
    }
}
