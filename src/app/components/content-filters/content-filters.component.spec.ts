import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFiltersComponent } from './content-filters.component';

describe('ContentFiltersComponent', () => {
  let component: ContentFiltersComponent;
  let fixture: ComponentFixture<ContentFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
