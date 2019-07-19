import {Component, Input, OnInit} from '@angular/core';
import {CameraProvider} from "../services/camera/camera";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {Camera} from '@ionic-native/camera/ngx';
import {Router} from "@angular/router";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";

@Component({
  selector: 'app-upload-files-modal',
  templateUrl: './upload-files-modal.page.html',
  styleUrls: ['./upload-files-modal.page.scss'],
})
export class UploadFilesModalPage implements OnInit {
  ctrlSelfie: boolean = true;
  ctrlDocument: boolean = false;
  ctrlDocumentBack: boolean = false;
  ctrlDocumentAddress: boolean = false;
  @Input() documentList = 0 ;
  // type address, identification, identification2, photo
  public type: string = 'photo';
  constructor(
      private camera: Camera,
      private cameraProvider: CameraProvider,
      private toastCtrl: ToastService,
      private alertCtrl: AlertController,
      private router: Router,
      private modalCtrl: ModalController,
      private loadingCtrl: LoadingService
  ) { }

  ngOnInit() {
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
                if(this.ctrlSelfie){
                  await this.opdateSelfie(takePhoto)
                } else {
                  if(this.ctrlDocument){
                    await this.opdateDocument(takePhoto)
                  } else {
                    if(this.ctrlDocumentBack){
                      await this.opdateDocumentBack(takePhoto)
                    } else {
                      if(this.ctrlDocumentAddress){
                       await this.opdateAddress(takePhoto)
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
                let responsePhoto: any = await this.cameraProvider.sendPhoto(selectPhoto, this.type, true);
                console.log('respuesta foto enviada', responsePhoto);
                if(responsePhoto.status === 200) {
                  await this.loadingCtrl.dismiss();
                  await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
                  this.ctrlSelfie = false;
                  if(this.ctrlDocumentAddress) {
                    await this.toastCtrl.presentToast({text: 'Todos sus documentos han sido cargados correctamente'});
                    await this.closeModal();
                    await this.router.navigate(['/app/tabs/dashboard'])
                  } else {
                    if(!this.ctrlDocument) {
                      this.ctrlDocument = true;
                      this.type = 'identification'
                    } else {
                      if(!this.ctrlDocumentBack) {
                        this.type = 'identification2';
                        this.ctrlDocumentBack = true
                      }else {
                        this.type = 'address';
                        this.ctrlDocumentAddress = true;
                        this.ctrlDocument = false;
                      }
                    }
                  }
                } else {
                  await this.loadingCtrl.dismiss();
                  await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
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

  // async presentToast(text) {
  //   const toast = await this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //   });
  //   await toast.present();
  // }

  async opdateSelfie(photo){
    let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
    console.log('respuesta de las fotos', responsePhoto);
    if(responsePhoto.status === 200){
      await this.loadingCtrl.dismiss();
      this.ctrlSelfie = false;
      this.ctrlDocument = true;
      await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
    }  else {
      await this.loadingCtrl.dismiss();
      await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
    }
  }

  async opdateDocument(photo){
    this.type = 'identification';
    let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
    console.log('respuesta de las fotos', responsePhoto);
    if(responsePhoto.status === 200){
      await this.loadingCtrl.dismiss();
      this.ctrlDocument = false;
      this.ctrlDocumentBack = true;
      await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
    }  else {
      await this.loadingCtrl.dismiss();
      await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
    }
  }

  async opdateDocumentBack(photo){
    this.type = 'identification2';
    let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
    console.log('respuesta de las fotos', responsePhoto);
    if(responsePhoto.status === 200){
      await this.loadingCtrl.dismiss();
      this.ctrlDocumentBack = false;
      this.ctrlDocumentAddress = true;
      await this.toastCtrl.presentToast({text: 'Documento cargado correctamente, por favor toque la pantalla para continuar'});
    }  else {
      await this.loadingCtrl.dismiss();
      await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
    }
  }

  async opdateAddress(photo){
    this.type = 'address';
    let responsePhoto: any = await this.cameraProvider.sendPhoto(photo, this.type, true);
    console.log('respuesta de las fotos', responsePhoto);
    if(responsePhoto.status === 200){
      await this.loadingCtrl.dismiss();
      this.ctrlDocumentAddress = false;
      await this.toastCtrl.presentToast({text: 'Todos sus documentos han sido cargados correctamente'});
      await this.closeModal();
      await this.router.navigate(['/app/tabs/dashboard'])
    }  else {
      await this.loadingCtrl.dismiss();
      await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss()
  }
}
