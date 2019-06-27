import {Injectable, OnInit, ViewChild} from '@angular/core';
import {TimerService} from '../../services/timer/timer.service';
import {AxiosService} from '../../services/axios/axios.service';
import {AuthService} from '../../services/auth/auth.service';
import {LoadingController} from '@ionic/angular';
import {Chart} from 'chart.js';
import {isArray} from 'util';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChartService implements OnInit {
  temporizador: any;
  dataTransaction: any = [];
  dataCryptos = [];
  lineChart: any;
  @ViewChild('lineCanvas') lineCanvas;

  constructor(private  timer: TimerService,
              private axios: AxiosService,
              private auth: AuthService,
              private  loadCtrl: LoadingController) {
    this.temporizador = timer.temporizador;
  }

  ngOnInit() {
  }

  public async loadInformation(label) {
    console.log('entra  a la funcion');
    this.axios.get('general/historial').then(async (data) => {
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
    if (label == 'cryptos') {
      this.dataCryptos.forEach((item: any, index) => {
        console.log(item);
        if (index <= 25) {
          const formattedDate = formatDate(item.fecha, format, locale);
          labelTemporal.push(formattedDate);
          dataTemporal.push(item.valor);
        }
      });
      // return await this.proccessData(label, labelTemporal, dataTemporal);
    } else if (label == 'transaction') {
      this.dataTransaction.forEach((item: any, index) => {
        const value = JSON.parse(item.descripcion);
        if (index <= 25) {
          // const formattedDate = formatDate(item.fecha, format, locale);
          // labelTemporal.push(formattedDate);
          labelTemporal.push(index);
          dataTemporal.push(value.BTC);
        }
      });
      return await this.proccessData(label, labelTemporal, dataTemporal);
    } else {
      console.log('label incorrectos');
    }
  }


  private async proccessData(titulo, label, data) {
    console.log(data);
    this.lineChart = await new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: titulo,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data,
            spanGaps: false,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
            }
          }]
        }, animation: {
          duration: 7000,
        },
        hover: {
          animationDuration: 3000
        },
        responsiveAnimationDuration: 5000
      }
    });
    return this.lineChart;
  }

}
