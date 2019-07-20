import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {AxiosService} from '../services/axios/axios.service';
import {LoadingService} from '../services/loading/loading.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {ToastService} from "../services/toast/toast.service";


@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  public classButton = 'button-disable';
  public ctrlCssBlur = false;
  public arrayCountries: any = [];
  public arrayStates: any = [];
  public selectedCountry = '';
  public selectedState = '';
  public zipCode = '';
  public countries: any[];
  public statesList = Array();
  public states = Array();
  public cities = Array();
  public citiesList: any = null;
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
  ) { }

async ngOnInit() {
  // await this.getCountries();
  this.checkGPSPermission();
  this.menu.enable(false);
}
ionViewDidLeave() {
  this.menu.enable(true);
}

// async getCountries() {
//   await this.loadingCtrl.present({});
//   this.headers = new HttpHeaders({
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*' ,
//     'Access-Control-Allow-Headers': '*' ,
//     'Access-Control-Allow-Methods': '*'
//   });
//   const url = 'https://geodata.solutions/restapi?dd=1';
//   this.http.get(url)
//       .toPromise()
//       .then(async data => {
//         console.log('paises traidos', data);
//         // Toda la data (con codigo de pais y nombre de pais) que es obtenida de la url es pasada a la variable global paises
//         // this.countries = data;
//         // this.arrayCountries = data;
//         await this.loadingCtrl.dismiss()
//       }).catch(async e => {
//     await this.loadingCtrl.dismiss();
//     console.log('error al traer los países', e)
//   });
//
// }

async getLocation() {

  // this.headers = new HttpHeaders({
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*' ,
  //   'Access-Control-Allow-Headers': '*' ,
  //   'Access-Control-Allow-Methods': '*'
  // }),
  this.geolocation.getCurrentPosition().then(async (resp) => {
    await this.http
    .get(`https://us1.locationiq.com/v1/reverse.php?key=pk.cce23ccc0da9140d669b1913c63e90cb&lat=${resp.coords.latitude}&lon=${resp.coords.longitude}&format=json`)
    .subscribe(
      (data: any) => {
        this.bodyForm.country = data.address.country
        this.bodyForm.state = data.address.state
        this.bodyForm.city = data.address.city
        this.bodyForm.zipcode = data.address.postcode
        // this.country = data.address.country;
        // this.state = data.address.state;
        // this.city = data.address.city;
        // this.zipCode = data.address.postcode;
        this.loadingCtrl.dismiss();
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

checkGPSPermission() {
    this.touchCtrl.isTouch = false;
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    async result => {
      await this.loadingCtrl.dismiss();
      if (result.hasPermission) {
        // If having permission show 'Turn On GPS' dialogue
        this.askToTurnOnGPS();
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
          () => {
            this.touchCtrl.isTouch = true;
            // call method to turn on GPS
            this.askToTurnOnGPS();
          },
          error => {
            // this.loadingCtrl.dismiss();
            // this.ctrlCssBlur = false;
            // Show alert if user click on 'No Thanks'
            // alert('requestPermission Error requesting location permissions ' + error);
          }
        );
    }
  }).catch(er => {
    console.log(er)
  });
}


async askToTurnOnGPS() {
  await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    () => {
      // When GPS Turned ON call method to get Accurate location coordinates
      this.getLocation();
      console.log('Obtiene mi localizacion ');
    },
    error => {
      console.log('Error requesting location permissions ' + JSON.stringify(error));
    }
    //  alert('Error requesting location permissions ' + JSON.stringify(error))
  );
}

//  statesFn(selectedCountry) {
//     this.cities = []
//     this.states = [];
//     this.statesList = [
//       {0: "Amazonas", 1: "Amazonas", 2: 'Colombia'},
//       {0: "Cesar", 1: "Cesar", 2: 'Colombia'},
//       {0: "Choco", 1: "Choco", 2: 'Colombia'},
//       {0: "Alaska", 1: "Alaska", 2: 'United States'},
//       {0: "Alabama", 1: "Alabama", 2: 'United States'},
//       {0: "Arkansas", 1: "Arkansas", 2: 'United States'},
//       {0: "Mexico", 1: "Mexico", 2: 'Mexico'},
//       {0: "Baja California", 1: "Baja California", 2: 'Mexico'},
//       {0: "Mexico City", 1: "Mexico City", 2: 'Mexico'}
//     ];
//     this.statesList.forEach(element => {
//       if (element[2] === selectedCountry) {
//         this.states.push(element)
//     }});
// }

// getState(country: any) {
//   this.selectedCountry = country.detail.value;
//   this.statesFn(this.selectedCountry);
//   // this.headers = new HttpHeaders({
//   // Accept: 'application/json',
//   // 'Content-Type': 'application/json',
//   // 'Access-Control-Allow-Origin': '*' ,
//   // 'Access-Control-Allow-Headers': '*' ,
//   // 'Access-Control-Allow-Methods': '*'
//   // });
//   const url = `https://geodata.solutions/restapi?dd=1&country=${this.countryCode}`;
//   this.http.get(url).toPromise().then(data => {
//     console.log('estos son los estados', data);
//   // this.states = data;
//   this.arrayStates = data;
// });
// }

//  citiesFn(selectedState) {
//  this.cities = [];
// this.citiesList = [
//     {0: "37354", 1: "Tarapaca", 2: "Amazonas"},
//     {0: "37552", 1: "Puerto Narino", 2: "Amazonas"},
//     {0: "37722", 1: "Leticia", 2: "Amazonas"},
//     {0: "37296", 1: "Valledupar", 2: "Cesar"},
//     {0: "37360", 1: "Tamalameque", 2: "Cesar"},
//     {0: "37474", 1: "San Diego", 2: "Cesar"},
//     {0: "37307", 1: "Ungia", 2: "Choco"},
//     {0: "37362", 1: "Tado", 2: "Choco"},
//     {0: "37461", 1: "San Jose del Palmar", 2: "Choco"},
//     {0: "11347", 1: "Metlakatla", 2: "Alaska"},
//     {0: "22", 1: "Bayou La Batre", 2: "Alabama"},
//     {0: "258", 1: "Alexander", 2: "Arkansas"},
//     {0: "95891", 1: "Zumpango", 2: "Mexico"},
//     {0: "98000", 1: "Camalu", 2: "Baja California"},
//     {0: "95947", 1: "Xochimilco", 2: "Mexico City"}
//   ];
//   this.citiesList.forEach(element => {
//     if (element[2] === selectedState) {
//       this.cities.push(element)
//   }});
// }

// getCity(state: any) {
//   this.citiesFn(state.detail.value);
//   // this.headers = new HttpHeaders({
//   //   Accept: 'application/json',
//   //   'Content-Type': 'application/json',
//   //   'Access-Control-Allow-Origin': '*' ,
//   //   'Access-Control-Allow-Headers': '*' ,
//   //   'Access-Control-Allow-Methods': '*'
//   //   });
//   // const url = `https://geodata.solutions/restapi?dd=1&country=${this.countryCode}&state=${this.stateCode}`;
//   // this.http.get(url).toPromise().then(data => {
//   //   console.log('estas son las ciudades', data)
//   // // this.cities = data;
//   // });
// }

async createProfile() {
  this.loadingCtrl.present({
    cssClass: 'textLoadingBlack'});
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
