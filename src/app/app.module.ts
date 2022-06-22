import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'
import { UserEffects } from './store/user/effects'
import { firebaseConfig, firebaseAuthService } from './services/firebase'
import { basicAuthService } from './services/basic-auth'

// locale resistration
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd/i18n'
import { QuillModule } from 'ngx-quill'
import { FormlyModule } from '@ngx-formly/core'
import { FormlyFieldFile } from './components/formly/file-component'
import { FieldNgSelect } from './components/formly/quill/ng-select'
import { FieldQuillType } from './components/formly/quill/quil-type'
import { jwtAuthService } from './services/jwt/jwt.service'
import { AuthInterceptor } from './services/interscept'
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config'
const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')
const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzMaxStack:1, nzDuration:10000 }
};

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

    // init firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    // auth services
    firebaseAuthService,
    basicAuthService,
    jwtAuthService,

    // fake http interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    // locale providers
    ...LOCALE_PROVIDERS,

    // firestore settings
    { provide: SETTINGS, useValue: {} },
  // antd
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
