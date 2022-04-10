import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared.module';
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module';
import { FooterComponent } from './common/Footer/footer.component';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { PricesTableComponent } from './market/prices/prices-table/prices-table.component';
import { ViewPriceComponent } from './market/prices/prices-view-price/prices-view-price.component';
import { PricesFormComponent } from './market/prices/prices-form/prices-form.component';

import { AppAttendanceMainTableComponent } from './faabs/attendance/attendance-main-table/3.component';
import { FaabsAttendanceSheetComponent } from './faabs/attendance/register-attendance-form/faabs-attendance-sheet.component';
import { ViewPastRegistrationFormComponent } from './faabs/attendance/attendance-main-table/view-past-registration-form/view-past-registration-form.component';


import { DashboardHeadComponent } from './dashboard/dashboard-head/dashboard-head.component';
import { DashboardHeadItemComponent } from './dashboard/dashboard-head-item/dashboard-head-item.component';
import { CbTopicsTableComponent } from './faabs/topics/cbb-topics-table/cbb-topics-table.component';

import { AppFarmerTableDetailComponent } from './farmer-registration/farmer-table/farmer-table-detail/farmer-table-detail.component';
import { AppFarmerTableComponent } from './farmer-registration/farmer-table/farmer-table.component';
import { AppFarmerRegistrationFormComponent } from './farmer-registration/farmer-registration-form/farmer-registration-form.component';
import { MapComponent } from './map/map.component';
import { FaabsTabComponent } from './faabs/faabs-tab/faabs-tab.component';
import { FaabsAttendanceModalComponent } from './faabs/faabs-attendance-modal/faabs-attendance-modal.component';

import { UserProfileFormComponent } from './user/user-profile-form/user-profile-form.component'
import { UserProfileCardComponent } from './user/user-profile-card/user-profile-card.component'

import { HeaderTabbedComponent } from './common/headers/card-header-tabbed.component';

const COMPONENTS = [
    // Common
    FooterComponent,
    HeaderTabbedComponent,

    // Market Management
    PricesTableComponent,
    ViewPriceComponent,
    PricesFormComponent,

    AppAttendanceMainTableComponent,
    FaabsAttendanceSheetComponent,

    DashboardHeadComponent,
    DashboardHeadItemComponent,

    CbTopicsTableComponent,

    MapComponent,

    AppFarmerTableComponent,
    AppFarmerTableDetailComponent,
    AppFarmerRegistrationFormComponent,
    FaabsTabComponent,
    FaabsAttendanceModalComponent,

    UserProfileFormComponent,
    UserProfileCardComponent,
];

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        WidgetsComponentsModule,
        FormlyNgZorroAntdModule,
        FormlyModule.forRoot({
            validationMessages: [{ name: 'required', message: 'This field is required' }],
        }),
        FormlySelectModule,
        NgSelectModule,
    ],
    declarations: [...COMPONENTS, ViewPastRegistrationFormComponent, DashboardHeadComponent],
    exports: [...COMPONENTS, DashboardHeadComponent],
})
export class MyComponentsModule {}
