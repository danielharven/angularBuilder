import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ViewpayslipsComponent } from './viewpayslips.component'

describe('ViewpayslipsComponent', () => {
  let component: ViewpayslipsComponent
  let fixture: ComponentFixture<ViewpayslipsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewpayslipsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpayslipsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
