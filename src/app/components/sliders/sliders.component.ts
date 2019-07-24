import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../../verification-modal/verification-modal.page';
import {Storage} from '@ionic/storage';
import {enterAnimation} from '../../animations/enter';
import {leaveAnimation} from '../../animations/leave';
import { Chart } from 'chart.js';
import {AesJsService} from '../../services/aesjs/aes-js.service';
import {IonSlides} from "@ionic/angular";
import {AxiosService} from "../../services/axios/axios.service";
import {AuthService} from "../../services/auth/auth.service";
import {filter} from "rxjs/operators";


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
  public profile: any = null;
  @Input() transactions: any;
  @ViewChild('slideWithNav') slideWithNav: IonSlides;
  @ViewChild('slideWithNav2') slideWithNav2: IonSlides;
  public pager: boolean = false;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 1000,
    loop: false,
  };
  slideOptsName = {
    spaceBetween: 1,
    initialSlide: 0,
    slidesPerView: 3,
    speed: 1000,
    loop: true,
    centeredSlides: true,
    effect: 'coverflow',
  };
  labelGrapich = [];


  @ViewChild('lineCanvas') lineCanvas;

  nameSlider: string;
  constructor(
      private route: ActivatedRoute,
      private modalCtrl: ModalController,
      private store: Storage,
      private aesjs: AesJsService,
      private router: Router,
      private http: AxiosService,
      private auth: AuthService
  ) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
    ).subscribe((route: NavigationStart) => {
      console.log('Route: '+route.url)
      this.getProfileStore()
    });
  }


  async ngOnInit() {
    let userVerifications: any = await this.http.get('user-verification/status', this.auth, null);
    console.log(userVerifications)
    userVerifications = userVerifications.data
    const dataEncrypt = this.aesjs.encrypt(userVerifications);
    await this.store.set('userVerification', dataEncrypt)
    this.profile = await this.store.get('profile');
    this.profile = this.aesjs.decrypt(this.profile);
    this.profile.completed = userVerifications.completed
    await this.setProfileStore()
    console.log('profile del usuario',this.profile)
    this.nameSlider = this.name;
    this.dataGraphic = this.name[0];
    await this.grafica();
  }

  async getProfileStore(){
    this.profile = await this.store.get('profile');
    this.profile = this.aesjs.decrypt(this.profile);
    console.log('perfil componente slider', this.profile)
  }

  async setProfileStore(){
    let profile = this.aesjs.encrypt(this.profile)
    await this.store.set('profile', profile)
  }

  async grafica(){
    this.labelGrapich = [];
    for(let i = 0; i <= this.dataGraphic.graphic.length -1; i++){
      this.labelGrapich.push('')
    }
    if (this.name.length > 1) {
      this.pager = true;
      this.slideOpts.loop = true
    }
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
            data:  this.dataGraphic.graphic,
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
      console.error('se está cerrando el modal con este dato', profile);
      if(profile.data != undefined) {
        this.profile.level = profile.level
        this.profile.completed = profile.completed

      }
    });
    return await modalVerification.present()
  }

  // Esta función envia a la verificación de documentos
  verificationPage() {
    this.router.navigate(['/upload-verification-files']);
  }
  async cambioDeSlider(slideView2) {
     await slideView2.slideNext()
    // this.checkIfNavDisabled(slideView);
  }
}
