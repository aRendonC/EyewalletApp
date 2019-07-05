import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: './home/home.module#HomePageModule'},
  {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule'},
  {path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  {path: 'registry', loadChildren: './registry/registry.module#RegistryPageModule'},
  {path: 'registry-pin', loadChildren: './registry-pin/registry-pin.module#RegistryPinPageModule'},
  {path: 'restore', loadChildren: './restore/restore.module#RestorePageModule'},
  {path: 'pin', loadChildren: './pin/pin.module#PinPageModule'},
  { path: 'list-pockets', loadChildren: './list-pockets/list-pockets.module#ListPocketsPageModule' }
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
