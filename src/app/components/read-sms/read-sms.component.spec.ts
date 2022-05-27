import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSmsComponent } from './read-sms.component';

describe('ReadSmsComponent', () => {
  let component: ReadSmsComponent;
  let fixture: ComponentFixture<ReadSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
