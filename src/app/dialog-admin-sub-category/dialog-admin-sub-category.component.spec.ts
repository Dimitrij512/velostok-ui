import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminSubCategoryComponent } from './dialog-admin-sub-category.component';

describe('DialogAdminSubCategoryComponent', () => {
  let component: DialogAdminSubCategoryComponent;
  let fixture: ComponentFixture<DialogAdminSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
