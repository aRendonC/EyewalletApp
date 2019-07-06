import {Component, Input, OnInit} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import {ModalController} from "@ionic/angular";
import {ListPocketsPage} from "../../list-pockets/list-pockets.page";
import {enterAnimation} from "../../animations/enter";
import {leaveAnimation} from "../../animations/leave";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss'],
})
export class PocketComponent implements OnInit {
  @Input() pockets: any = [];
  public pocket: any = ''
  imgLeft:string=null;
  imgRight:string=null;
  classLeft:string=null;
  constructor(
      private http: AxiosService,
      public modalCtrl: ModalController,
      protected auth: AuthService,
      private router: Router
  ) {
    this.classLeft="resize-logo-left1";
    this.imgLeft = "../../assets/img/btn-left-s.svg";
    this.imgRight="../../assets/img/btn-right.svg";
  }

  ngOnInit() {
    this.pocket = this.pockets[0]
  }
  async openPocketsModal() {
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

    modalPocket.onDidDismiss().then((pocket:any)=> {
      console.log(pocket)
      if(pocket.data)this.pocket = pocket.data
      console.log(this.pocket)
    })

    return await modalPocket.present();
  }

  async receiveCash() {
    console.log(this.pocket)
    await this.router.navigate(['/app/tabs/receive-funds', {pocket: JSON.stringify(this.pocket)}]);
  }

  sendCash(){

  }
}
