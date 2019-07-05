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
        children: [
          {
            path: '',
          loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
        { 
          path: 'create-profile', 
          children: [
            {
            path:'',
          loadChildren: './create-profile/create-profile.module#CreateProfilePageModule'
        },
          ]
      },
        { 
          path: 'address', 
          children: [
            {
            path: '',
            loadChildren: './address/address.module#AddressPageModule'
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
export class TabsPageRoutingModule {
}
