import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import {AlertController, ModalController} from "@ionic/angular";
import {ListPocketsPage} from "../../list-pockets/list-pockets.page";
import {enterAnimation} from "../../animations/enter";
import {leaveAnimation} from "../../animations/leave";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../../services/aesjs/aes-js.service";
import {LoadingService} from "../../services/loading/loading.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss'],
})

export class PocketComponent implements OnInit {
  pockets: any = null;
  @Input() urlPresent: any = '';
  @Input() ctrlNavigation: number = 0;
  @Output() dataBalance = new EventEmitter<[]>();
  @Input() pocket: any = '';
  @Input() listVaultLength: boolean = false;
  imgLeft:string=null;
  imgRight:string=null;
  classLeft:string=null;
  currencyId: any  = null;

  constructor(
      private http: AxiosService,
      public modalCtrl: ModalController,
      protected auth: AuthService,
      private router: Router,
      private store: Storage,
      private aesjs: AesJsService,
      private toastCtrl: ToastService,
      private loadingCtrl: LoadingService,
      private alertCtrl: AlertController,
      private axiosService: AxiosService,
      private authService: AuthService,
  ) {
    this.classLeft="resize-logo-left1";
    this.imgLeft = "../../assets/img/btn-left-s.svg";
    this.imgRight="../../assets/img/btn-right.svg";
  }

  async ngOnInit() {
    await this.getPocketStore();
  }

  async getPocketStore() {
    if(!this.pocket )this.aesjs.decrypt(await this.store.get('selected-pocket'));
  }

  async openPocketsModal() {
    await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
    this.pockets = await this.http.post('user-wallet/index', {currencyId: this.pocket.currencyId}, this.auth);
    const modalPocket = await this.modalCtrl.create({
      component: ListPocketsPage,
      animated: true,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        pockets: this.pockets
      }
    });

    modalPocket.onDidDismiss().then(async (pocket:any)=> {
      if(pocket.data) {
        this.pocket = pocket.data;
        let body = {
          userId: this.pocket.userId,
          type: 0,
          address: this.pocket.address,
          currencyShortName: this.pocket.currency.shortName
        };
        await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
        let dataResponse = await this.http.post('transaction/index', body, this.auth);
        if(dataResponse.status === 200) {
          await this.loadingCtrl.dismiss();
          dataResponse.pocket = this.pocket;
          this.dataBalance.emit(dataResponse)
        } else {
          await this.toastCtrl.presentToast({text: dataResponse.error.msg})
        }
      }
    });
    await this.loadingCtrl.dismiss();
    return await modalPocket.present();
  }

  async receiveCash() {
    await this.router.navigate([
        '/receive-funds'],{
      queryParams: {
        pocket: JSON.stringify(this.pocket)
      }, queryParamsHandling: 'merge'
    });
  }

  async sendCash() {
    let profile = await this.store.get('profile');
    profile = this.aesjs.decrypt(profile);
    if(profile.level === 0) {
      await this.toastCtrl.presentToast({text: 'Lo sentimos, sus documentos no han sido verificados'})
    } else {
      await this.router.navigate(['/send-currency', {pocket: JSON.stringify(this.pocket)}]);
    }
  }

  async goToHome() {
    await this.router.navigate(['/app/tabs/dashboard']);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Desea cerrar su sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.logOut();
            await this.toastCtrl.presentToast({text: 'Su sesión ha sido cerrada correctamente'})
          }
        }
      ]
    });
    await alert.present();
  }
  async logOut() {
    await this.loadingCtrl.present({});
    await this.auth.logout()
  }

  openUrl(url) {
    window.open(url, '_blank')
  }

  public clickButtonLeftCinco(): void {
    this.router.navigate(['/app/tabs/vault']);
  }

  public clickButtonRightCinco(): void {
    this.router.navigate(['/app/tabs/vault']);
  }

  public clickButtonLeftSeis(): void {
    this.router.navigate(['/app/tabs/vault-list']);
  }
}
