import {Injectable} from '@angular/core';
import {Device} from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  public constructor(
    private device: Device,
    private uniqueDeviceID: UniqueDeviceID
  ) { }

  public async getDataDevice(): Promise<any> {
    return await {
      cordova: this.device.cordova,
      model: this.device.model,
      platform: this.device.platform,
      uuid: await this.getUuid(),
      version: this.device.version,
      manufacturer: this.device.manufacturer,
      isVirtual: this.device.isVirtual,
      serial: this.device.serial,
    };
  }

  private async getUuid(): Promise<any> {
    return this.uniqueDeviceID.get()
    .then(async (uuid: any) => {
      return await uuid;
    })
    .catch((error: any) => {
      console.error('ERROR: ', error);
    });
  }
}
