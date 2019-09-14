import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { LoadingService } from '../services/loading/loading.service';
import * as CONSTANTS from '../constanst';
import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';

@Component({
  selector: 'app-qrscann-sesion',
  templateUrl: './qrscann-sesion.page.html',
  styleUrls: ['./qrscann-sesion.page.scss'],
})

export class QrscannSesionPage implements OnInit {
  public sessionsList: any[];
  public showScanner: boolean;
  public classBlur: boolean;
  public dataUser: any;

  public constructor(
    private axiosService: AxiosService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
    private qrScanner: QRScanner,
    private loadingService: LoadingService,
    private dataLocalService: DataLocalService,
    private aesJsService: AesJsService
  ) {
    this.sessionsList = [];
    this.showScanner = false;
    this.classBlur = false;
    this.dataUser = {};
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
      this.validateSessionsStarted(response.data);
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
    if (dataResponse.length > 0) {
      this.validateArraySessionsStarted(dataResponse);
      this.classBlur = false;
      this.loadingService.dismiss();
    } else {
      this.funcionalityShowQrScanner();
    }
  }

  private validateArraySessionsStarted(dataSessionsSatarted: any): void {
    let sessionsList: any = [];
    this.parseDataSessions(dataSessionsSatarted).forEach(session => {
      if (session.plattform === CONSTANTS.TYPE_PLATFORM.COMPUTER) {
        sessionsList.push(session);
      }
    });
    this.validateShoqScannerOrSessionsList(sessionsList);
  }

  private validateShoqScannerOrSessionsList(sessionsList: any): void {
    if (sessionsList.length > 0) {
      this.sessionsList = sessionsList;
    } else {
      this.funcionalityShowQrScanner();
    }
  }

  private funcionalityShowQrScanner(): void {
    this.classBlur = false;
    this.loadingService.dismiss();
    this.showQrScanner();
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

  public async closeSession(): Promise<any> {
    const dataUser: any = await this.dataLocalService.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.PROFILE);
    let channel = await this.dataLocalService.getDataLocal('chanelSocket');
    const dataBody: any = {
      plattform: 1,
      channel,
      userId: dataUser.userId
    }
    
    this.axiosService.post('auth/logoutRemote', dataBody)
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.error('ERROR: ', error);
    })
  }
}
