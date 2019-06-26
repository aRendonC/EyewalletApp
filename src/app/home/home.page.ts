import {Component, OnInit, ViewChild} from '@angular/core';
import {TimerService} from '../services/timer/timer.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {LoadingController} from '@ionic/angular';


const MEDIA_FILES_KEY = 'mediaFiles';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  temporizador: any;
  @ViewChild('lineCanvas') lineCanvas;

  constructor(private  timer: TimerService,
              private axios: AxiosService,
              private auth: AuthService,
              private  loadCtrl: LoadingController) {
    this.temporizador = timer.temporizador;
  }

  ngOnInit() {
  }


}
