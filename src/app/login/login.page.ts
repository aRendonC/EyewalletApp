import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AxiosService} from '../services/axios/axios.service';
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public ctrlCssBlur: boolean = false;
  public username: string;
  public password: string;
  public dataReturned: any;
  public pockets: any = [];
  public path: string = '';

  constructor(
    private toastController: ToastService,
    private auth: AuthService,
    private menu: MenuController,
    private router: Router,
    private http: AxiosService,
    public modalCtrl: ModalController,
    private touchCtrl: TouchLoginService,
    private store: Storage,
    private aesjs: AesJsService,
    private loadingCtrl: LoadingService
  ) { }

  ngOnInit() { }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  async login() {
    await this.store.clear();
    console.log('el store se está limpiando en el login', await this.store.keys())
    await this.loadingCtrl.present({text: 'Cargando'});
    this.ctrlCssBlur = true;
    this.auth.login(this.username, this.password)
    .then(async (data: any) => {
      if (data) {
        if (data.status == 200) {
          this.pockets = await this.getPocketsList();
          console.info('mis pockets', this.pockets[0]);
          this.touchCtrl.isLocked = true;
          this.ctrlCssBlur = false;
          await this.loadingCtrl.dismiss();
          let pockets = this.pockets;
          pockets = this.aesjs.encrypt(pockets);
          await this.store.set('pocket', pockets);
          await this.router.navigate([
              '/app/tabs/dashboard']);
          this.pockets = this.aesjs.encrypt( this.pockets[0]);
          await this.store.set('pockets',  this.pockets)
        } else await this.clearData(data);
      } else await this.clearData(data)
    })
    .catch((error) => {
      this.ctrlCssBlur = false;
      console.log(error);
    });
  }

  public async getPocketsList() {
    return await this.http.get('user-wallet/index', this.auth, null);
  }

  public async restore() {
    await this.router.navigate(['restore']);
  }

  public async clearData(error) {
    console.log(error);
    await this.loadingCtrl.dismiss();
    this.ctrlCssBlur = false;
    await this.toastController.presentToast({text: error, duration: 1000});
  }
}
