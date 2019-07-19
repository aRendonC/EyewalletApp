import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {isArray} from 'util';
import {formatDate} from '@angular/common';
import {AxiosService} from '../../services/axios/axios.service';
import {AuthService} from '../../services/auth/auth.service';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})

export class ChartComponent implements OnInit {
  @Input() name: any;
  @Input() limit: any;

  dataTransaction: any = [];
  dataCryptos = [];
  lineChart: any;

  array1 = [65, 59, 80, 81, 56, 55, 40];
  array2 = ['1','2','3','4','5','7'];
  @ViewChild('lineCanvas') lineCanvas;

  constructor(
    private axios: AxiosService,
    private auth: AuthService,
    public http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.loadInformation(this.name);
  }


  public async loadInformation(label) {
     /*this.axios.get('general/historial').then(async (data) => {
      this.dataTransaction = await data;
      this.getData(label);
    }).catch((error) => {
      console.log(error);
    });
   this.axios.post('general/obtener-precios', null, this.auth)
      .then(async (data) => {
        if (isArray(data)) {
          this.dataCryptos = await data;
          this.getData(label);
        }
      }).catch((error) => {
      console.log(error);
    });*/

 /*   await this.http.post('https://gmmclub.com:3001/general/historial', {
    content: 'hello',
    submittedBy: 'Josh'
}).subscribe((data) => {
  console.log(data);
  this.dataTransaction = data;
    this.getData(label);
});*/

await this.http.get('https://gmmclub.com:3001/general/historial').subscribe((data) => {
this.dataTransaction = data;
  this.getData(label);
});


  }

  /*
      Esta función retorna la data de la grafica. recibe un label que puede ser: transaction - cryptos
   */
  public async getData(label) {

    const labelTemporal = [];
    const dataTemporal = [];
    const format = 'dd-MM';
    const locale = 'en-US';
    if (label == 'crypto') {
      this.dataCryptos.forEach((item: any, index) => {
      // console.log(item);
        if (index <= this.limit) {
          const formattedDate = formatDate(item.fecha, format, locale);
          labelTemporal.push(formattedDate);
          dataTemporal.push(item.valor);
        }
      });
      // return await this.proccessData(label, labelTemporal, dataTemporal);
    } else if (label == 'transaction') {

      this.dataTransaction.forEach((item: any, index) => {
        const value = JSON.parse(item.descripcion);
        if (index <= this.limit) {
          // const formattedDate = formatDate(item.fecha, format, locale);
          // labelTemporal.push(formattedDate);
          labelTemporal.push(value.BTC.USD);
          dataTemporal.push(value.BTC.USD);
        }
      });
      return await this.proccessData(label, this.array2, this.array1);
    } else {
      console.log('label incorrectos');
    }
  }


  private async proccessData(titulo, label, data) {
   console.log(data);
    this.lineChart = await new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        // labels: label,
        datasets: [
          {
            label: titulo,
            backgroundColor: 'linear-gradient(to right, rgba(255,0,0,0) , rgba(255,0,0,1))',
            borderColor: 'green',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#000',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            data,
            spanGaps: false,
          }
        ]
      }
    });
    return this.lineChart;
  }
}
