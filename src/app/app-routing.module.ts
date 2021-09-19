import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/@vb/components/Guard/auth.guard'
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'

// layouts & notfound
import { LayoutAuthComponent } from 'src/app/layouts/Auth/auth.component'
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component'

// pages
// VB:REPLACE-START:ROUTER-IMPORTS
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { PayslipsComponent } from './pages/payslips/payslips.component'
import { UserComponent } from './pages/user/user.component'
import { HomeComponent } from './components/home/home.component'
import { MyComponentsModule } from './components/my-components.module'

// VB:REPLACE-END:ROUTER-IMPORTS

const routes: Routes = [
  {
    path: '',
    // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
    component: DashboardComponent,
    data: { title: 'Home' },
    pathMatch: 'full',
  },
  {
    path: 'home',
    // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      // VB:REPLACE-START:ROUTER-CONFIG
      {
        path: 'dashboard',

        data: { title: 'Dashboard' },
        component: DashboardComponent,
      },
      {
        path: 'payslips',
        data: { title: 'Payslips' },
        component: PayslipsComponent,
      },
      {
        path: 'user',
        data: { title: 'Users' },
        component: UserComponent,
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
    WidgetsComponentsModule,
    MyComponentsModule,
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardComponent,
    PayslipsComponent,
    UserComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
