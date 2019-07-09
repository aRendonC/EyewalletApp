import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import { AxiosService } from '../services/axios/axios.service';
import {ModalController} from '@ionic/angular';
import {PinModalPage} from '../pin-modal/pin-modal.page';
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {LoadingService} from "../services/loading/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ctrlCssBlur: boolean = false;
  username: string;
  password: string;
  dataReturned: any;
  pockets: any = [];
  public path: string = '';

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private auth: AuthService,
    private menu: MenuController,
    private router: Router,
    private http: AxiosService,
    public modalCtrl: ModalController,
    private touchCtrl: TouchLoginService,
    private store: Storage,
    private aesjs: AesJsService,
    private loadingCtrl: LoadingService
  ) {
  }

  ngOnInit() {
    this.menu.enable(false);
    this.touchCtrl.isLocked = true
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  async login() {
    await this.loadingCtrl.present({});
    this.ctrlCssBlur = true;
    this.auth.login(this.username, this.password).then(async (data) => {
      console.info('datos de inicio de sesión', data);
      if (data) {
        // @ts-ignore
        // this.router.navigateByUrl(`/perfil/${data.serializeToken}`);
        // this.router.navigate(['/perfil',data.id]);
        await this.getUserProfile();
        await this.getPocketsList();
        // this.pockets = JSON.stringify(this.pockets)
        console.info('mis pockets', this.pockets);
        this.touchCtrl.isLocked = false;
        this.ctrlCssBlur = false;
        await this.loadingCtrl.dismiss();
       await this.router.navigate(['/app/tabs', {pockets: JSON.stringify(this.pockets)}]);
        this.pockets = this.aesjs.encrypt(this.pockets);
        await this.store.set('pockets', this.pockets)
      } else {
        this.ctrlCssBlur = false;
        await this.loadingCtrl.dismiss();
        await this.presentToast();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  async getUserProfile() {
    console.log('auth del usuario', this.auth);
    let profile = await this.http.get('profile/1/view',this.auth, null);
    console.info(profile);
    profile = this.aesjs.encrypt(profile);
    await this.store.set('profile', profile)
  }
  async openModal() {
    const moda = await this.modalCtrl.getTop();
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

  async getPocketsList() {
    this.pockets = await this.http.get('user-wallet/index', this.auth, null);
  }

  public async restore() {
    await this.router.navigate(['restore']);
  }
}
