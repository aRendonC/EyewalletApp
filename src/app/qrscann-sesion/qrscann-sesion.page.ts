import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrscann-sesion',
  templateUrl: './qrscann-sesion.page.html',
  styleUrls: ['./qrscann-sesion.page.scss'],
})
export class QrscannSesionPage implements OnInit {
  public cssCtrlContents = true;
  scanSub: any;
  constructor(
    private qrScanner: QRScanner,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.scanner();
  }

  scanner(){
        //this.bodyForm.get('to_address').setValue('');
        this.qrScanner.prepare()
            .then(async (status: QRScannerStatus) => {
                if (status.authorized) {
                  this.cssCtrlContents = false;

                     this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log('Scanned something', text);
                       this.removeCamera();
                    });


                    await this.qrScanner.show();


                } else if (status.denied) {

                }
            })
            .catch((e: any) => console.log('Error is', e));
  }

  async removeCamera() {
    this.cssCtrlContents = true;
    let element = document.getElementById('QRScaner');
    element.classList.remove('show-qr-scanner');
    // await this.toastCtrl.presentToast({
    //   text: this.translateService.instant('SEND_CRYPTO_CURRENCY.QrOk'),
    //   duration: 3000
    // });
    await this.qrScanner.destroy();
    this.scanSub.unsubscribe();
    //this.touchCtrl.isTouch = true;
  }
}
