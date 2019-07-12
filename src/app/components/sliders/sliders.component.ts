import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../../verification-modal/verification-modal.page';
import {Storage} from '@ionic/storage';
import {enterAnimation} from '../../animations/enter';
import {leaveAnimation} from '../../animations/leave';
import { Chart } from 'chart.js';
import {AesJsService} from '../../services/aesjs/aes-js.service';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})

export class SlidersComponent implements OnInit {
  @Input() name: any;
  public lineChart: any;
  public dataGraphic: any;
  public contentDataGrapic: any;
  public profile: any = null
  @Input() transactions: any;

  @ViewChild('lineCanvas') lineCanvas;

  nameSlider: string;
  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private store: Storage,
    private aesjs: AesJsService
  ) {

  }


  async ngOnInit() {
      this.profile = await this.store.get('profile')
      this.profile = this.aesjs.decrypt(this.profile)
      console.log(this.profile)
      console.log('se incio')
      this.nameSlider = this.name;
      console.table(this.name)
      this.dataGraphic = this.name[0];
      await this.grafica();
  }

  async grafica(){
    console.log('datos para graficar', this.dataGraphic.graphic)
    const ctx = this.lineCanvas.nativeElement.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(0, 150, 30, 0);
    gradientStroke.addColorStop(1, '#84EAE8');
    gradientStroke.addColorStop(0, 'white');
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', ''],
          datasets: [
              {
            label: '',
            data:  this.dataGraphic.graphic,
            backgroundColor: gradientStroke,
            borderColor: '#7DDC97',
            borderWidth: 4,
            pointRadius: 0,
          }
          //   {
          //     label: '',
          //     fill: false,
          //     lineTension: 0.1,
          //     backgroundColor: gradientStroke,
          //     borderColor: '#7DDC97',
          //     borderCapStyle: 'butt',
          //     borderDash: [],
          //     borderDashOffset: 0.0,
          //     borderJoinStyle: 'miter',
          //     pointBorderColor: 'rgba(75,192,192,1)',
          //     pointBackgroundColor: '#fff',
          //     pointBorderWidth: 1,
          //     pointHoverRadius: 5,
          //     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          //     pointHoverBorderColor: 'rgba(220,220,220,1)',
          //     pointHoverBorderWidth: 2,
          //     pointRadius: 0,
          //     borderWidth: 4,
          //     pointHitRadius: 10,
          //     data: this.dataGraphic.graphic,
          //     spanGaps: false,
          //   }
          ]
        },
        // options: {
        //   legend: {
        //     display: false
        //   },
        //   scales: {
        //     xAxes: [{
        //       gridLines: {
        //         drawBorder: false,
        //         display: false
        //       }
        //     }],
        //     yAxes: [{
        //       ticks: {
        //         beginAtZero: true,
        //         display: false
        //       },
        //       gridLines: {
        //         drawBorder: false,
        //         display: false
        //       }
        //     }]
        //   }
        // }
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
              gridLines:{
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
            duration: 7000,
          },
          hover: {
            animationDuration: 3000
          },
          responsiveAnimationDuration: 5000
        }
      });
  }

    async openModalVerification() {
      const modalVerification = await this.modalCtrl.create({
        component: VerificationModalPage,
        enterAnimation,
        leaveAnimation
      });
      modalVerification.onDidDismiss().then(async (profile:any)=> {
        console.error('se está cerrando el modal con este dato', profile)
        if(profile.data != undefined) {
          console.log(profile);
          this.profile.level = profile.level
        }
      });
      return await modalVerification.present()
    }
}
