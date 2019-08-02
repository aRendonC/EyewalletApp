import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage';
import {AesJsService} from "../aesjs/aes-js.service";

@Injectable({
    providedIn: 'root'
})

export class DataLocalService {
    constructor(
        private storage: Storage,
        private aesjs: AesJsService
    ) {
    }

    public setDataLocal(key: string, value: any): void {
        this.storage.set(key, this.aesjs.encrypt(value));
    }

    public async getDataLocal(key: string) {
        let dataLocal = await this.storage.get(key);
        dataLocal ? dataLocal = this.aesjs.decrypt(dataLocal) : dataLocal = null
        return dataLocal
    }

    public async clearStore() {
        return await this.storage.clear()
    }
}
