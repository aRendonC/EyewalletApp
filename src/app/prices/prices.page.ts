import { Component, OnInit } from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {
  private user: any;
  public bodyForm: any;
  public cryptoPrices: any;
  public Holas: any;
  constructor(
    private axios: AxiosService,
    private auth: AuthService,
    private store: Storage,
    protected aesjs: AesJsService,
  ) { }
  async ngOnInit() {
    this.user = await this.store.get('profile');
    this.user = this.aesjs.decrypt(this.user);
    this.bodyForm = {
      userId: this.user.userId,
    };
    this.cryptoPrices = await this.axios.post('transaction/priceBTC', this.bodyForm, this.auth);
    this.cryptoPrices = this.cryptoPrices.data.descripcion;
    this.cryptoPrices = JSON.parse(this.cryptoPrices);
    console.log(this.cryptoPrices);
  }

}
