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
import { MyComponentsModule } from './components/my-components.module'
import { FaqComponent } from './components/faq/faq.component'
import { ContactComponent } from './components/contact/contact.component'
import { PrivacyComponent } from './components/privacy/privacy.component'
import { TermsComponent } from './components/terms/terms.component'
import { FeedbackComponent } from './components/feedback/feedback.component'
import { AboutComponent } from './components/about/about.component'
import { CareersComponent } from './components/careers/careers.component'
import { AdvertsComponent } from './components/adverts/adverts.component'
import { InviteComponent } from './components/invite/invite.component'
import { PricingPlansComponent } from './components/pricing-plans/pricing-plans.component'
import { AskQuestionComponent } from './components/ask-question/ask-question.component'

// VB:REPLACE-END:ROUTER-IMPORTS

const routes: Routes = [
  {
    path: '',
    // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      // VB:REPLACE-START:ROUTER-CONFIG
      {
        path: 'home',
        data: { title: 'home' },
        component: DashboardComponent,
      },
      {
        path: 'faq',
        data: { title: 'Frequently Asked Questions' },
        component: FaqComponent,
      },
      {
        path: 'contact',
        data: { title: 'Contact Us' },
        component: ContactComponent,
      },
      {
        path: 'privacy',
        data: { title: 'Privacy Policy' },
        component: PrivacyComponent,
      }, {
        path: 'terms',
        data: { title: 'Terms and Conditions' },
        component: TermsComponent,
      },
      {
        path: 'feedback',
        data: { title: 'Feedback' },
        component: FeedbackComponent,
      },  {
        path: 'about',
        data: { title: 'About Us' },
        component: AboutComponent,
      },  {
        path: 'careers',
        data: { title: 'Careers' },
        component: CareersComponent,
      },{
        path: 'adverts',
        data: { title: 'Advertisements - Support our partners' },
        component: AdvertsComponent,
      },
      {
        path: 'invite',
        data: { title: 'Invite friends' },
        component: InviteComponent,
      },
      {
        path: 'pricing',
        data: { title: 'Plans' },
        component: PricingPlansComponent,
      },
      {
        path: 'ask',
        data: { title: 'Ask' },
        component: AskQuestionComponent,
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
    MyComponentsModule,
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
