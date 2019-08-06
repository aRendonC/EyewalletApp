import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RequestCreditCardPage} from './request-credit-card.page';
import {ComponentsModule} from '../components/components.module';
// Modal.
import {ModalInvoicePage} from '../modal-invoice/modal-invoice.page';
import {ModalInvoicePageModule} from '../modal-invoice/modal-invoice.module';
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: RequestCreditCardPage
    }
];

@NgModule({
    entryComponents: [
        ModalInvoicePage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        ModalInvoicePageModule,
        TranslateModule
    ],
    declarations: [
        RequestCreditCardPage
    ]
})

export class RequestCreditCardPageModule {
}
