import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VaultListPage } from './vault-list.page';
import { ComponentsModule } from '../components/components.module';
import { PipeModule } from '../pipes/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: VaultListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipeModule
  ],
  declarations: [VaultListPage]
})
export class VaultListPageModule {}
