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

                    // start scanning
                    const scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        console.log('Scanned something', text);

                        this.isOn = false;
                        await this.qrScanner.hide();
                        scanSub.unsubscribe();
                    });

                    await this.qrScanner.show();


                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                    this.qrScanner.openSettings();
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
}

