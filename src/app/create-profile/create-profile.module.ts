import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CreateProfilePage} from './create-profile.page';
import {ComponentsModule} from "../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: CreateProfilePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
    declarations: [CreateProfilePage]
})
export class CreateProfilePageModule {
}
