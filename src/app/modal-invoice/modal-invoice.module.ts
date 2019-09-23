import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ModalInvoicePage} from './modal-invoice.page';
import {TranslateModule} from "@ngx-translate/core";
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        ComponentsModule
    ],
    declarations: [ModalInvoicePage]
})

export class ModalInvoicePageModule {}
