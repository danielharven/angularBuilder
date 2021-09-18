import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'
// import { ComponentsModule } from '../components/components.module'

import { LayoutAuthComponent } from './Auth/auth.component'
import { LayoutMainComponent } from './Main/main.component'
import { LayoutPublicComponent } from './Public/public.component'
import { CustomModule } from '../components/custom.module'
import { TopbarComponent } from '../components/Topbar/topbar.component'
import { TopbarUserMenuComponent } from '../components/Topbar/UserMenu/user-menu.component'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'

const COMPONENTS = [LayoutAuthComponent, LayoutMainComponent, LayoutPublicComponent]

@NgModule({
  imports: [SharedModule, CustomModule, NzAvatarModule, NzDropDownModule],
  declarations: [...COMPONENTS, TopbarComponent, TopbarUserMenuComponent],
  exports: [...COMPONENTS],
})
export class LayoutsModule {}
