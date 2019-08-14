import {Injectable, ViewChild} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {DeviceService} from "../device/device.service";
import {SlidersComponent} from "../../components/sliders/sliders.component";
import {DataLocalService} from "../data-local/data-local.service";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  @ViewChild(SlidersComponent) sliderComponent: SlidersComponent;

  constructor(
      private socket: Socket,
      private device: DeviceService,
      private storage: DataLocalService
  ) { }

  async initSocketConnection() {
    let device = await this.device.getDataDevice();
    if (!device.uuid) device.uuid = '7219d0c4-ee04-6311-3520-050907084658';
    this.socket.on('connection', data => console.log(data));
    this.socket.on(device.uuid, data => {
      console.log('esto es lo que me recibe en el socket', data);
      data.type == 1 ? this.verifyEmail(data) : console.log(data)
    });
  }

  async verifyEmail(data) {
    let verificationUser = await this.storage.getDataLocal('userVerification');
    console.log(verificationUser);
    console.log(data);
    SlidersComponent.connectionDataSocket(data.data)
  }

  disconnectSocket(){
    this.socket.disconnect()
  }
}
