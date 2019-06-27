import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {path} from "@angular-devkit/core";

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
    private menu: MenuController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  async login() {
    // this.router.navigateByUrl('tabs/profile')
    this.aut.login(this.username, this.password).then((data) => {
      if (data !== null) {
        // this.router.navigateByUrl(`/profile/${data.serializeToken}`);
        // this.router.navigate(['/profile',data.id]);
        // this.router.navigate([{outlets: {profile: 'profile'}}]);
        // this.router.navigate(['/profile']);
      } else {
        this.presentToast();
      }
    }).catch((error) => {
      this.presentToast();
      // loading.dismiss();
      console.log(error);
    });
  }

  async presentToast() {
    console.log('sss')
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrecta.',
      duration: 2000
    });
    toast.present();
  }

}
