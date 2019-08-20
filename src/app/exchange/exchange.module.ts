import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ExchangePage} from './exchange.page';
import {ComponentsModule} from "../components/components.module";

import { RoundNumberPipe } from "../../app/pipes/round-number/round-number.pipe"

const routes: Routes = [
    {
        path: '',
        component: ExchangePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [ExchangePage]
})
export class ExchangePageModule {
}
