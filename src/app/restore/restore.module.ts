import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RestorePage} from './restore.page';
import {ComponentsModule} from '../components/components.module';
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: RestorePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        TranslateModule
    ],
    declarations: [RestorePage]
})
export class RestorePageModule {
}
