import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './home/home.module#HomePageModule'},
  {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule'},
  {path: 'registry', loadChildren: './registry/registry.module#RegistryPageModule'},
  {path: 'registry-pin', loadChildren: './registry-pin/registry-pin.module#RegistryPinPageModule'},
  {path: 'restore', loadChildren: './restore/restore.module#RestorePageModule'},
  {path: 'pin', loadChildren: './pin/pin.module#PinPageModule'},
  {path: 'list-pockets', loadChildren: './list-pockets/list-pockets.module#ListPocketsPageModule' },
  {path: 'create-profile', loadChildren: './create-profile/create-profile.module#CreateProfilePageModule'},
  {path: 'address', loadChildren: './address/address.module#AddressPageModule'},
  {path: 'receive-funds', loadChildren: './receive-funds/receive-funds.module#ReceiveFundsPageModule'},
  {path: 'send-currency', loadChildren: './send-cryptocurrencies/send-cryptocurrencies.module#SendCryptocurrenciesPageModule'},
  { path: 'upload-verification-files', loadChildren: './upload-verification-files/upload-verification-files.module#UploadVerificationFilesPageModule' },
  { path: 'upload-files-modal', loadChildren: './upload-files-modal/upload-files-modal.module#UploadFilesModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
