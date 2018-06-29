import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminProductComponent } from './dialog-admin-product.component';

describe('DialogAdminProductComponent', () => {
  let component: DialogAdminProductComponent;
  let fixture: ComponentFixture<DialogAdminProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
