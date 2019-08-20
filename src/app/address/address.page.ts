import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {AxiosService} from '../services/axios/axios.service';
import {LoadingService} from '../services/loading/loading.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {ToastService} from "../services/toast/toast.service";
import {TranslateService} from "@ngx-translate/core";
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

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
    private router: Router,
    private touchCtrl: TouchLoginService,
    private aut: AuthService,
    private store: Storage,
    private aes: AesJsService,
    private axios: AxiosService,
    private loadingCtrl: LoadingService,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private toastCtrl: ToastService,
    private translateService: TranslateService,
    private diagnostic: Diagnostic
  ) {}

  public async ngOnInit(): Promise<any> {
    this.touchCtrl.isTouch = false;
    setTimeout(async () => {
      await this.getDataLocation();
    }, 500);
  }

  private async getDataLocation(): Promise<any> {
    await this.loadingCtrl.present({ text: this.translateService.instant('ADDRESS_PAGE.GetLocation'), cssClass: 'textLoadingBlack' });
    this.diagnostic.isLocationEnabled()
    .then(async (status: boolean) => {
      await this.validateLocationEnabled(status);
    })
    .catch(async (error) => {
      alert('Permission Error: ' + await error);
      this.loadingCtrl.dismiss();
    })
  }

  private async validateLocationEnabled(statusResponse: boolean): Promise<any> {
    if (statusResponse) {
      await this.getCurrentLocation();
    } else {
      this.locationEnabledGPS();
    }
  }

  private async getCurrentLocation(): Promise<any> {
    await this.geolocation.getCurrentPosition()
    .then(async (currentLocation) => {
      this.getDataCurrentLocation(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })
    .catch(async (error) => {
      alert('Location Error: ' + error);
      this.loadingCtrl.dismiss();
    });
  }

  private async getDataCurrentLocation(latitude, longitude): Promise<any> {
    const apiKey: string = '2b154f971e3ab7'
    const url: string = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
    await this.http.get(url)
    .subscribe((response: any) => {
      this.setDataCurrentLocation(response);
      this.loadingCtrl.dismiss();
    });
  }

  private setDataCurrentLocation(dataResponse: any): void {
    this.bodyForm.country = dataResponse.address.country;
    this.bodyForm.state = dataResponse.address.state;
    this.bodyForm.city = dataResponse.address.city;
    this.bodyForm.zipcode = dataResponse.address.postcode;
    this.bodyForm.iso = dataResponse.address.country_code;
  }

  private async locationEnabledGPS(): Promise<any> {
    this.locationAccuracy.canRequest()
    .then((canRequest: any) => {
      this.validateEnabledGPS(canRequest);
    })
    .catch(async (error) => {
      alert('GPS Error: ' + await error);
      this.loadingCtrl.dismiss();
    });
  }

  private validateEnabledGPS(dataResponse: any): void {
    if (dataResponse || dataResponse === 1 || dataResponse === 0) {
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(async () => {
        if (dataResponse || dataResponse === 0) {
          setTimeout(async () => {
            await this.getCurrentLocation();
          }, 7000);
        } else {
          await this.getCurrentLocation();
        }
      })
      .catch(async error => {
        alert('Error requesting location permissions' + await error);
        this.loadingCtrl.dismiss();
      });
    }
  }

  async createProfile() {
    await this.loadingCtrl.present({ text: this.translateService.instant('ADDRESS_PAGE.SavingData'), cssClass: 'textLoadingBlack' });
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
