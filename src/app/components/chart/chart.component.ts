import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {AxiosService} from '../../services/axios/axios.service';
import {AuthService} from '../../services/auth/auth.service';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';

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
    labelGrapich = [];
    public dataGraphic: any;
    nameSlider: string;
    @ViewChild('lineCanvas') lineCanvas;

    constructor(

    ) {
    }

    async ngOnInit() {
        // this.nameSlider = this.name;
        // this.dataGraphic = this.name[0];
        // await this.grafica()
        // console.log(this.name)
        // this.loadInformation(this.name);
    }


    // public async loadInformation(label) {
    //     /*this.axios.get('general/historial').then(async (data) => {
    //      this.dataTransaction = await data;
    //      this.getData(label);
    //    }).catch((error) => {
    //      console.log(error);
    //    });
    //   this.axios.post('general/obtener-precios', null, this.auth)
    //      .then(async (data) => {
    //        if (isArray(data)) {
    //          this.dataCryptos = await data;
    //          this.getData(label);
    //        }
    //      }).catch((error) => {
    //      console.log(error);
    //    });*/
    //
    //     /*   await this.http.post('https://gmmclub.com:3001/general/historial', {
    //        content: 'hello',
    //        submittedBy: 'Josh'
    //    }).subscribe((data) => {
    //      console.log(data);
    //      this.dataTransaction = data;
    //        this.getData(label);
    //    });*/
    //
    //     // await this.http.get('https://gmmclub.com:3001/general/historial').subscribe((data) => {
    //     //     this.dataTransaction = data;
    //     //     this.getData(label);
    //     // });
    //
    //
    // }

    /*
        Esta función retorna la data de la grafica. recibe un label que puede ser: transaction - cryptos
     */
    // public async getData(label) {
    //
    //     const labelTemporal = [];
    //     const dataTemporal = [];
    //     const format = 'dd-MM';
    //     const locale = 'en-US';
    //     if (label == 'crypto') {
    //         this.dataCryptos.forEach((item: any, index) => {
    //             // console.log(item);
    //             if (index <= this.limit) {
    //                 const formattedDate = formatDate(item.fecha, format, locale);
    //                 labelTemporal.push(formattedDate);
    //                 dataTemporal.push(item.valor);
    //             }
    //         });
    //         // return await this.proccessData(label, labelTemporal, dataTemporal);
    //     } else if (label == 'transaction') {
    //
    //         this.dataTransaction.forEach((item: any, index) => {
    //             const value = JSON.parse(item.descripcion);
    //             if (index <= this.limit) {
    //                 // const formattedDate = formatDate(item.fecha, format, locale);
    //                 // labelTemporal.push(formattedDate);
    //                 labelTemporal.push(value.BTC.USD);
    //                 dataTemporal.push(value.BTC.USD);
    //             }
    //         });
    //         return await this.proccessData(label, this.array2, this.array1);
    //     } else {
    //     }
    // }


    public async grafica() {
        this.labelGrapich = [];
        for (let i = 0; i <= this.dataGraphic.graphic.length - 1; i++) {
            this.labelGrapich.push('')
        }
        console.log(this.dataGraphic.graphic)
        const ctx = this.lineCanvas.nativeElement.getContext('2d');
        const gradientStroke = ctx.createLinearGradient(154.000, 0.000, 146.000, 300.000);
        gradientStroke.addColorStop(0.006, 'rgba(21, 233, 233, 1.000)');
        gradientStroke.addColorStop(0.416, 'rgba(61, 219, 163, 0)');
        gradientStroke.addColorStop(0.945, 'rgba(255, 255, 255, 0)');
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.labelGrapich,
                datasets: [
                    {
                        label: '',
                        data: this.dataGraphic.graphic,
                        backgroundColor: gradientStroke,
                        borderColor: '#15E9E9',
                        borderWidth: 4,
                        pointRadius: 0,
                    }
                ]
            },
            options: {
                legend: {
                    fullWidth: true,
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            beginAtZero: false,
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }]
                }, animation: {
                    duration: 800,
                },
                hover: {
                    animationDuration: 1000
                },
                responsiveAnimationDuration: 1000
            }
        });
    }
}
