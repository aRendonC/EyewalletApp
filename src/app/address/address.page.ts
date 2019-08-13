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
import {TranslateService} from "@ngx-translate/core";


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
    iso: null
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
    private toastCtrl: ToastService,
    private translateService: TranslateService,
  ) {
  }

  async ngOnInit() {
    this.touchCtrl.isTouch = false;
    await this.checkGPSPermission();
  }

  async getLocation() {
    this.geolocation.getCurrentPosition().then(async (resp) => {

      console.log('DataGeo: ', resp.coords.latitude);
      await this.http
        .get(`https://us1.locationiq.com/v1/reverse.php?key=pk.cce23ccc0da9140d669b1913c63e90cb&lat=${resp.coords.latitude}&lon=${resp.coords.longitude}&format=json`)
        .subscribe(
          async (data: any) => {
            this.bodyForm.country = data.address.country;
            this.bodyForm.state = data.address.state;
            this.bodyForm.city = data.address.city;
            this.bodyForm.zipcode = data.address.postcode;
            this.bodyForm.iso = data.address.country_code;
            await this.loadingCtrl.dismiss();
            this.ctrlCssBlur = false;
          },
          async () => {
            await this.loadingCtrl.dismiss();
            this.ctrlCssBlur = false;
          }
        );
    }).catch(async () => {
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
    });
  }

  async checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      async result => {
        if (result.hasPermission) {
          await this.askToTurnOnGPS();
        } else {
          this.requestGPSPermission();
          this.ctrlCssBlur = false;
          await this.loadingCtrl.dismiss();
        }
      },
      async err => {
        alert(err);
        this.ctrlCssBlur = false;
        await this.loadingCtrl.dismiss();
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {

      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            async () => {
              await this.askToTurnOnGPS();
            },
            error => {
              this.ctrlCssBlur = false;
            }
          );
      }
    }).catch(async er => {
      this.ctrlCssBlur = false;
      await this.loadingCtrl.dismiss();
    });
  }


  async askToTurnOnGPS() {
    await this.loadingCtrl.present({text: this.translateService.instant('ADDRESS_PAGE.GetGeoData'), cssClass: 'textLoadingBlack'});
    this.ctrlCssBlur = true;
    await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      async () => {
        await this.getLocation();
      },
      error => {
        this.ctrlCssBlur = false;
        this.loadingCtrl.dismiss();
      }
    );
  }

  async createProfile() {
    await this.loadingCtrl.present({
      text: this.translateService.instant('ADDRESS_PAGE.SavingData'),
      cssClass: 'textLoadingBlack'
    });
    this.ctrlCssBlur = true;
    this.user = await this.store.get('profile');
    this.user = this.aes.decrypt(this.user);
    this.bodyForm.userId = this.user.id;
    const response = await this.axios.put(`profile/${this.user.id}/update`, this.bodyForm, this.aut);
    if (response.status === 200) {
      let profile: any = await this.axios.get(`profile/${this.user.id}/view`, this.aut, null);
      profile = this.aes.encrypt(profile.data);
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
      await this.store.set('profile', profile);
      this.touchCtrl.isTouch = true;
      await this.toastCtrl.presentToast({text: this.translateService.instant('ADDRESS_PAGE.DateUpdateOk')});
      await this.router.navigate(['app/tabs']);
    } else {
      await this.toastCtrl.presentToast({text: response.error.msg});
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
    }
  }
}
