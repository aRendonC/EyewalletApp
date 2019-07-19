import {Component, OnInit} from '@angular/core';
import {TimerService} from '../services/timer/timer.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {CameraProvider} from '../services/camera/camera';
import {AlertController} from '@ionic/angular';
import {DeviceService} from '../services/device/device.service';
import {Router} from '@angular/router';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';


const MEDIA_FILES_KEY = 'mediaFiles';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private dataDevice = null;
  private usuario: any = null;
  temporizador: any;

  constructor(private timer: TimerService,
              private axios: AxiosService,
              private router: Router,
              private auth: AuthService,
              private camera: CameraProvider,
              private alertCtrl: AlertController,
              private touchCtrl: TouchLoginService,
              private device: DeviceService,
              ) {
    this.temporizador = timer.temporizador;
    this.dataDevice = this.deviceData();
  }

  ngOnInit() {
    this.touchCtrl.isLocked = true;
  }

  async login() {
    await this.router.navigate(['/login']);
  }
  async registry() {
    await this.router.navigate(['/registry']);
  }


  async deviceData() {
    this.dataDevice = await this.device.getDataDevice();
  }

}
