import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminSuperCategoryComponent } from './dialog-admin-super-category.component';

describe('DialogAdminSuperCategoryComponent', () => {
  let component: DialogAdminSuperCategoryComponent;
  let fixture: ComponentFixture<DialogAdminSuperCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminSuperCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminSuperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
