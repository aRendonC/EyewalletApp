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
  profileShow: any;
  profile: any;
  temporizador: any;
  pockets: any = [];
  country: any = '';
  fullName: any = '';

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

  async getProfile() {
    this.profile = await this.store.get('profile');
    this.profile = this.aesjs.decrypt(this.profile);
    this.profile = this.profile.data;
  }

  async countryLowercase() {
    await this.getProfile();
    const countryUpper = this.profile.country[0];
    const countryLower = this.profile.country.slice(1).toLowerCase();
    this.country = countryUpper + countryLower;
  }
  async ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    await this.getProfile();
    await this.countryLowercase();
    this.fullName = `${this.profile.user.firstName}${' '}${this.profile.user.lastName}`;
    console.log(this.fullName);
    this.profileShow = {
      id: this.profile.id,
      phone: this.profile.phone,
      date: this.profile.createdAt.slice(0, 10),
      country: this.country,
      mail : this.profile.user.email,
      fullName : this.fullName,
    };
    console.log(this.profileShow);
  }
}
