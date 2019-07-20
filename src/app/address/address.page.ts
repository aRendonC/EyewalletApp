import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {AxiosService} from '../services/axios/axios.service';
import {LoadingService} from '../services/loading/loading.service';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {ToastService} from "../services/toast/toast.service";


@Component({
    selector: 'app-address',
    templateUrl: './address.page.html',
    styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
    public ctrlCssBlur = false;
    public states = Array();
    public zip: any;
    public userId: any;
    public user: any = '';
    public country: any = '';
    public state: any = '';
    public city: any = '';
    public bodyForm = {
        userId: null,
        address1: null,
        address2: null,
        country: null,
        state: null,
        city: null,
        zipcode: null,
    };


    constructor(
        private http: HttpClient,
        private menu: MenuController,
        private router: Router,
        private touchCtrl: TouchLoginService,
        private aut: AuthService,
        private store: Storage,
        private aes: AesJsService,
        private axios: AxiosService,
        private loadingCtrl: LoadingService,
        private geolocation: Geolocation,
        private androidPermissions: AndroidPermissions,
        private locationAccuracy: LocationAccuracy,
        private toastCtrl: ToastService
    ) {
    }

    async ngOnInit() {
        await this.checkGPSPermission();
    }

    async getLocation() {
        this.geolocation.getCurrentPosition().then(async (resp) => {
            await this.http
                .get(`https://us1.locationiq.com/v1/reverse.php?key=pk.cce23ccc0da9140d669b1913c63e90cb&lat=${resp.coords.latitude}&lon=${resp.coords.longitude}&format=json`)
                .subscribe(
                    async (data: any) => {
                        this.bodyForm.country = data.address.country
                        this.bodyForm.state = data.address.state
                        this.bodyForm.city = data.address.city
                        this.bodyForm.zipcode = data.address.postcode
                        await this.loadingCtrl.dismiss();
                        this.ctrlCssBlur = false;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }).catch((error) => {
            console.log(error);
        });
    }

    async checkGPSPermission() {
        await this.loadingCtrl.present({text: 'Obteniendo datos de localización...', cssClass: 'textLoadingBlack'});
        this.ctrlCssBlur = true;
        this.touchCtrl.isTouch = false;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
            async result => {
                await this.loadingCtrl.dismiss();
                this.ctrlCssBlur = false;
                if (result.hasPermission) {
                    // If having permission show 'Turn On GPS' dialogue
                    await this.askToTurnOnGPS();
                    console.log('Me pide que encienda el GPS');
                } else {
                    // If not having permission ask for permission
                    this.requestGPSPermission();
                    console.log('Si no tengo permiso pidame el permiso y entra a la funcion de requestGPSPermission');
                    this.ctrlCssBlur = false;
                }
            },
            async err => {
                await this.loadingCtrl.dismiss();
                this.ctrlCssBlur = false;
                alert(err);
            }
        );
    }

    requestGPSPermission() {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            if (canRequest) {
                console.log('4');
            } else {
                // Show 'GPS Permission Request' dialogue
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
                    .then(
                        async () => {
                            this.touchCtrl.isTouch = true;
                            // call method to turn on GPS
                            await this.askToTurnOnGPS();
                        },
                        error => {
                            console.log(error)
                        }
                    );
            }
        }).catch(er => {
            console.log(er)
        });
    }


    async askToTurnOnGPS() {
        await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            async () => {
                // When GPS Turned ON call method to get Accurate location coordinates
                await this.getLocation();
                console.log('Obtiene mi localizacion ');
            },
            error => {
                console.log('Error requesting location permissions ' + JSON.stringify(error));
            }
            //  alert('Error requesting location permissions ' + JSON.stringify(error))
        );
    }

    async createProfile() {
        await this.loadingCtrl.present({
            text: 'Almacenando datos',
            cssClass: 'textLoadingBlack'
        });
        this.ctrlCssBlur = true;
        this.user = await this.store.get('profile');
        this.user = this.aes.decrypt(this.user);
        this.bodyForm.userId = this.user.id;
        const response = await this.axios.put(`profile/${this.user.id}/update`, this.bodyForm, this.aut);
        console.log(response)
        if (response.status === 200) {
            let profile: any = await this.axios.get(`profile/${this.user.id}/view`, this.aut, null);
            profile = this.aes.encrypt(profile.data);
            await this.loadingCtrl.dismiss();
            this.ctrlCssBlur = false;
            await this.store.set('profile', profile);
            this.touchCtrl.isTouch = true;
            await this.toastCtrl.presentToast({text: 'Sus datos han sido actualizados'})
            await this.router.navigate(['app/tabs']);
            // await this.store.set('user', JSON.stringify(response.data));
        } else {
            await this.toastCtrl.presentToast({text: response.error.msg})
            await this.loadingCtrl.dismiss();
            this.ctrlCssBlur = false;
        }
    }
}
