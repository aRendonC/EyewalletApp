import { Injectable } from '@angular/core';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";

@Injectable({
  providedIn: 'root'
})
export class QRScannerService {
    isOn = false;
    scannedData: {};
  constructor(
      private qrScanner: QRScanner
  ) { }

    startScanner() {

        this.qrScanner.prepare()
            .then(async (status: QRScannerStatus) => {
                if (status.authorized) {

                    this.isOn = true;

                    const scanSub = this.qrScanner.scan().subscribe(async () => {
                        this.isOn = false;
                        await this.qrScanner.hide();
                        scanSub.unsubscribe();
                    });

                    await this.qrScanner.show();


                } else if (status.denied) {
                    this.qrScanner.openSettings();
                } else {
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
}

