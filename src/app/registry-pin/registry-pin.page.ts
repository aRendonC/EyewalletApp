import { Component, OnInit } from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {DeviceService} from '../services/device/device.service';
import * as CONSTANTS from '../constanst';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from '../services/loading/loading.service';
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {DataLocalService} from "../services/data-local/data-local.service";
import * as utils from '../../assets/utils';

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
  public buttonDisabled: boolean;

  constructor(
    private axios: AxiosService,
    private device: DeviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: DataLocalService,
    private loadingCtrl: LoadingService,
    private touchCtrl: TouchLoginService,
  ) {
    this.buttonDisabled = true;
  }

  async ngOnInit() {
    this.touchCtrl.isTouch = false;
    this.user = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('user'));
    this.user.data.password = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('password'));
    this.auth.usuario.accessToken = this.user.accessToken;
    this.bodyForm = new FormGroup({
      pin: new FormControl('', Validators.compose(
        [
          Validators.minLength(6),
          Validators.required,
          Validators.maxLength(6)
        ]
      )),
      device: new FormControl(''),
      userId: new FormControl('')
    });
  }

  public async registerPin(data: any) {
    await this.loadingCtrl.present({text: 'Validando creación de billetera'});
    this.ctrlCssBlur = true;

    this.devic = await this.device.getDataDevice();
    if(!this.devic.uuid) this.devic.uuid = 'asd6544asd';
    this.bodyForm.value.device = this.devic;
    this.bodyForm.value.userId = this.user.data.id;
    const response = await this.axios.put(`profile/${this.user.data.id}/pin`, this.bodyForm.value, this.auth);
    if (response.status === 200) {
      let loginUser: any = await this.auth.login(this.user.data.email, this.user.data.password);
      if(loginUser.status === 200){
        this.pockets = await this.getPocketsList();
        await this.store.setDataLocal('pockets', this.pockets);
        let pocket = this.pockets[0];
        this.store.setDataLocal('selected-pocket', pocket);
        await this.router.navigate(['/app/tabs/dashboard']);
        await this.loadingCtrl.dismiss();
        this.ctrlCssBlur = false;
      }
    } else {
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
    }
  }

  public validatePin(pinNumber): void {
    this.buttonDisabled = !utils.validatePinRegistry(pinNumber);
  }

  async getPocketsList() {
    return await this.axios.post('user-wallet/index',{currencyId: ''} , this.auth);
  }
}
