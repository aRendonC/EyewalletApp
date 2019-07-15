import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UploadFilesModalPage} from "../upload-files-modal/upload-files-modal.page";

import * as constants from '../constanst/index'
@Component({
  selector: 'app-upload-verification-files',
  templateUrl: './upload-verification-files.page.html',
  styleUrls: ['./upload-verification-files.page.scss'],
})
export class UploadVerificationFilesPage implements OnInit {
  constants = constants
  constructor(
      private ctrlModal: ModalController
  ) { }

  ngOnInit() {
  }
  async openModal() {
    const modalUploadFiles = await this.ctrlModal.create({
      component: UploadFilesModalPage
    })
    await modalUploadFiles.present()
  }
}
