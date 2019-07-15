import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploadVerificationFilesPage } from './upload-verification-files.page';
import {ComponentsModule} from "../components/components.module";
import {UploadFilesModalPage} from "../upload-files-modal/upload-files-modal.page";

const routes: Routes = [
  {
    path: '',
    component: UploadVerificationFilesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      ComponentsModule
  ],
  declarations: [UploadVerificationFilesPage, UploadFilesModalPage],
  entryComponents: [
      UploadFilesModalPage
  ]
})
export class UploadVerificationFilesPageModule {}
