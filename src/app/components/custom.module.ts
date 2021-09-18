import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { MyLoginComponent } from './Auth/login/login.component'
import { SharedModule } from '../shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardHeaderTabbedComponent } from './tabbedHeader/card-header-tabbed-6.component'
import { PayslipList8Component } from './lists/8/8.component'
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PayslipComponent } from './templates/payslip/payslip.component';
import { RemoveZerosPipe } from './pipe/remove-zeros.pipe';
import { MonthsyearPipe } from './pipe/monthsyear.pipe';
import { TransposeminusPipe } from './pipe/transposeminus.pipe'
import { FormlyModule } from '@ngx-formly/core'
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd'
import { NgxPrintModule } from 'ngx-print'
import { FooterComponent } from './Footer/footer.component'
import { TopbarComponent } from './Topbar/topbar.component'
import { BreadcrumbsComponent } from './Breadcrumbs/breadcrumbs.component'
import { MenuClassicTopComponent } from './MenuClassic/MenuTop/menu-top.component'
import { MenuClassicLeftComponent } from './MenuClassic/MenuLeft/menu-left.component'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzAlertModule } from 'ng-zorro-antd/alert'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'


const COMPONENTS = [
  MyLoginComponent,
  CardHeaderTabbedComponent,
  PayslipList8Component,
  FooterComponent,
  BreadcrumbsComponent,
  MenuClassicTopComponent,
  MenuClassicLeftComponent
]
const MODULES = [CommonModule,FormsModule, ReactiveFormsModule,
  RouterModule,SharedModule, TranslateModule, NzTypographyModule,
  FormlyNgZorroAntdModule,NgxPrintModule]

@NgModule({
  imports: [...MODULES, FormlyModule.forRoot(), PerfectScrollbarModule, NzRadioModule, NzAlertModule, NzSkeletonModule, NzToolTipModule],
  declarations: [...COMPONENTS, PayslipComponent, RemoveZerosPipe, MonthsyearPipe, TransposeminusPipe],
  exports: [...MODULES, MyLoginComponent, CardHeaderTabbedComponent, BreadcrumbsComponent, FooterComponent, MenuClassicLeftComponent, MenuClassicTopComponent],
})
export class CustomModule {}
