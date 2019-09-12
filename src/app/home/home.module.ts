import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {ComponentsModule} from '../components/components.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
      TranslateModule
  ],
  declarations: [
    HomePage
  ]
})

export class HomePageModule {}

