import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import {ModalController, ToastController} from "@ionic/angular";
import {ListPocketsPage} from "../../list-pockets/list-pockets.page";
import {enterAnimation} from "../../animations/enter";
import {leaveAnimation} from "../../animations/leave";
import {AuthService} from "../../services/auth/auth.service";
import {Event, ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../../services/aesjs/aes-js.service";
import {LoadingService} from "../../services/loading/loading.service";

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss'],
})
export class PocketComponent implements OnInit {
  @Input() pockets: any = [];
  @Input() urlPresent: any = '';
  @Input() ctrlNavigation: number = 0;
  @Output() dataBalance = new EventEmitter<[]>();
  public pocket: any = '';
  imgLeft:string=null;
  imgRight:string=null;
  classLeft:string=null;
  constructor(
      private http: AxiosService,
      public modalCtrl: ModalController,
      protected auth: AuthService,
      private router: Router,
      private store: Storage,
      private aesjs: AesJsService,
      protected nvaigation: ActivatedRoute,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingService
  ) {
    this.classLeft="resize-logo-left1";
    this.imgLeft = "../../assets/img/btn-left-s.svg";
    this.imgRight="../../assets/img/btn-right.svg";

  }

   async ngOnInit() {
     await this.getPocketStore()
     // console.log('esto debería cambiar siempre', this.router.url);
     // this.urlPresent = this.router.url.slice(0, 9);
     // console.log(this.urlPresent);
     // this.router.events.subscribe((event: any) => {
     //   // console.log('este es un observable lindo 7w7',event)
     //   this.urlPresent = this.urlPresent.slice(9, 23);
     //   console.log('el evento de la ruta', this.urlPresent)
     //   //   if (event instanceof NavigationEnd ) {
     //   //     url = event.url
     //   //     url = url.slice(9, 23)
     //   //     this.urlPresent = url == '/send-currency';
     //   // }
     // })
   }
  async getPocketStore() {
    this.pockets = await this.store.get('pockets')
    if(!this.pockets){
      let response  = await this.http.get('user-wallet/index', this.auth, null);
      this.pockets = response
      response = await this.aesjs.encrypt(response)
      await this.store.set('pockets', response)
    } else {
      this.pockets = this.aesjs.decrypt(this.pockets);
    }

    this.pocket = this.pockets[0]
  }
  async openPocketsModal() {
    await this.loadingCtrl.present({cssClass: 'textLoadingBlack'})
    this.pockets = await this.http.get('user-wallet/index', this.auth, null);
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
        console.log('este es el pocket seleccionado con el modal', pocket)
        this.pocket = pocket.data;
        let body = {
          userId: this.pocket.userId,
          type: 0,
          address: this.pocket.address
        };
        console.log(body)
        let dataResponse = await this.http.post('transaction/index', body, this.auth);
        if(dataResponse.status === 200) {
          dataResponse.pocket = this.pocket
          this.dataBalance.emit(dataResponse)
        } else {
          await this.presentToast(dataResponse.data)
        }
      }
    });
    await this.loadingCtrl.dismiss()
    return await modalPocket.present();
  }

  async receiveCash() {;
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
      await this.presentToast('Lo sentimos, sus documentos no han sido verificados')
    } else {
      await this.router.navigate(['/send-currency', {pocket: JSON.stringify(this.pocket)}]);
    }
  }

  async goToHome() {
    await this.router.navigate(['/app/tabs']);
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    await toast.present();
  }
}
