import { NgModule } from '@angular/core'

import { IconDefinition } from '@ant-design/icons-angular'
import * as AllIcons from '@ant-design/icons-angular/icons'

import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzNotificationModule } from 'ng-zorro-antd/notification'
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzAnchorModule } from 'ng-zorro-antd/anchor'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'

/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

/**
 * AntDesign Components
 */

const MODULES = [
  NzButtonModule,
  NzGridModule,
  NzLayoutModule,
  NzSpaceModule,
  // NzAffixModule,
  NzBreadCrumbModule,
  // NzDropDownModule,
  NzMenuModule,
  NzPageHeaderModule,
  // NzPaginationModule,
  // NzStepsModule,
  NzAutocompleteModule,
  // NzCascaderModule,
  // NzCheckboxModule,
  // NzDatePickerModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  // NzMentionModule,
  // NzRadioModule,
  // NzRateModule,
  // NzSelectModule,
  // NzSliderModule,
  // NzSwitchModule,
  // NzTimePickerModule,
  // NzTransferModule,
  // NzTreeSelectModule,
  // NzUploadModule,
  // NzAvatarModule,
  // NzBadgeModule,
  // NzCalendarModule,
  NzCardModule,
  // NzCarouselModule,
  // NzCollapseModule,
  // NzCommentModule,
  // NzDescriptionsModule,
  NzEmptyModule,
  NzListModule,
  // NzPopoverModule,
  // NzStatisticModule,
  NzTableModule,
  NzTabsModule,
  // NzTagModule,
  // NzTimelineModule,
  // NzToolTipModule,
  // NzTreeModule,
  // NzAlertModule,
  NzDrawerModule,
  // NzMessageModule,
  // NzModalModule,
  NzNotificationModule,
  // NzPopconfirmModule,
  NzProgressModule,
  // NzResultModule,
  // NzSkeletonModule,
  NzSpinModule,
  NzAnchorModule,
  // NzBackTopModule,
  // NzDividerModule,
]

@NgModule({
  imports: [...MODULES, NzIconModule.forRoot(icons)],
  exports: [...MODULES, NzIconModule],
})
export class AntdModule {}
