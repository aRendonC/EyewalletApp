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
        children: [
          {
            path: 'dashboard',
          loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
          }
        ]
      },
      {
        path: 'create-profile',
        children: [
          {
            path:'',
            loadChildren: '../create-profile/create-profile.module#CreateProfilePageModule'
          },
        ]
      },
      {
        path: 'address',
        children: [
          {
            path: '',
            loadChildren: '../address/address.module#AddressPageModule'
          }
        ]
      },
      {
        path: 'receive-funds',
        children: [
          {
            path: '',
            loadChildren: '../receive-funds/receive-funds.module#ReceiveFundsPageModule'
          }
        ]
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
