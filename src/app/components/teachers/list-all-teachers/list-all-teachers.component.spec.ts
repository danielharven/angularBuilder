import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllTeachersComponent } from './list-all-teachers.component';

describe('ListAllTeachersComponent', () => {
  let component: ListAllTeachersComponent;
  let fixture: ComponentFixture<ListAllTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
