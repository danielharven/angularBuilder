import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd'
import { FormlyModule } from '@ngx-formly/core'
import { FieldNgSelect } from './formly/quill/ng-select'
import { FieldQuillType } from './formly/quill/quil-type'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { QuillModule } from 'ngx-quill'
import { FileValueAccessor } from './formly/file-accessor'
import { FormlyFieldFile } from './formly/file-component'
import { NgSelectModule } from '@ng-select/ng-select'
import { HttpClientModule } from '@angular/common/http'
import { NavComponent } from './nav/nav.component'
import { FooterComponent } from './Footer/footer.component';
import { HomeComponent } from './home/home.component'
import { ComponentsModule } from '../@vb/components/components.module'

const COMPONENTS = [
  FieldNgSelect,
  FieldQuillType,
  FormlyFieldFile,
  FileValueAccessor,
  NavComponent,
  FooterComponent,
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
  declarations: [...COMPONENTS, HomeComponent],
  exports: [...COMPONENTS],
})
export class MyComponentsModule {}
