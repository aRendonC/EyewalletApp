import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UploadFilesModalPage} from "../upload-files-modal/upload-files-modal.page";

import * as constants from '../constanst/index'
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-upload-verification-files',
  templateUrl: './upload-verification-files.page.html',
  styleUrls: ['./upload-verification-files.page.scss'],
})
export class UploadVerificationFilesPage implements OnInit {
  constants = constants;
  public validations = [];
  constructor(
      private ctrlModal: ModalController,
      private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.validations = [
      {value: 0, text: this.translateService.instant('UPLOAD_FILES_MODAL.Passport')},
      {value: 1, text: this.translateService.instant('UPLOAD_FILES_MODAL.IdentificationNational')},
      {value: 2, text: this.translateService.instant('UPLOAD_FILES_MODAL.ResidentTarget')},
      {value: 3, text: this.translateService.instant('UPLOAD_FILES_MODAL.DriverPass')},
    ];
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
