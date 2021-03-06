import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QrscannSesionPage } from './qrscann-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: QrscannSesionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QrscannSesionPage]
})

export class QrscannSesionPageModule {}
