import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'registry', loadChildren: './registry/registry.module#RegistryPageModule' }
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
