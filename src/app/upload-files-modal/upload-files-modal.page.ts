import {Component, Input, OnInit} from '@angular/core';
import {CameraProvider} from "../services/camera/camera";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {Camera} from '@ionic-native/camera/ngx';
import {Router} from "@angular/router";
import {LoadingService} from "../services/loading/loading.service";

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
      private toastCtrl: ToastController,
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
              console.log(takePhoto);
              if (takePhoto) {
                await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
                let responsePhoto: any = await this.cameraProvider.sendPhoto(takePhoto, this.type);
                if(responsePhoto.status === 200) {
                  await this.loadingCtrl.dismiss();
                  await this.presentToast('Documento cargado correctamente, por favor toque la pantalla para continuar');
                  this.ctrlSelfie = false;
                  if(this.ctrlDocumentAddress) {
                    await this.presentToast('Todos sus documentos han sido cargados correctamente');
                    await this.closeModal();
                    await this.router.navigate(['/app/tabs'])
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
                        this.ctrlDocumentAddress = true
                        this.ctrlDocument = false;
                      }
                    }
                  }
                } else {
                  await this.presentToast(responsePhoto.error.msg)
                }
              }
              // if(takePhoto.status === 200) {
              //  await this.presentToast('Documento cargado correctamente')
              // } else {
              //   await this.presentToast(takePhoto.error.msg)
              // }
            }
          },
          {
            text: 'Seleccione foto',
            handler: async () => {
              let selectPhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
              if (selectPhoto) {
                let responsePhoto: any = await this.cameraProvider.sendPhoto(selectPhoto, this.type);
                if(responsePhoto.status === 200) {
                  await this.loadingCtrl.dismiss();
                  await this.presentToast('Documento cargado correctamente, por favor toque la pantalla para continuar');
                  this.ctrlSelfie = false;
                  if(this.ctrlDocumentAddress) {
                    await this.presentToast('Todos sus documentos han sido cargados correctamente');
                    await this.closeModal();
                    await this.router.navigate(['/app/tabs'])
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
                        this.ctrlDocumentAddress = true
                        this.ctrlDocument = false;
                      }
                    }
                  }
                } else {
                  await this.presentToast(responsePhoto.error.msg)
                }
              }
              // if(selectPhoto.status === 200) {
              //   await this.presentToast('Documento cargado correctamente')
              // } else {
              //   await this.presentToast(selectPhoto.error.msg)
              // }
              console.log(selectPhoto)
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

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    await toast.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss()
  }
}
