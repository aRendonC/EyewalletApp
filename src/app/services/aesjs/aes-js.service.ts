import {Injectable} from '@angular/core';

import * as AesJs from 'aes-js';

@Injectable({
  providedIn: 'root'
})
export class AesJsService {
  private SECRET_DATA_TOKEN = [145, 201, 214, 208, 30, 76, 16, 177, 233, 99, 191, 12, 239, 181,
    51, 19, 176, 223, 2, 251, 117, 224, 30, 77, 17, 233, 120, 210, 45, 70, 180, 150,]
  constructor(private aesjs: AesJs) { }

  decriptData(crypt: any) {
    return new Promise((resolve) => {
      const encryptedBytes = this.aesjs.utils.hex.toBytes(crypt)
      const aesCtr = new this.aesjs.ModeOfOperation.ctr(this.SECRET_DATA_TOKEN, new this.aesjs.Counter(5))
      const decryptedBytes = aesCtr.decrypt(encryptedBytes)
      resolve(this.aesjs.utils.utf8.fromBytes(decryptedBytes))
    })

  }
}
