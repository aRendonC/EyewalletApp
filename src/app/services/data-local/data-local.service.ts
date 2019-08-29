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
        console.log("1SET:", key);
        this.storage.set(key, this.aesjs.encrypt(value));
        console.log("SET_KEY: ",key, "SET_VALUE: ",value);
    }

    public async getDataLocal(key: string) {
        let dataLocal = await this.storage.get(key);
        dataLocal ? dataLocal = this.aesjs.decrypt(dataLocal) : dataLocal = null;
        console.log("GET_KEY: ", key, "GET_VALUE: ", dataLocal);
        return dataLocal
    }

    public async clearStore() {
        return await this.storage.clear()
    }

    public async removeKey(key: string) {
        return await this.storage.remove(key)
    }

    public async getKeys(){
        return await this.storage.keys()
    }
}
