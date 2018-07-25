import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoutingModule} from "./routing/routing.module";
import {HomePageComponent} from './home-page/home-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CartIconComponent} from "./cart-icon/cart-icon.component";
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule, MatSortModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
} from "@angular/material";
import {ManageCategoryComponent} from './manage-category/manage-category.component';
import {ManageProductComponent} from './manage-product/manage-product.component';
import {DialogAdminCategoryComponent} from './dialog-admin-category/dialog-admin-category.component';
import {DialogConfirmDeleteComponent} from './dialog-confirm-delete/dialog-confirm-delete.component';
import {DialogAdminProductComponent} from './dialog-admin-product/dialog-admin-product.component';
import {
  ButtonsModule,
  CarouselModule, ChartsModule, CollapseModule, DropdownModule, InputsModule,
  MDBBootstrapModule,
  ModalModule, NavbarModule, PopoverModule, TooltipModule,
  WavesModule
} from "angular-bootstrap-md";
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {PaymentAndDeliveryComponent} from './payment-and-delivery/payment-and-delivery.component';
import {ManageSuperCategoryComponent} from './manage-super-category/manage-super-category.component';
import {ManageSubCategoryComponent} from './manage-sub-category/manage-sub-category.component';
import {DialogAdminSuperCategoryComponent} from './dialog-admin-super-category/dialog-admin-super-category.component';
import {DialogAdminSubCategoryComponent} from './dialog-admin-sub-category/dialog-admin-sub-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    CartIconComponent,
    ManageCategoryComponent,
    ManageProductComponent,
    DialogAdminCategoryComponent,
    DialogConfirmDeleteComponent,
    DialogAdminProductComponent,
    FooterComponent,
    MenuComponent,
    PaymentAndDeliveryComponent,
    ManageSuperCategoryComponent,
    ManageSubCategoryComponent,
    DialogAdminSuperCategoryComponent,
    DialogAdminSubCategoryComponent,
    CategoriesComponent,
    SubCategoriesComponent,
  ],
  entryComponents: [DialogAdminCategoryComponent, DialogAdminProductComponent, DialogConfirmDeleteComponent, DialogAdminSuperCategoryComponent, DialogAdminSubCategoryComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CarouselModule.forRoot(),
    ButtonsModule,
    ChartsModule,
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
    InputsModule.forRoot(),
    ModalModule.forRoot(),
    NavbarModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    WavesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
