import {Component, Input, OnInit} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import {ModalController} from "@ionic/angular";
import {ListPocketsPage} from "../../list-pockets/list-pockets.page";
import {enterAnimation} from "../../animations/enter";
import {leaveAnimation} from "../../animations/leave";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss'],
})
export class PocketComponent implements OnInit {
  @Input() pockets: any = [];
  public name: string = ''
  constructor(
      private http: AxiosService,
      public modalCtrl: ModalController,
      protected auth: AuthService
  ) { }

  ngOnInit() {
    this.name = this.pockets[0].label
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
      if(pocket.data)this.name = pocket.data.label
      console.log(this.name)
    })

    return await modalPocket.present();
  }
}
