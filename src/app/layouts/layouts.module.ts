import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'
// import { ComponentsModule } from '../@vb/components/components.module'

import { LayoutAuthComponent } from './Auth/auth.component'
import { LayoutMainComponent } from './Main/main.component'
import { LayoutPublicComponent } from './Public/public.component'
import { MyComponentsModule } from '../components/my-components.module'
import { NgxSpinnerModule } from 'ngx-spinner'

const COMPONENTS = [LayoutAuthComponent, LayoutMainComponent, LayoutPublicComponent]

@NgModule({
  imports: [SharedModule, MyComponentsModule, NgxSpinnerModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule {}
