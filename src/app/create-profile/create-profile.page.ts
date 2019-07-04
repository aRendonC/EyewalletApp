import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AxiosService } from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  public firstname: '';
  public lastname: '';
  public birthdate: '';
  public identification: 0;

  constructor(
    private router: Router,
    private menu: MenuController,
    private touchCtrl: TouchLoginService,
    private aut: AuthService,
    private http: AxiosService
  ) { }


  ngOnInit() {
    this.menu.enable(false);
    this.touchCtrl.isLocked = true;
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }
  async address(firstname, lastname, birthdate, identification) {
    firstname = this.firstname;
    lastname = this.lastname;
    birthdate = this.birthdate.substr(0, 10);
    identification = this.identification;
    const url = 'https://ad97da3d.ngrok.io/api/v1/profile/1/update';
    this.router.navigate(['/address']);
  }
}
