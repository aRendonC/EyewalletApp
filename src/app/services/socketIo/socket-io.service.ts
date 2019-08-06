import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {DeviceService} from "../device/device.service";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(
      private socket: Socket,
      private device: DeviceService
  ) { }

  async initSocketConnection() {
    let device = await this.device.getDataDevice();
    if (!device.uuid) device.uuid = 'asdadsrfgdf';
    this.socket.on(device.uuid, data => {
      console.log('esto es lo que me recibe en el socket', data)
    });

  }

  disconnectSocket(){
    this.socket.disconnect()
  }
}
