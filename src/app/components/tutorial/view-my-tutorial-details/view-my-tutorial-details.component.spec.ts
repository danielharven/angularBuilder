import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTutorialDetailsComponent } from './view-my-tutorial-details.component';

describe('ViewMyTutorialDetailsComponent', () => {
  let component: ViewMyTutorialDetailsComponent;
  let fixture: ComponentFixture<ViewMyTutorialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyTutorialDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTutorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
