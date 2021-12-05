import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AbstractControl, FormsModule } from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http'

import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'
import { UserEffects } from './store/user/effects'
import { jwtAuthService } from './services/jwt'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
// locale resistration
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd/i18n'
import { QuillModule } from 'ngx-quill'
import { FormlyModule } from '@ngx-formly/core'
import { FormlyFieldFile } from './components/formly/file-component'
import { FieldNgSelect } from './components/formly/quill/ng-select'
import { FieldQuillType } from './components/formly/quill/quil-type'
import { NgxSpinnerModule } from 'ngx-spinner'
import { configureGraphQL } from 'ngx-graphql'
import { environment } from '../environments/environment'
import {AuthInterceptor} from "./services/fakeApi";
// import {FlutterwaveModule} from "flutterwave-angular-v3";
const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')
export function minlengthValidationMessages(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    FormlyModule.forRoot({
      validators: [
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],
      extras: { lazyRender: true },
      types: [
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
        { name: 'ng-select', component: FieldNgSelect, wrappers: ['form-field'] },
        {
          name: 'custom-text-area',
          component: FieldQuillType,
          wrappers: ['form-field'],
        },
      ],
    }),
    FormlyBootstrapModule,
    // translate
    TranslateModule.forRoot(),

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot(),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    jwtAuthService,
    configureGraphQL({
      url: environment.url + '/graphql', // <-- configure GraphQL
    }),
    // locale providers
    ...LOCALE_PROVIDERS,

  ],
  bootstrap: [AppComponent],
  exports: [
  ],
})
export class AppModule {}
