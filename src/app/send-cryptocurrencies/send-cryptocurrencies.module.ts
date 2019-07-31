import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SendCryptocurrenciesPage} from './send-cryptocurrencies.page';
import {ComponentsModule} from "../components/components.module";
import {QRScannerService} from "../services/QRScanner/qrscanner.service";
import {QRScanner} from "@ionic-native/qr-scanner/ngx";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: SendCryptocurrenciesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        TranslateModule
    ],
    declarations: [SendCryptocurrenciesPage],
    providers: [
        QRScannerService,
        QRScanner
    ]
})
export class SendCryptocurrenciesPageModule {
}
