import { Component, OnInit } from '@angular/core';
import {AxiosService} from "../services/axios/axios.service";
import {DeviceService} from "../services/device/device.service";
import * as CONSTANTS from "../constanst";
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {Storage} from "@ionic/storage";

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
  //   pin: null,
  //   userId: null,
  //   device: {
  //     uuid: null
  //   }
  // }
  constructor(
      private axios: AxiosService,
      private device: DeviceService,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private store: Storage
  ) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.info(params)
      this.user = JSON.parse(params.user);
      console.table('usuario datos pasados', this.user)
      this.auth.usuario.accessToken = this.user.accessToken
    });
    this.bodyForm = new FormGroup({
      pin: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.maxLength(6)
      ])),
      device: new FormControl(''),
      userId: new FormControl('')
    })
  }

  async registerPin(data: any) {
    console.info(this.user)
    this.devic = await this.device.getDataDevice();
    this.devic.firstName ='';
    this.devic.lastName =
    this.devic.email = this.user.data.email;
    this.devic.phone = this.user.data.phone;
    this.devic.country ='';
    this.devic.city ='';
    this.devic.state ='';
    this.devic.twoFactor ='';
    this.devic.status ='';
    console.info(this.bodyForm);
    console.info(data);
    console.info(this.devic);
    this.bodyForm.value.device = this.devic;
    this.bodyForm.value.userId = this.user.data.id;
    console.log(this.bodyForm)
    // console.log(this.body)
    let response = await this.axios.put('profile/1/pin', this.bodyForm.value, this.auth)
    console.log(response)
    if(response.status === 200) {
      this.router.navigate(['app/tabs'])
      this.store.set('user', this.user.data)
    }
  }
}
