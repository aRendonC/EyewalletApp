import {Component, Input, OnInit} from '@angular/core';
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
  @Input()transactions: any;
  public bodyForm: any;
  public userId: any;
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
    private aesjs: AesJsService,

  ) { }

  async getPocketsList() {
    this.pockets = await this.store.get('pockets');
    this.pockets = this.aesjs.decrypt(this.pockets)
  }

  async ngOnInit() {
    this.user = await this.store.get('profile');
    this.user = this.aesjs.decrypt(this.user);
    await this.getPocketsList();
    const userId = this.user.data.userId;
    const type = 0;
    const wallet_id = this.pockets[0].id;
    const movement = null;
    const limit = 50;
    this.bodyForm = {userId, type, wallet_id, movement, limit};
    this.transactions = await this.axios.post('transaction/index', this.bodyForm, this.aut);
    // Saca la data del objeto de transacciones
    console.log('estas son mis transacciones desde el componente balacne', this.transactions)
    const btc = this.transactions.btc;
    this.transactions = this.transactions.data;
    this.transactions.forEach(element => {
      //
      const amountFinal = element.amount_finally;
      const amountDollar = (amountFinal * btc).toFixed(2);
      // extrae la hora de cada objeto
      console.log('estos son llas iteraciones de transaccion', this.transactions)
      const time = element.date_transaction.slice(11, 16);
      const dateFormat = `${element.date_transaction.slice(8, 10)}.${element.date_transaction.slice(5, 7)}.${element.date_transaction.slice(2, 4)}`;
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
    console.log('estas son mis transacciones', this.transactions);
  }
}
