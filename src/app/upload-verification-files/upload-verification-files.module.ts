import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploadVerificationFilesPage } from './upload-verification-files.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [UploadVerificationFilesPage]
})
export class UploadVerificationFilesPageModule {}
