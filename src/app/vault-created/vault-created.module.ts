import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VaultCreatedPage } from './vault-created.page';
import { ComponentsModule } from '../components/components.module';

// Modal.
import { ModalResponseStatusPage } from '../modal-response-status/modal-response-status.page';
import { ModalResponseStatusPageModule } from '../modal-response-status/modal-response-status.module';

const routes: Routes = [
  {
    path: '',
    component: VaultCreatedPage
  }
];

@NgModule({
  entryComponents: [
    ModalResponseStatusPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalResponseStatusPageModule
  ],
  declarations: [VaultCreatedPage]
})
export class VaultCreatedPageModule {}
