import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PinModalRegistryPage } from './pin-modal-registry.page';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PinModalRegistryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations:[
    
  ]
})

export class PinModalRegistryPageModule {}
