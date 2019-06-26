import {Component, OnInit} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {TimerService} from '../services/timer/timer.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario = {};
  pais: any;
  perfil: any;
  temporizador: any;

  constructor(
    private axios: AxiosService,
    private auth: AuthService,
    private timer: TimerService,
    private loadCtrl: LoadingController,
  ) {
    this.temporizador = this.timer.temporizador;
  }

  ngOnInit() {
  }
}
