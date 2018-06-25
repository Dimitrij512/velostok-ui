import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminCategoryComponent } from './dialog-admin-category.component';

describe('DialogAdminCategoryComponent', () => {
  let component: DialogAdminCategoryComponent;
  let fixture: ComponentFixture<DialogAdminCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
