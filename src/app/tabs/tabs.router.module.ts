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
    	path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path:'create-profile',
        loadChildren: '../create-profile/create-profile.module#CreateProfilePageModule'
      },
      {
        path: 'address',
        loadChildren: '../address/address.module#AddressPageModule'
      },
      {
        path: 'receive-funds',
        loadChildren: '../receive-funds/receive-funds.module#ReceiveFundsPageModule'
      },
      {
        path: 'send-currency',
        loadChildren: '../send-cryptocurrencies/send-cryptocurrencies.module#SendCryptocurrenciesPageModule'
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TabsPageRoutingModule { }
