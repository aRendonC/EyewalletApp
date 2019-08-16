import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {IonInfiniteScroll, IonSlides, ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../../verification-modal/verification-modal.page';
import {enterAnimation} from '../../animations/enter';
import {leaveAnimation} from '../../animations/leave';
import {Chart} from 'chart.js';
import {AxiosService} from "../../services/axios/axios.service";
import {AuthService} from "../../services/auth/auth.service";
import {filter} from "rxjs/operators";
import {ToastService} from "../../services/toast/toast.service";
import {DataLocalService} from "../../services/data-local/data-local.service";
import {LoadingService} from "../../services/loading/loading.service";
import {TranslateService} from "@ngx-translate/core";


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
    @Output() emitterTransactionRefresh = new EventEmitter<[]>();
    @ViewChild('sliderHeader') sliderHeader: IonSlides;
    @ViewChild('sliderContent') sliderContent: IonSlides;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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
        private toastCtrl: ToastService,
        private loadingCtrl: LoadingService,
        private translateService: TranslateService,
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

        if (this.dataGraphic.graphic.length === 1) {
            for (let i = 0; i <= 1; i++) {
                this.dataGraphic.graphic.unshift(0);
                this.labelGrapich.push('')
            }
        } else {
            for (let i = 0; i <= this.dataGraphic.graphic.length - 1; i++) {
                this.labelGrapich.push('')
            }
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
                },

                animation: {
                    duration: 800,
                },
                hover: {
                    animationDuration: 1000,
                    mode: 'index',
                    intersect: false
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
        await this.sliderContent.lockSwipes(true);
        await this.sliderHeader.lockSwipes( true);
        await this.toastCtrl.presentToast({text: this.translateService.instant('GENERAL.LoadingData'), duration: 1000});
        this.changeCryptoPocket.emit(this.name[activeIndexHeader]);
        setTimeout(async () => {
            await this.sliderContent.lockSwipes(false);
            await this.sliderHeader.lockSwipes(false);
        }, 2000)
    }


    loadData(event) {
        event.target.complete();
    }

    async refreshTransactions(pocketSelected): Promise<any> {
        await this.loadingCtrl.present({text: this.translateService.instant('VAULT.loading'), cssClass: 'textLoadingBlack'});
        let pocket = await this.store.getDataLocal('selected-pocket');
        console.log(pocket);
        let body = {
            userId: pocket.userId,
            type: 0,
            address: pocket.address,
            currencyShortName: pocket.currency.shortName
        };
        let dataResponse = await this.http.post('transaction/index', body, this.auth);
        if(dataResponse.status === 200) {
            dataResponse.pocket = pocket;
            this.emitterTransactionRefresh.emit(dataResponse)
        } else {
            await this.toastCtrl.presentToast({text: dataResponse.error.msg})
        }
        // let selectedPocket = pockets.find(pocket => pocket.label === pocketSelected.pocketName);
        // console.log(selectedPocket)
        // console.log(await this.store.getDataLocal('selected-pocket'))
    }

    async changeSlides(id: number) {
        await this.sliderContent.slideTo(id, 200);
        await this.sliderHeader.slideTo(id, 200);
    }

    static connectionDataSocket(data){
        console.log(data)
    }
}
