import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToMailListComponent } from './send-to-mail-list.component';

describe('SendToMailListComponent', () => {
  let component: SendToMailListComponent;
  let fixture: ComponentFixture<SendToMailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToMailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToMailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
