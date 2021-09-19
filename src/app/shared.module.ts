import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

// basic acl
import { ACLComponent } from 'src/app/@vb/components/ACL/acl.component'

// antd components module
import { AntdModule } from 'src/app/antd.module'
import { WidgetsComponentsModule } from './@vb/widgets/widgets-components.module'

const MODULES = [CommonModule, RouterModule, AntdModule, TranslateModule]

@NgModule({
  imports: [...MODULES],
  declarations: [ACLComponent],
  exports: [...MODULES],
})
export class SharedModule {}
