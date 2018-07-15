import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSuperCategoryComponent } from './manage-super-category.component';

describe('ManageSuperCategoryComponent', () => {
  let component: ManageSuperCategoryComponent;
  let fixture: ComponentFixture<ManageSuperCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSuperCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSuperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
