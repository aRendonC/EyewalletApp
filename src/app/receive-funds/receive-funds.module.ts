// Dependencies.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReceiveFundsPage } from './receive-funds.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ReceiveFundsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
    ComponentsModule
  ],
  declarations: [ReceiveFundsPage]
})

export class ReceiveFundsPageModule {}
