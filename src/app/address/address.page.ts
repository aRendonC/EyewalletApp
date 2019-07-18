import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {AxiosService} from '../services/axios/axios.service';
import {LoadingService} from '../services/loading/loading.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
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
    zip: null,
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
    private geolocation: Geolocation
  ) { }

async ngOnInit() {
  // await this.getCountries();
  this.menu.enable(false);
  this.getLocation();
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
        this.country = data.address.country;
        this.state = data.address.state;
        this.city = data.address.city;
        this.zipCode = data.address.postcode;
        this.loadingCtrl.dismiss();
      },
      (error) => {
        console.log(error);
      }
    );
   }).catch((error) => {
     console.log(error);
   });
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
  this.user = await this.store.get('profile');
  this.user = this.aes.decrypt(this.user);
  this.bodyForm.userId = this.user.id;
  const response = await this.axios.put(`profile/${this.user.id}/update`, this.bodyForm, this.aut);
  if (response.status === 200) {
    let profile: any = await this.axios.get(`profile/${this.user.id}/view`, this.aut, null);
    profile = this.aes.encrypt(profile.data);
    await this.store.set('profile', profile);
    await this.router.navigate(['app/tabs']);
    // await this.store.set('user', JSON.stringify(response.data));
  } else {
    await this.loadingCtrl.dismiss();
  }
}

}
