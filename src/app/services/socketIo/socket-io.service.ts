import {Injectable, ViewChild} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {DeviceService} from "../device/device.service";
import {SlidersComponent} from "../../components/sliders/sliders.component";
import {DataLocalService} from "../data-local/data-local.service";
import { AesJsService } from '../aesjs/aes-js.service';
import { ModalController } from '@ionic/angular';
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
      private localNotifications: LocalNotifications
  ) { }

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
        await this.auth.logout();
        await this.toastController.presentToast({
          text: valor,
          duration: 1000
        });
      }

      if(data.status === 102){
        this.localNotifications.schedule({
          id: 22,
          title: 'Recurring',
          text: 'Simons Recurring Notification',
          trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
        });
      }
    });
  }


}
