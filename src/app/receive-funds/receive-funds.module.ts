import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ReceiveFundsPage} from './receive-funds.page';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {ComponentsModule} from '../components/components.module';
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: ReceiveFundsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgxQRCodeModule,
        ComponentsModule,
        TranslateModule
    ],
    declarations: [ReceiveFundsPage]
})

export class ReceiveFundsPageModule {
}
