import {Injectable} from '@angular/core';

import * as aesjs from 'aes-js';
const key = [145, 201, 214, 208, 30, 76, 16, 177, 233, 99, 191, 12, 239, 181,
  51, 19, 176, 223, 2, 251, 117, 224, 30, 77, 17, 233, 120, 210, 45, 70, 180, 150,]
@Injectable({
  providedIn: 'root'
})
export class AesJsService {

  // decriptData(crypt: any) {
  //   return new Promise((resolve) => {
  //     const encryptedBytes = this.aesjs.utils.hex.toBytes(crypt)
  //     const aesCtr = new this.aesjs.ModeOfOperation.ctr(this.SECRET_DATA_TOKEN, new this.aesjs.Counter(5))
  //     const decryptedBytes = aesCtr.decrypt(encryptedBytes)
  //     resolve(this.aesjs.utils.utf8.fromBytes(decryptedBytes))
  //   })
  // }

  encriptar(texto) {
    const textBytes = aesjs.utils.utf8.toBytes(texto);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  desencriptar(texto) {
    const encryptedBytes = aesjs.utils.hex.toBytes(texto);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }
}
