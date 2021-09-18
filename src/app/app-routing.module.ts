import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/components/Guard/auth.guard'
// import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'


// layouts & notfound
import { LayoutAuthComponent } from 'src/app/layouts/Auth/auth.component'
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component'

// pages
// VB:REPLACE-START:ROUTER-IMPORTS
import { DashboardUserComponent } from './pages/dashboard/user/user.component'
import { DashbordHelpdeskDashboardComponent } from './pages/dashbord/helpdesk-dashboard/helpdesk-dashboard.component'
import { CustomModule } from './components/custom.module'

// VB:REPLACE-END:ROUTER-IMPORTS

const routes: Routes = [
  {
    path: '',
    // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
    redirectTo: 'dashboard/user',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      // VB:REPLACE-START:ROUTER-CONFIG
      {
        path: 'dashboard/user/:id',
        data: { title: 'User Dashboard' },
        component: DashboardUserComponent,
      },
      {
        path: 'dashboard/user',
        data: { title: 'User Dashboard' },
        component: DashboardUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashbord/helpdesk-dashboard',
        data: { title: 'Helpdesk Dashboard' },
        component: DashbordHelpdeskDashboardComponent,
        canActivate: [AuthGuard],
      },

      // VB:REPLACE-END:ROUTER-CONFIG
    ],
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/404',
  },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: AppPreloader,
      relativeLinkResolution: 'legacy',
    }),
    LayoutsModule,
    // WidgetsComponentsModule,
    CustomModule,
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardUserComponent,
    DashbordHelpdeskDashboardComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
