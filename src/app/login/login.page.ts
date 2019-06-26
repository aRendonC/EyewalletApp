import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username;
  password;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private aut: AuthService,
    private navController: NavController,
    private menu: MenuController,
  ) {
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  async login() {
    this.aut.login(this.username, this.password).then((data) => {
      if (data !== null) {
        this.navController.navigateForward('/perfil');
      } else {
        this.presentToast();
      }
    }).catch((error) => {
      // loading.dismiss();
      console.log(error);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrecta.',
      duration: 2000
    });
    toast.present();
  }

}
