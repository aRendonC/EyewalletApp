import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../../verification-modal/verification-modal.page';
import {enterAnimation} from '../../animations/enter';
import {leaveAnimation} from '../../animations/leave';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})
export class SlidersComponent implements OnInit{
  @Input() name: any;

  public lineChart: any;
  public dataGraphic: any;
  public contentDataGrapic: any;

  @ViewChild('lineCanvas') lineCanvas;

  nameSlider: string;
  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
  ) {}

  async ngOnInit() {
      console.log('se incio')
    this.nameSlider = this.name;
    this.dataGraphic = this.name[0];
    setTimeout(() => {
    let ctx = this.lineCanvas.nativeElement.getContext('2d');
    let gradientStroke = ctx.createLinearGradient(0, 150, 30, 0);
    gradientStroke.addColorStop(1, '#84EAE8');
    gradientStroke.addColorStop(0, 'white');
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ['', '', '', '', '', '', '', '', '', ''],
          datasets: [{
              label: '',
              data:  this.dataGraphic.graphic,
              backgroundColor: gradientStroke,
              borderColor: '#7DDC97',
              borderWidth: 4,
              pointRadius: 0,
          },
                    ]
      },
      options: {
        legend: {
            display: false
        },
        scales: {
          xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
          },
              gridLines: {
                drawBorder: false,
                display: false
              }
          }]
      }
      }
  });
}, 1000);
}

  async openModalVerification() {
    const modal = await this.modalCtrl.create({
      component: VerificationModalPage,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    })
    return await modal.present()
  }

}
