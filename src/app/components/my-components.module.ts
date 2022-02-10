import { ErrorHandler, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
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
import { UploadComponent } from './upload/upload.component';
import { QuestionsListComponent } from './questions-list/questions-list.component'
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { QuestionsDetailsComponent } from './questions-details/questions-details.component';
import { AnswersComponent } from './answers/answers.component';
import { QuestionAskComponent } from './question-ask/question-ask.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { CountsComponent } from './counts/counts.component';
import { CreteTutorialComponent } from './tutorial/crete-tutorial/crete-tutorial.component';
import { ViewTutorialsComponent } from './tutorial/view-tutorials/view-tutorials.component';
import { ViewTutorialDetailsComponent } from './tutorial/view-tutorial-details/view-tutorial-details.component';
import { ViewMyTutorialDetailsComponent } from './tutorial/view-my-tutorial-details/view-my-tutorial-details.component';
import { RelatedTutorialsComponent } from './tutorial/related-tutorials/related-tutorials.component';
import { SearchTutorialsComponent } from './tutorial/search-tutorials/search-tutorials.component';
import { SideWidgetComponent } from './socialmedia/side-widget/side-widget.component';
import { CommentsWidgetTutorialsComponent } from './widgets/comments-widget-tutorials/comments-widget-tutorials.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ReservedenquiryPipe } from './pipes/reservedenquiry.pipe';
import { MyQuestionsComponent } from './questions/my-questions/my-questions.component';
import { MyTutorialsComponent } from './tutorials/my-tutorials/my-tutorials.component';
import { AllSubjectsComponent } from './subjects/all-subjects/all-subjects.component';
import { WithdrawComponent } from './bank/teacher/withdraw/withdraw.component';
import { AccountComponent } from './bank/student/account/account.component'
import { NzRateModule } from 'ng-zorro-antd/rate';
const COMPONENTS = [
  FieldNgSelect,
  FieldQuillType,
  FormlyFieldFile,FileValueAccessor,
  HeaderComponent, FooterComponent, HomeComponent, FaqComponent,
  ContactComponent, PrivacyComponent, TermsComponent, FeedbackComponent,
  AboutComponent, CareersComponent, AdvertsComponent, InviteComponent,
  PricingPlansComponent, AskQuestionComponent, ProfileComponent, UploadComponent

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
    NzRateModule,
    QuillModule,
  ],
  providers:[{provide: ErrorHandler, useClass: MyErrorHandler}],
  declarations: [...COMPONENTS, SettingsComponent, RichtestPipe, QuestionsListComponent,DateAgoPipe, QuestionsDetailsComponent, AnswersComponent, QuestionAskComponent, QuestionAnswerComponent, CountsComponent, CreteTutorialComponent, ViewTutorialsComponent, ViewTutorialDetailsComponent, ViewMyTutorialDetailsComponent, RelatedTutorialsComponent, SearchTutorialsComponent, SideWidgetComponent, CommentsWidgetTutorialsComponent, LoadingScreenComponent, ReservedenquiryPipe, MyQuestionsComponent, MyTutorialsComponent, AllSubjectsComponent, WithdrawComponent, AccountComponent ],
  exports: [...COMPONENTS, HeaderComponent, FooterComponent, HomeComponent],
})
export class MyComponentsModule {}
