import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'prices',
        loadChildren: '../prices/prices.module#PricesPageModule'
      },
      {
        path: 'request-credit-card',
        loadChildren: '../request-credit-card/request-credit-card.module#RequestCreditCardPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TabsPageRoutingModule { }
