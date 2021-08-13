import { ErrorHandler, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
// import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'
// import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd'
import { FormlyModule } from '@ngx-formly/core'
import { FieldNgSelect } from './formly/quill/ng-select'
import { FieldQuillType } from './formly/quill/quil-type'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { QuillModule } from 'ngx-quill'
import { FileValueAccessor } from './formly/file-accessor'
import { FormlyFieldFile } from './formly/file-component'
import { NgSelectModule } from '@ng-select/ng-select'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { AdvertsComponent } from './adverts/adverts.component';
import { InviteComponent } from './invite/invite.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';
import { AskQuestionComponent } from './ask-question/ask-question.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileComponent } from './profile/profile.component'
import {MyErrorHandler} from '../services/MyErrorHandler';
import { SettingsComponent } from './profile/settings/settings.component'
import {NzPipesModule} from "ng-zorro-antd/pipes";
import { RichtestPipe } from './pipes/richtest.pipe';
const COMPONENTS = [
  FieldNgSelect,
  FieldQuillType,
  FormlyFieldFile,FileValueAccessor,
  HeaderComponent, FooterComponent, HomeComponent, FaqComponent,
  ContactComponent, PrivacyComponent, TermsComponent, FeedbackComponent,
  AboutComponent, CareersComponent, AdvertsComponent, InviteComponent,
  PricingPlansComponent, AskQuestionComponent, ProfileComponent

]

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        QuillModule,
        HttpClientModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        FormlyModule,
        FormlyBootstrapModule,
        FormlySelectModule,
        NgSelectModule,
        NgxSpinnerModule,
        NzPipesModule,
    ],
  providers:[{provide: ErrorHandler, useClass: MyErrorHandler}],
  declarations: [...COMPONENTS, SettingsComponent, RichtestPipe, ],
  exports: [...COMPONENTS, HeaderComponent, FooterComponent, HomeComponent],
})
export class MyComponentsModule {}
