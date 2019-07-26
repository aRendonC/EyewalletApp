import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AxiosService } from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import { AesJsService } from '../services/aesjs/aes-js.service';
import {LoadingService} from '../services/loading/loading.service';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  public ctrlCssBlur = false;
  public firstname: '';
  public lastname: '';
  public birthdate: any = null;
  private user: any = null;
  public bodyForm: any = {};
  public identification: 0;
  public urlProfileUpdate = '/profile/1/update';
  constructor(
    private router: Router,
    private menu: MenuController,
    private touchCtrl: TouchLoginService,
    private aut: AuthService,
    private axios: AxiosService,
    private store: Storage,
    private aes: AesJsService,
    private loadingCtrl: LoadingService
  ) { }


  ngOnInit() {
    this.menu.enable(false);
    this.touchCtrl.isLocked = false;
  }

  async address() {
    if(this.birthdate) {
      this.user = await this.store.get('profile');
      this.user = this.aes.decrypt(this.user);
      this.bodyForm = {
        userId: this.user.userId,
        firstName: this.firstname,
        lastName: this.lastname,
        zipcode: '',
        identification: this.identification,
        birthDay: this.birthdate.slice(0, 10),
        state: '',
        country: '',
        city: ''
      };

      const response = await this.axios.put(`profile/${this.bodyForm.userId}/update`, this.bodyForm, this.aut);
      if (response.status === 200) {
        this.ctrlCssBlur = false;
        await this.router.navigate(['/address']);
      } else {
        this.ctrlCssBlur = false
      }
    }
  }
}
