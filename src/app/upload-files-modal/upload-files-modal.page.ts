import {Component, Input, OnInit} from '@angular/core';
import {CameraProvider} from "../services/camera/camera";
import {AlertController, ModalController} from "@ionic/angular";
import {Camera} from '@ionic-native/camera/ngx';
import {Router} from "@angular/router";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import { AuthService } from "../services/auth/auth.service";

@Component({
    selector: 'app-upload-files-modal',
    templateUrl: './upload-files-modal.page.html',
    styleUrls: ['./upload-files-modal.page.scss'],
})
export class UploadFilesModalPage implements OnInit {
    public profile = null;
    ctrlSelfie: boolean = true;
    ctrlDocument: boolean = false;
    ctrlDocumentBack: boolean = false;
    ctrlDocumentAddress: boolean = false;
    userVerification = {};
    @Input() documentList = 0;
    // type address, identification, identification2, photo
    public type: string = 'photo';

    constructor(
        private camera: Camera,
        private cameraProvider: CameraProvider,
        private toastCtrl: ToastService,
        private alertCtrl: AlertController,
        private router: Router,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingService,
        protected store: Storage,
        protected aesjs: AesJsService,
        private auth: AuthService
    ) {
    }

    async ngOnInit() {
        this.profile = await this.store.get('profile');
        this.profile = this.aesjs.decrypt(this.profile)
    }

    async takePhoto() {
        const alert = await this.alertCtrl.create({
            buttons: [
                {
                    text: 'Tomar foto',
                    handler: async () => {
                        let takePhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.CAMERA);
                        if (takePhoto) {
                            await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
                            if (this.ctrlSelfie) {
                                await this.opdateSelfie(takePhoto)
                            } else {
                                if (this.ctrlDocument) {
                                    await this.opdateDocument(takePhoto)
                                } else {
                                    if (this.ctrlDocumentBack) {
                                        await this.opdateDocumentBack(takePhoto)
                                    } else {
                                        if (this.ctrlDocumentAddress) {
                                            await this.updateAddress(takePhoto)
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    text: 'Seleccione foto',
                    handler: async () => {
                        let selectPhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
                        if (selectPhoto) {
                            await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
                            if (this.ctrlSelfie) {
                                await this.opdateSelfie(selectPhoto)
                            } else {
                                if (this.ctrlDocument) {
                                    await this.opdateDocument(selectPhoto)
                                } else {
                                    if (this.ctrlDocumentBack) {
                                        await this.opdateDocumentBack(selectPhoto)
                                    } else {
                                        if (this.ctrlDocumentAddress) {
                                            await this.updateAddress(selectPhoto)
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    text: 'cancelar',
                    role: 'cancel',
                }
            ]
        });
        await alert.present();
    }

    async opdateSelfie(photo) {
        let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
        console.log('respuesta de las fotos', responsePhoto);
        if (responsePhoto.status === 200) {
            this.profile.completed = responsePhoto.verification.completed;
            let profileVerification = this.aesjs.encrypt(this.profile);
            await this.store.set('profile', profileVerification);
            await this.setStorageVerification(responsePhoto.verification);
            await this.loadingCtrl.dismiss();
            this.ctrlSelfie = false;
            this.ctrlDocument = true;
            await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
        } else {
            await this.loadingCtrl.dismiss();
            await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
        }
    }

    async opdateDocument(photo) {
        this.type = 'identification';
        let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
        console.log('respuesta de las fotos', responsePhoto);
        if (responsePhoto.status === 200) {
            this.profile.completed = responsePhoto.verification.completed;
            let profileVerification = this.aesjs.encrypt(this.profile);
            await this.store.set('profile', profileVerification);
            await this.setStorageVerification(responsePhoto.verification);
            await this.loadingCtrl.dismiss();
            this.ctrlDocument = false;
            this.ctrlDocumentBack = true;
            await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
        } else {
            await this.loadingCtrl.dismiss();
            await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
        }
    }

    async opdateDocumentBack(photo) {
        this.type = 'identification2';
        let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
        console.log('respuesta de las fotos', responsePhoto);
        if (responsePhoto.status === 200) {
            this.profile.completed = responsePhoto.verification.completed;
            let profileVerification = this.aesjs.encrypt(this.profile);
            await this.store.set('profile', profileVerification);
            await this.setStorageVerification(responsePhoto.verification);
            await this.loadingCtrl.dismiss();
            this.ctrlDocumentBack = false;
            this.ctrlDocumentAddress = true;
            await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
        } else {
            await this.loadingCtrl.dismiss();
            await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
        }
    }

    async updateAddress(photo) {
        this.type = 'address';
        let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
        console.log('respuesta de las fotos', responsePhoto);
        if (responsePhoto.status === 200) {
            this.profile.completed = responsePhoto.verification.completed;
            let profileVerification = this.aesjs.encrypt(this.profile);
            await this.store.set('profile', profileVerification);
            await this.setStorageVerification(responsePhoto.verification);
            await this.loadingCtrl.dismiss();
            this.ctrlDocumentAddress = false;
            await this.toastCtrl.presentToast({text: 'Todos sus documentos han sido cargados correctamente'});
            await this.closeModal();
            await this.toastCtrl.presentToast({ text: 'Se cerrara su sesión para validar los documentos' });
            await this.auth.logout();
            await this.router.navigate(['/app/tabs/dashboard'])

        } else {
            await this.loadingCtrl.dismiss();
            await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
        }
    }

    async closeModal() {
        await this.modalCtrl.dismiss()
    }

    async setStorageVerification(userVerification) {
        this.userVerification = userVerification;
        const dataEncrypt = this.aesjs.encrypt(this.userVerification);
        await this.store.set('userVerification', dataEncrypt)
    }
}
