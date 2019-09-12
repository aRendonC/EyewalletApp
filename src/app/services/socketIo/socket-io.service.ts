import {Injectable, ViewChild} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {DeviceService} from "../device/device.service";
import {SlidersComponent} from "../../components/sliders/sliders.component";
import {DataLocalService} from "../data-local/data-local.service";
import { AesJsService } from '../aesjs/aes-js.service';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { SesionModalPage } from '../../sesion-modal/sesion-modal.page';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../toast/toast.service';

import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  @ViewChild(SlidersComponent) sliderComponent: SlidersComponent;

  constructor(
      private socket: Socket,
      private device: DeviceService,
      private storage: DataLocalService,
      public modalController: ModalController,
      private aesJ: AesJsService,
      private auth: AuthService,
      private toastController: ToastService,
      private localNotifications: LocalNotifications,
      private plt: Platform,
      private alertCtrl: AlertController,
  ) { 
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
  }

  async verifyEmail(data) {
    let verificationUser = await this.storage.getDataLocal('userVerification');
    console.log(verificationUser);
    console.log(data);
    SlidersComponent.connectionDataSocket(data.data)
  }

  disconnectSocket(){
    this.socket.disconnect();
  }

  async initSocket(channel){
    let valor = await this.aesJ.decrypt(channel);
    console.log("valor-takes: ",valor);

    this.socket.on(valor, async data =>{
      console.log("DATA:",data);
      console.log("Status ", data.status);
      if(data.status === 101){
        this.localNotifications.schedule({
          id: 1,
          title: 'Attention',
          text: 'Sesión',
          data: { mydata: 'Se cerro la sesión en otro dispositivo' },
          trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
          foreground: true,
          lockscreen: true // Show the notification while app is open
        });
        this.disconnectSocket();
        await this.auth.logout();
        
      }

      if(data.status === 102 && data.data === 0){
        this.localNotifications.schedule({
          id: 22,
          title: 'Attention',
          text: 'Inicio de sesion en la web',
          data: { mydata: 'Se inicio sesion en la web' },
          trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
          foreground: true,
          lockscreen: true // Show the notification while app is open
        });
      }

      if (data.status === 103) {
        this.localNotifications.schedule({
          id: 22,
          title: 'Attention',
          text: 'Transacción',
          data: { mydata: 'Transaccìon realizada' },
          trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
          foreground: true,
          lockscreen: true // Show the notification while app is open
        });
      }

      if(data.status === 104) {
        this.localNotifications.schedule({
          id: 22,
          title: 'Attention',
          text: 'Transacción',
          data: { mydata: 'Transaccìon confirmada' },
          trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
          foreground: true,
          lockscreen: true // Show the notification while app is open
        });
      }
    });
  }

  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }


}
