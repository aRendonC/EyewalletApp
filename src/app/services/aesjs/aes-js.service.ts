
import {Injectable} from '@angular/core';
import * as aesjs from 'aes-js';

@Injectable({
  providedIn: 'root'
})

export class AesJsService {
  private key: number[] = [
    145,
    201,
    214,
    208,
    30,
    76,
    16,
    177,
    233,
    99,
    191,
    12,
    239,
    181,
    51,
    19,
    176,
    223,
    2,
    251,
    117,
    224,
    30,
    77,
    17,
    233,
    120,
    210,
    45,
    70,
    180,
    150,
  ];

  public encrypt(text): any {
    text = JSON.stringify(text);
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  public decrypt(text):any {
    const encryptedBytes = aesjs.utils.hex.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return JSON.parse(aesjs.utils.utf8.fromBytes(decryptedBytes));
  }

  public encryptNoJson(text): any {
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  public decryptNoJson(text):any {
    const encryptedBytes = aesjs.utils.hex.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }
}
