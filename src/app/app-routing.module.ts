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
import { LkmComponent } from './pages/lkm/lkm.component'
import { LkmInterviewsComponent } from './pages/lkm/interviews/interviews.component'
import { LkmMystoriesComponent } from './pages/lkm/mystories/mystories.component'
import { LkmSocComponent } from './pages/lkm/soc/soc.component'
import { MgfComponent } from './pages/mgf/mgf.component'
import { MeComponent } from './pages/me/me.component'
import { CbbComponent } from './pages/cbb/cbb.component'
import { MarketComponent } from './pages/market/market.component'
import { ReportsComponent } from './pages/reports/reports.component'
import { UserComponent } from './pages/user/user.component'

// VB:REPLACE-END:ROUTER-IMPORTS

const routes: Routes = [
  {
    path: '',
    // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      // VB:REPLACE-START:ROUTER-CONFIG
      {
        path: 'dashboard',
        data: { title: 'Dashboards' },
        component: DashboardComponent,
      },
      {
        path: 'lkm',
        data: { title: 'L&K Management' },
        component: LkmComponent,
      },
      {
        path: 'lkm/interviews',
        data: { title: 'Interview Guide' },
        component: LkmInterviewsComponent,
      },
      {
        path: 'lkm/mystories',
        data: { title: 'My Stories' },
        component: LkmMystoriesComponent,
      },
      {
        path: 'lkm/soc',
        data: { title: 'Stories of Change' },
        component: LkmSocComponent,
      },
      {
        path: 'mgf',
        data: { title: 'Matching Grant Facility' },
        component: MgfComponent,
      },
      {
        path: 'me',
        data: { title: 'Monitoring and Evaluation' },
        component: MeComponent,
      },
      {
        path: 'cbb',
        data: { title: 'Capacity Building' },
        component: CbbComponent,
      },
      {
        path: 'market',
        data: { title: 'Market Data' },
        component: MarketComponent,
      },
      {
        path: 'reports',
        data: { title: 'Reports' },
        component: ReportsComponent,
      },
      {
        path: 'user',
        data: { title: 'User Administration' },
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
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardComponent,
    LkmComponent,
    LkmInterviewsComponent,
    LkmMystoriesComponent,
    LkmSocComponent,
    MgfComponent,
    MeComponent,
    CbbComponent,
    MarketComponent,
    ReportsComponent,
    UserComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
