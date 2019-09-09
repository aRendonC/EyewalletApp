import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { QRScanner } from "@ionic-native/qr-scanner/ngx";

import {IonicModule} from '@ionic/angular';

import {ProfilePage} from './profile.page';
import {ComponentsModule} from "../components/components.module";
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
      ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [
    ProfilePage,
  ],
  providers: [
    QRScanner
  ]
})
export class ProfilePageModule {}
