import {Routes,RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "../home-page/home-page.component";
import {ManageCategoryComponent} from "../manage-category/manage-category.component";
import {ManageProductComponent} from "../manage-product/manage-product.component";
import {BASEURL} from "../constants/projectsConstants";
import {PaymentAndDeliveryComponent} from "../payment-and-delivery/payment-and-delivery.component";


const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'cart',
    loadChildren: '../cart/cart.module#CartModule',
  },
  {
    path: 'products/category/:name',
    loadChildren: '../department/department.module#DepartmentModule',
    data: { title: 'Категорія : ', url: BASEURL + '/products/category/' }
  },

  {
    path: 'product/:id',
    loadChildren: '../product/product.module#ProductModule',
    data: { title: 'Товар : ', url: BASEURL + '/product/' }
  },

  {
    path: 'manage-category',
    component: ManageCategoryComponent,
  },
  {
    path: 'manage-product',
    component: ManageProductComponent,
  },
  {
    path:'payment',
    component:PaymentAndDeliveryComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  declarations: []
})
export class RoutingModule {
}
