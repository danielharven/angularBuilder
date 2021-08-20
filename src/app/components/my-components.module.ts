import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'
import { FooterComponent } from './common/Footer/footer.component'
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd'
import { FormlyModule } from '@ngx-formly/core'
import { FieldNgSelect } from './common/QuillRichTextEditor/ng-select'
import { FieldQuillType } from './common/QuillRichTextEditor/quil-type'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { QuillModule } from 'ngx-quill'
import { FileValueAccessor } from './common/FormlyUploadField/file-accessor'
import { FormlyFieldFile } from './common/FormlyUploadField/file-component'
import { NgSelectModule } from '@ng-select/ng-select'
import { HttpClientModule } from '@angular/common/http'
import { PortalCardComponent } from './dashboard/dashboard-cards/portal-card.component'
import { PortalCardSearchComponent } from './dashboard/dashboard-card-search/portal-card-search.component'
import { LoginFormComponent } from './login-form/login-form.component'
const COMPONENTS = [
  FooterComponent,
  FieldNgSelect,
  FieldQuillType,
  FormlyFieldFile,
  FileValueAccessor,
  PortalCardComponent,
  PortalCardSearchComponent,
  LoginFormComponent
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    QuillModule,
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
  declarations: [...COMPONENTS,],
  exports: [...COMPONENTS,],
})
export class MyComponentsModule {}
