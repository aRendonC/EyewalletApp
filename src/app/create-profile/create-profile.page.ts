import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
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
  public firstname: '';
  public lastname: '';
  public birthdate: '';
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
    this.touchCtrl.isLocked = true;
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }

  // Esta función me lleva a la pagina que tiene dirección pero primero envia los
  // datos del form a la API medinte un put request
  async address() {
    await this.loadingCtrl.present({});
    // Nombre
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
    // const response = await this.axios.put(`profile/${this.user.data.id}/update`, this.bodyForm, this.aut);
    const response = await this.axios.put(`profile/${this.bodyForm.userId}/update`, this.bodyForm, this.aut);
    if (response.status === 200) {
      await this.router.navigate(['/address']);
      // this.store.set('user', JSON.stringify(response.data));
      // console.log( await this.store.set('user', JSON.stringify(response.data)));
    } else {
      await this.loadingCtrl.dismiss();
    }
  }
}
