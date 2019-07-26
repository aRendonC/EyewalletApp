import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UploadFilesModalPage} from "../upload-files-modal/upload-files-modal.page";

import * as constants from '../constanst/index'
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-verification-files',
  templateUrl: './upload-verification-files.page.html',
  styleUrls: ['./upload-verification-files.page.scss'],
})
export class UploadVerificationFilesPage implements OnInit {
  constants = constants;
  public validations = [
    {value: 0, text: 'Pasaporte'},
    {value: 1, text: 'Identificación Nacional'},
    {value: 2, text: 'Tarjeta de residencia'},
    {value: 3, text: 'Permiso de conducir'},
];
  constructor(
      private ctrlModal: ModalController,
      private router: Router
  ) { }

  ngOnInit() {
  }

  async openModal(value) {
    const modalUploadFiles = await this.ctrlModal.create({
      component: UploadFilesModalPage,
      componentProps: {
        documentList: value
      }
    });
    await modalUploadFiles.present();
  }
}
