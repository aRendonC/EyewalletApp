import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PinPage} from './pin.page';
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: PinPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
    declarations: [PinPage]
})
export class PinPageModule {
}
