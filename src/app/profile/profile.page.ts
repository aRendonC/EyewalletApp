import {Component, OnInit} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {TimerService} from '../services/timer/timer.service';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario = {};
  pais: any;
  perfil: any;
  temporizador: any;
  pockets: any = []

  constructor(
    private axios: AxiosService,
    private auth: AuthService,
    private timer: TimerService,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute
  ) {
    this.temporizador = this.timer.temporizador;
  }

  ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    console.info(this.pockets)

  }
}
