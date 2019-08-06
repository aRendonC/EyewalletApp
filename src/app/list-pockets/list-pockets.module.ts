import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ListPocketsPage} from './list-pockets.page';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../components/components.module";

const routes: Routes = [
    {
        path: '',
        component: ListPocketsPage
    }
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ComponentsModule
    ],

})
export class ListPocketsPageModule {
}
