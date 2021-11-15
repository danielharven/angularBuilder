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
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { EmployeeComponent } from './pages/employee/employee.component'
import { PayslipsComponent } from './pages/payslips/payslips.component'
import { UserComponent } from './pages/user/user.component'
import { CustomModule } from './components/custom.module'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzAlertModule } from 'ng-zorro-antd/alert'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { FormlyModule } from '@ngx-formly/core'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'

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
        path: 'dashboard/:token',
        data: { title: 'Dashboard' },
        component: DashboardComponent,
      },
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
      {
        path: 'employee',
        data: { title: 'Employee' },
        component: EmployeeComponent,
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
    NzSkeletonModule,
    NzAlertModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzModalModule,
    NzPopoverModule,
    FormlyModule,
    NzDividerModule,
    NzSwitchModule,
    NzAvatarModule,
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardComponent,
    PayslipsComponent,
    UserComponent,
    EmployeeComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
