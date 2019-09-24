import {Component, OnInit} from '@angular/core';
import {TimerService} from '../services/timer/timer.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {CameraProvider} from '../services/camera/camera';
import {AlertController} from '@ionic/angular';
import {DeviceService} from '../services/device/device.service';
import {Router} from '@angular/router';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import { LanguageService } from '../services/language/language.service';

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
  selectedLanguage = '';
  languages = [];

  constructor(private timer: TimerService,
              private axios: AxiosService,
              private router: Router,
              private auth: AuthService,
              private camera: CameraProvider,
              private alertCtrl: AlertController,
              private touchCtrl: TouchLoginService,
              private device: DeviceService,
              private languageService: LanguageService,
              ) {
    this.temporizador = timer.temporizador;
    this.dataDevice = this.deviceData();
  }

  ngOnInit() {
    this.touchCtrl.isTouch = false;
    this.languages = LanguageService.getLanguages();
    this.selectedLanguage = this.languageService.selected;
  }

  ionViewDidEnter() {
    
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

  async selectLanguage() {
    await this.languageService.setLanguage(this.selectedLanguage);
  }

}
