import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart/chart.component';
import {SlidersComponent} from './sliders/sliders.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    ChartComponent,
    SlidersComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ChartComponent,SlidersComponent]
})
export class ComponentsModule {
}
