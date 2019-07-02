import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import { AxiosService } from '../services/axios/axios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private aut: AuthService,
    private menu: MenuController,
    private router: Router,
    private loginHttpReq: AxiosService
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
        // @ts-ignore
        // this.router.navigateByUrl(`/perfil/${data.serializeToken}`);
        // this.router.navigate(['/perfil',data.id]);
        this.router.navigate(['/app/tabs']);
      } else {
        this.presentToast();
      }
    }).catch((error) => {
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
