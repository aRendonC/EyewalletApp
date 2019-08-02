import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {IonSlides, ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../../verification-modal/verification-modal.page';
import {enterAnimation} from '../../animations/enter';
import {leaveAnimation} from '../../animations/leave';
import {Chart} from 'chart.js';
import {AxiosService} from "../../services/axios/axios.service";
import {AuthService} from "../../services/auth/auth.service";
import {filter} from "rxjs/operators";
import {ToastService} from "../../services/toast/toast.service";
import {DataLocalService} from "../../services/data-local/data-local.service";


@Component({
    selector: 'app-sliders',
    templateUrl: './sliders.component.html',
    styleUrls: ['./sliders.component.scss'],
})

export class SlidersComponent implements OnInit {
    @Input() name: any;
    public lineChart: any;
    public dataGraphic: any;
    public profile: any = null;
    @Input() transactions: any;
    @Output() changeCryptoPocket = new EventEmitter<[]>();
    @ViewChild('sliderHeader') sliderHeader: IonSlides;
    @ViewChild('sliderContent') sliderContent: IonSlides;
    slideOptsName = {
        spaceBetween: 1,
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 3,
    };
    slideOpts = {
        initialSlide: 0,
        slidesPerView: 1,
        loopedSlides: 5,
    };
    labelGrapich = [];


    @ViewChild('lineCanvas') lineCanvas;

    nameSlider: string;

    constructor(
        private route: ActivatedRoute,
        private modalCtrl: ModalController,
        private store: DataLocalService,
        private router: Router,
        private http: AxiosService,
        private auth: AuthService,
        private toastCtrl: ToastService
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((route: NavigationStart) => {
            this.getProfileStore()
        });
    }


    async ngOnInit() {
        let userVerifications: any = await this.http.get('user-verification/status', this.auth, null);
        userVerifications = userVerifications.data;
        await this.store.setDataLocal('userVerification', userVerifications);
        this.profile = await this.store.getDataLocal('profile');
        this.profile.completed = userVerifications.completed;
        await this.setProfileStore();
        this.nameSlider = this.name;
        this.dataGraphic = this.name[0];
        await this.grafica();
    }

    async getProfileStore() {
        this.profile = await this.store.getDataLocal('profile');
    }

    async setProfileStore() {
        await this.store.setDataLocal('profile', this.profile)
    }

    public async grafica() {
        this.labelGrapich = [];
        for (let i = 0; i <= this.dataGraphic.graphic.length - 1; i++) {
            this.labelGrapich.push('')
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

    async openModalVerification() {
        const modalVerification = await this.modalCtrl.create({
            component: VerificationModalPage,
            enterAnimation,
            leaveAnimation
        });
        modalVerification.onDidDismiss().then(async (profile: any) => {
            if (profile.data != undefined) {
                this.profile.level = profile.level;
                this.profile.completed = profile.completed
            }
        });
        return await modalVerification.present()
    }

    async verificationPage() {
        await this.router.navigate(['/upload-verification-files']);
    }

    async changeSliderHeader(sliderContent) {
        let activeSliderContent = await sliderContent.getActiveIndex();
        await this.sliderHeader.slideTo(activeSliderContent, 200);
    }

    async changeSliderContent(sliderHeader) {
        let activeIndexHeader = await sliderHeader.getActiveIndex();
        await this.sliderContent.slideTo(activeIndexHeader, 200);
        await this.toastCtrl.presentToast({text: 'Sus datos se están cargando, por favor espere', duration: 1000});
        this.changeCryptoPocket.emit(this.name[activeIndexHeader]);
    }
}
