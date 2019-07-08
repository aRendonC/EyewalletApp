import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AxiosService } from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import { AesJsService } from '../services/aesjs/aes-js.service';


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
    private aes: AesJsService
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
  async address(firstname, lastname, birthdate, identification, userId) {
    // Nombre
    firstname = this.firstname;
    lastname = this.lastname;
    birthdate = this.birthdate.slice(0, 10);
    identification = this.identification;
    this.user = await this.store.get('profile');
    this.user = JSON.parse(this.aes.decrypt(this.user));
    userId = this.user.userId;
    this.bodyForm = {userId, firstname, lastname, birthdate, identification};
    console.log(this.bodyForm);
    const response = await this.axios.put(`profile/${this.user.id}/update`, this.bodyForm, this.aut);
    console.log(response);
    if (response.status === 200) {
      this.router.navigate(['app/tabs/address']);
      this.store.set('user', JSON.stringify(response.data));
    }
  }
}
