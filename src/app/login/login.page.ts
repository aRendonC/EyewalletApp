import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AxiosService} from '../services/axios/axios.service';
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";
import {DataLocalService} from "../services/data-local/data-local.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public ctrlCssBlur: boolean = false;
  public username: string = null;
  public password: string = null;
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
    private store: DataLocalService,
    private loadingCtrl: LoadingService
  ) { }

  ngOnInit() { }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  async login() {
    if(this.password && this.username) {
      await this.store.clearStore();
      await this.loadingCtrl.present({text: 'Cargando'});
      this.ctrlCssBlur = true;
      this.auth.login(this.username, this.password)
          .then(async (data: any) => {
            if (data) {
              if (data.status == 200) {
                this.pockets = await this.getPocketsList();
                console.info('mis pockets', this.pockets);
                this.touchCtrl.isLocked = true;
                this.ctrlCssBlur = false;
                await this.loadingCtrl.dismiss();
                let pocket =this.pockets[0];
                this.store.setDataLocal('selected-pocket', pocket);
                await this.router.navigate([
                  '/app/tabs/dashboard']);
                await this.store.setDataLocal('pockets',  this.pockets)
              } else await this.clearData(data);
            } else await this.clearData(data)
          })
          .catch(async (error) => {
            this.ctrlCssBlur = false;
            console.error('ERROR: ', error);
            await this.loadingCtrl.dismiss();
          });
    } else {
      if(!this.password && !this.username) {
        await this.toastController.presentToast({text: 'Todos los campos son obligatorios', duration: 1000});
      } else if(!this.username) {
        await this.toastController.presentToast({text: 'El campo correo electrónico es obligatorio', duration: 1000});
      } else if(!this.password){
        await this.toastController.presentToast({text: 'El campo correo contraseña es obligatorio', duration: 1000});
      }
    }
  }

  public async getPocketsList() {
    return await this.http.post('user-wallet/index',{currencyId: ''} , this.auth);
  }

  public async restore() {
    await this.router.navigate(['restore']);
  }

  public async clearData(error) {
    await this.loadingCtrl.dismiss();
    this.ctrlCssBlur = false;
    await this.toastController.presentToast({text: error, duration: 1000});
  }
}
