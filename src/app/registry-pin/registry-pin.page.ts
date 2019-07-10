import { Component, OnInit } from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {DeviceService} from '../services/device/device.service';
import * as CONSTANTS from '../constanst';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-registry-pin',
  templateUrl: './registry-pin.page.html',
  styleUrls: ['./registry-pin.page.scss'],
})
export class RegistryPinPage implements OnInit {
  public constants: any = CONSTANTS;
  bodyForm: FormGroup;
  private devic: any = {};
  private user: any = null;

  constructor(
      private axios: AxiosService,
      private device: DeviceService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private store: Storage
  ) {
  }

  async ngOnInit() {
    this.user = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('user'))
    this.user.data.password = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('password'))
    console.log('con estos datos iniciar sesión', this.user)
    this.auth.usuario.accessToken = this.user.accessToken;
    this.bodyForm = new FormGroup({
      pin: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.maxLength(6)
      ])),
      device: new FormControl(''),
      userId: new FormControl('')
    });
  }

  async registerPin(data: any) {
    this.devic = await this.device.getDataDevice();
    console.info(this.bodyForm);
    console.info(data);
    console.info('datos del device', this.devic);
    if(!this.devic.uuid) this.devic.uuid = 'aasdfdfasdsssññasdshñ'
    this.bodyForm.value.device = this.devic;
    this.bodyForm.value.userId = this.user.data.id;
    console.log('bodyForm', this.bodyForm);
    console.log('auth service', this.auth);
    const response = await this.axios.put('profile/1/pin', this.bodyForm.value, this.auth)
    console.log('acá registra el pin respuesta----->', response);
    if (response.status === 200) {
      let loginUser: any = await this.auth.login(this.user.data.email, this.user.data.password)
      if(loginUser.status === 200){
        await this.router.navigate(['/app/tabs'])
      }
    }
  }
}
