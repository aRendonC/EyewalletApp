import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {TouchLoginService} from "../fingerprint/touch-login.service";
import {AxiosService} from "../axios/axios.service";
import {AuthService} from "../auth/auth.service";

/*
  Generated class for the LocalCameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {
  options: CameraOptions;
  constructor(
      public camera: Camera,
      private touchCtrl: TouchLoginService,
      private http: AxiosService,
      private auth: AuthService
  ) {
  }


  async getPhoto(sourceType) {
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: false,
      targetWidth: 250,
      targetHeight: 250,
      sourceType: sourceType,
    };


      return await this.camera.getPicture(options)
  }

  sendPhoto(data64, type, sendPath: boolean) {
    let path;
    if(sendPath) {
      path = 'file/uploadFileVerification'
    } else {
      path = 'file/uploadFileAvatar'
    }
     return new Promise(resolve => {
       this.http.post(path,
           { file: data64, type: type },
           this.auth
       ).then(async (data) => {
         this.touchCtrl.isTouch = true;
         // this.auth.user_Info.url_img = data;
         resolve(data)
       }).catch((e) => {
         resolve(e);
         this.touchCtrl.isTouch = true;
       });
     })
  }

}
