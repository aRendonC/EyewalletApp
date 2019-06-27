import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart/chart.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ChartComponent]
})
export class ComponentsModule {
}
