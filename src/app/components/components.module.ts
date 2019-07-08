import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlidersComponent} from './sliders/sliders.component';
import {IonicModule} from '@ionic/angular';
//components
import {ChartComponent} from './chart/chart.component';
import {PocketComponent} from "./pocket/pocket.component";
import {ListPocketsPage} from "../list-pockets/list-pockets.page";
import {BalanceComponent} from "./balance/balance.component";

//constants components export
const COMPONENTS = [
    ChartComponent,
	PocketComponent,
  SlidersComponent,
  BalanceComponent
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
