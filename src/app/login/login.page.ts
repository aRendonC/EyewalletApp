import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import { AxiosService } from '../services/axios/axios.service';
import {ModalController} from '@ionic/angular';
import {PinModalPage} from '../pin-modal/pin-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  dataReturned: any;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private aut: AuthService,
    private menu: MenuController,
    private router: Router,
    private loginHttpReq: AxiosService,
    public modalCtrl: ModalController
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

  async openModal() {
    const moda = await this.modalCtrl.getTop()
    console.log(moda)
    const modal = await this.modalCtrl.create({
      component: PinModalPage,
      componentProps: {
        paramID: 123,
        paramTitle : 'Test title'
      }
    });

    return await modal.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrecta.',
      duration: 2000
    });
    toast.present();
  }

}
