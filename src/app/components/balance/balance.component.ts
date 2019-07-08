import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AxiosService } from '../../services/axios/axios.service';
import {AuthService} from '../../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../../services/aesjs/aes-js.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  public bodyForm: any;
  public userId: any;
  public transactions: any;
  public transaction: any;
  private headers: HttpHeaders;
  private user: any;
  public prueba: any;
  public pockets;
  constructor(
    private http: HttpClient,
    private aut: AuthService,
    private store: Storage,
    private axios: AxiosService,
    private aes: AesJsService,

  ) { }

  async getPocketsList() {
    this.pockets = await this.axios.get('user-wallet/index', this.aut, null);
  }

  async ngOnInit() {
    this.user = await this.store.get('profile');
    this.user = JSON.parse(this.aes.decrypt(this.user));
    await this.getPocketsList();
    const userId = this.user.data.userId;
    const type = 0;
    const wallet_id = this.pockets[0].id;
    const movement = null;
    const limit = 50;
    this.bodyForm = {userId, type, wallet_id, movement, limit};
    this.transactions = await this.axios.post('transaction/index', this.bodyForm, this.aut);
    // Saca la data del objeto de transacciones
    const btc = this.transactions.btc;
    this.transactions = this.transactions.data;
    this.transactions.forEach(element => {
      //
      const amountFinal = element.amount_finally;
      const amountDollar = (amountFinal * btc).toFixed(2);
      // extrae la hora de cada objeto
      const time = element.date.slice(11, 16);
      const dateFormat = `${element.date.slice(8, 10)}.${element.date.slice(5, 7)}.${element.date.slice(2, 4)}`;
      if (element.confirmation >= 0 && element.confirmation <= 2) {
        const confirmationText = 'Confirmando';
        // Agregar el elemento confirmationText al objeto transactions
        Object.assign(element, {confirmationText});
      } else {
        const confirmationText = 'Confirmado';
        // Agregar el elemento confirmationText al objeto transactions
        Object.assign(element, {confirmationText});
      }
      if (element.type === 1) {
        const plusMinus = '-';
        const typeIcon = '../../assets/img/balanceComponent/sent-icon.svg';
        // Agregar el elemento typeIcon y plusMinus al objeto transactions
        Object.assign(element, {typeIcon});
        Object.assign(element, {plusMinus});
      } else if (element.type === 0) {
        const typeIcon = '../../assets/img/balanceComponent/receive-icon.svg';
        const plusMinus = '+';
        // Agregar el elemento typeIcon y plusMinus al objeto transactions
        Object.assign(element, {typeIcon});
        Object.assign(element, {plusMinus});
      }
      // Agregar el elemento time al objeto transactions
      Object.assign(element, {time});
      // Agregar el elemento dateFormat al objeto transactions
      Object.assign(element, {dateFormat});
      // Agregar el elemento amountDollar al objeto transactions
      Object.assign(element, {amountDollar});
    });
  }
}
