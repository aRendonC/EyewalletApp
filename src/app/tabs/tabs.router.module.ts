import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
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
      },
      {
        path: 'card-invoice',
        loadChildren: '../card-invoice/card-invoice.module#CardInvoicePageModule'
      },
      {
        path: 'vault',
        loadChildren: '../vault/vault.module#VaultPageModule'
      },
      {
        path: 'vault-created',
        loadChildren: '../vault-created/vault-created.module#VaultCreatedPageModule'
      }
    ]
  },
  {
    path: 'dashboard',
    redirectTo: '/tabs/dashboard',
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
