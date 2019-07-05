import {Injectable} from '@angular/core';
import {Device} from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  constructor(private device: Device) {
    this.getDataDevice();
  }

  async getDataDevice() {
    return await {
      cordova: this.device.cordova,
      model: this.device.model,
      platform: this.device.platform,
      uuid: this.device.uuid,
      version: this.device.version,
      manufacturer: this.device.manufacturer,
      isVirtual: this.device.isVirtual,
      serial: this.device.serial,
    };
  }
}
