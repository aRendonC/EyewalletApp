import {Component, OnInit} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {TimerService} from '../services/timer/timer.service';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileShow = {
    fullName: '',
    id: '',
    phone: '',
    date: '',
    country: '',
    mail: ''
  };
  profile: any;
  temporizador: any;
  pockets: any = [];
  country: any = '';
  public ctrlNavigation = 2;

  constructor(
    private store: Storage,
    private axios: AxiosService,
    private auth: AuthService,
    private timer: TimerService,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute,
    private aesjs: AesJsService,
  ) {
    this.temporizador = this.timer.temporizador;
  }
  async ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    await this.getProfile();
  }
  async getProfile() {
    this.profile = await this.store.get('profile');
    this.profile = this.aesjs.decrypt(this.profile);
    this.profileShow.id = this.profile.user.id
    this.profileShow.phone = this.profile.phone
    this.profileShow.date = this.profile.createdAt.slice(0, 10)
    if(this.profile.user.email) this.profileShow.mail = this.profile.user.email
    if(this.profile.user.firstName) this.profileShow.fullName = this.profile.user.firstName + this.profile.user.lastName
    if(this.profile.country) {
      this.profileShow.country = this.countryLowercase()
    }
  }

  countryLowercase() {
    const countryUpper = this.profile.country[0];
    const countryLower = this.profile.country.slice(1).toLowerCase();
   return countryUpper + countryLower;
  }
}
