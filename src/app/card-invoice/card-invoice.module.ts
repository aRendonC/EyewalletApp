import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardInvoicePage } from './card-invoice.page';

// Components.
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CardInvoicePage
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
  declarations: [CardInvoicePage]
})
export class CardInvoicePageModule {}
