import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import { AxiosService } from '../services/axios/axios.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private aut: AuthService,
    private menu: MenuController,
    private router: Router,
    private loginHttpReq: AxiosService
  ) {
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }




}
