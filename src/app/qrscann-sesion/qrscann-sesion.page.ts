import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-qrscann-sesion',
  templateUrl: './qrscann-sesion.page.html',
  styleUrls: ['./qrscann-sesion.page.scss'],
})

export class QrscannSesionPage implements OnInit {
  public sessionsList: any[];
  public showScanner: boolean;
  public classBlur: boolean;

  public constructor(
    private axiosService: AxiosService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
    private qrScanner: QRScanner,
    private loadingService: LoadingService
  ) {
    this.sessionsList = [];
    this.showScanner = false;
    this.classBlur = false;
  }

  public async ngOnInit(): Promise<any> {}

  public async ionViewDidEnter(): Promise<any> {
    this.classBlur = true;
    this.loadingService.present({text: this.translateService.instant('QRSCANN_SESION.VerifyingMessage'), cssClass: 'textLoadingBlack'});
    await this.getSessionsStarted();
  }

  public returnPage(): void {
    this.closeScanner();
    this.router.navigate(['/app/tabs/profile']);
  }

  private async getSessionsStarted(): Promise<any> {
    this.axiosService.post('auth/listChannel', {}, this.authService)
    .then((response: any) => {
      this.validateSessionsStarted(response);
    })
    .catch((error: any) => {
      console.error('ERROR: ', error);
      this.classBlur = false;
      this.loadingService.dismiss();
      this.toastService.presentToast({text: this.translateService.instant('CONNECTION_ERRORS.Error')});
      this.router.navigate(['/app/tabs/profile']);
    })
  }

  private validateSessionsStarted(dataResponse: any): void {
    if (dataResponse.data.length > 0) {
      this.sessionsList = this.parseDataSessions(dataResponse.data);
      console.log('DATA: ', dataResponse.data);
      this.classBlur = false;
      this.loadingService.dismiss();
    } else {
      this.classBlur = false;
      this.loadingService.dismiss();
      this.showQrScanner();
    }
  }

  private parseDataSessions(data: any): any {
    data.forEach(infoSession => {
      infoSession.agent = JSON.parse(infoSession.agent);
    });
    return data
  }

  private showQrScanner(): void {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.getQrData();
      }
    })
    .catch((error: any) => {
      console.error('ERROR: ', error);
      this.toastService.presentToast({text: this.translateService.instant('QRSCANN_SESION.QrError')});
      this.router.navigate(['/app/tabs/profile']);
    });
  }

  private getQrData(): void {
    const sessionsContent: any = document.getElementById('sessions');
    let scanSub = this.qrScanner.scan()
    .subscribe((text: string) => {
      console.info('Scanned something', text);
      this.closeScanner();
      scanSub.unsubscribe();
      this.router.navigate(['/app/tabs/profile']);
    });

    this.qrScanner.show();
    this.showScanner = true;
    sessionsContent.classList.remove('display-block');
  }

  private closeScanner(): void {
    const scannerContent: any = document.getElementById('scanner');
    this.showScanner = false;
    scannerContent.classList.remove('display-block');
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  public async closeSession(channel: string, platform: number): Promise<any> {
    const dataBody: any = {
      plattform: platform,
	    channel: channel
    }
    
    this.axiosService.post('logoutRemote', dataBody, this.authService)
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.error('ERROR: ', error);
    })
  }
}
