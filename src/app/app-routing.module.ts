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
import { BusinessComponent } from './pages/business/business.component'
import { BusinessUploadsComponent } from './pages/business/uploads/uploads.component'
import { BusinessDataComponent } from './pages/business/data/data.component'
import { AdminComponent } from './pages/admin/admin.component'
import { AdminUsersComponent } from './pages/admin/users/users.component'
import { AdminReviewsComponent } from './pages/admin/reviews/reviews.component'
import { AdminAuditComponent } from './pages/admin/audit/audit.component'
import { MycomponentsModule } from './components/mycomponents.module'
import { NzImageModule } from 'ng-zorro-antd/image'

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
        path: 'business',
        data: { title: 'Business' },
        component: BusinessComponent,
      },
      {
        path: 'business/uploads',
        data: { title: 'Uploads' },
        component: BusinessUploadsComponent,
      },
      {
        path: 'business/data',
        data: { title: 'Data Entry' },
        component: BusinessDataComponent,
      },
      {
        path: 'admin',
        data: { title: 'Admin' },
        component: AdminComponent,
      },
      {
        path: 'admin/users',
        data: { title: 'Users' },
        component: AdminUsersComponent,
      },
      {
        path: 'admin/reviews',
        data: { title: 'Review' },
        component: AdminReviewsComponent,
      },
      {
        path: 'admin/audit',
        data: { title: 'Audit Trail' },
        component: AdminAuditComponent,
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
    MycomponentsModule,
    NzImageModule,
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardComponent,
    BusinessComponent,
    BusinessUploadsComponent,
    BusinessDataComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminReviewsComponent,
    AdminAuditComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
