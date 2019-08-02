import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VaultListPage } from './vault-list.page';
import { ComponentsModule } from '../components/components.module';
import { PipeModule } from '../pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: VaultListPage
  }
];

@NgModule({
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipeModule,
    TranslateModule
  ],
  declarations: [VaultListPage]
})
export class VaultListPageModule {}
