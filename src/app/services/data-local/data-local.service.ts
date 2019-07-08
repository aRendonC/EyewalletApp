// Dependencies.
import { Injectable } from '@angular/core';

// Storage.
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class DataLocalService {
  constructor(
    private storage: Storage
  ) { }

  public setDataLocal(key: string, value: any): void {
    this.storage.set(key, value);
  }

  public async getDataLocal(key: string) {
    const dataLocal = await this.storage.get(key);
    return dataLocal;
  }
}
