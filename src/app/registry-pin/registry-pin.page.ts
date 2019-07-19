import { Component, OnInit } from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {DeviceService} from '../services/device/device.service';
import * as CONSTANTS from '../constanst';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {LoadingService} from '../services/loading/loading.service';
import {AesJsService} from '../services/aesjs/aes-js.service';

@Component({
  selector: 'app-registry-pin',
  templateUrl: './registry-pin.page.html',
  styleUrls: ['./registry-pin.page.scss'],
})
export class RegistryPinPage implements OnInit {
  public ctrlCssBlur = false;
  public constants: any = CONSTANTS;
  bodyForm: FormGroup;
  private devic: any = {};
  private user: any = null;
  public classButton: string = 'button-disable';
  pockets: any = [];

  constructor(
      private axios: AxiosService,
      private device: DeviceService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private store: Storage,
      private loadingCtrl: LoadingService,
      private aesjs: AesJsService
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('user'));
    this.user.data.password = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('password'));
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

  public async registerPin(data: any) {
    await this.loadingCtrl.present({text: 'Validando creacion de billetera'});
    this.ctrlCssBlur = true;

    this.devic = await this.device.getDataDevice();
    console.info(this.bodyForm);
    console.info(data);
    console.info('datos del device', this.devic);
    if(!this.devic.uuid) this.devic.uuid = 'edwigrendon';
    this.bodyForm.value.device = this.devic;
    this.bodyForm.value.userId = this.user.data.id;
    console.log('bodyForm', this.bodyForm);
    console.log('auth service', this.auth);
    console.log('auth service', this.user);
    const response = await this.axios.put(`profile/${this.user.data.id}/pin`, this.bodyForm.value, this.auth);
    console.log('acá registra el pin respuesta----->', response);
    if (response.status === 200) {
      let loginUser: any = await this.auth.login(this.user.data.email, this.user.data.password);
      if(loginUser.status === 200){
        this.pockets = await this.getPocketsList();
        await this.router.navigate(['/app/tabs/dashboard']);
        this.pockets = this.aesjs.encrypt(this.pockets[0]);
        await this.store.set('pockets', this.pockets);

        await this.loadingCtrl.dismiss();
        this.ctrlCssBlur = false;
      }
    } else {
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
    }
  }

  async getPocketsList() {
    return await this.axios.get('user-wallet/index', this.auth, null);
  }
}
