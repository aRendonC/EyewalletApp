import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

/*
  Generated class for the LocalCameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(public camera: Camera) {
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  getPhoto(options?: CameraOptions) {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    return new Promise((resolve, reject) => {
      this.camera.getPicture(this.options)
        .then(value => {
          // tslint:disable-next-line:triple-equals
          if (this.options.destinationType == this.camera.DestinationType.DATA_URL) {
            resolve(value);
          } else {
            resolve(value);
          }
        })
        .catch(err => reject(err));
    });
  }

  getPhotoDirectory(options?: CameraOptions) {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    return new Promise((resolve, reject) => {
      this.camera.getPicture(this.options)
        .then(value => {
          // tslint:disable-next-line:triple-equals
          if (this.options.destinationType == this.camera.DestinationType.DATA_URL) {
            resolve(value);
          } else {
            resolve(value);
          }
        })
        .catch(err => reject(err));
    });
  }
}
