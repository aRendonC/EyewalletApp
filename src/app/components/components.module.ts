import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlidersComponent} from './sliders/sliders.component';
import {IonicModule} from '@ionic/angular';
import {ChartComponent} from './chart/chart.component';
import {PocketComponent} from "./pocket/pocket.component";
import {ListPocketsPage} from "../list-pockets/list-pockets.page";
import {ReturnPageComponent} from './return-page/return-page.component';
import {TranslateModule} from "@ngx-translate/core";
import { PinComponent } from "./pin/pin.component";

//constants components export
const COMPONENTS = [
    ChartComponent,
    PocketComponent,
    SlidersComponent,
    ReturnPageComponent,
    PinComponent
];

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
        TranslateModule
    ],
    exports: [COMPONENTS]
})
export class ComponentsModule {
}
