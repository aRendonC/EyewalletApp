import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
//components
import {ChartComponent} from './chart/chart.component';
import {PocketComponent} from "./pocket/pocket.component";
import {ListPocketsPage} from "../list-pockets/list-pockets.page";

//constants components export
const COMPONENTS = [
    ChartComponent,
    PocketComponent
]
@NgModule({
  declarations: [
    COMPONENTS,
      ListPocketsPage
  ],
    entryComponents: [
      ListPocketsPage
    ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [COMPONENTS]
})
export class ComponentsModule {
}
