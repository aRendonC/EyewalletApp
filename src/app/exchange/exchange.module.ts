import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ExchangePage} from './exchange.page';
import {ComponentsModule} from "../components/components.module";
import { PipeModule } from '../pipes/pipe.module';

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
        ComponentsModule,
        PipeModule
    ],
    declarations: [ExchangePage]
})
export class ExchangePageModule {
}
