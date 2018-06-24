import {Routes,RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "../home-page/home-page.component";
import {ManageCategoryComponent} from "../manage-category/manage-category.component";
import {ManageProductComponent} from "../manage-product/manage-product.component";


const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'cart',
    loadChildren: '../cart/cart.module#CartModule',
  },
  {
    path: 'mens_outer',
    loadChildren: '../department/department.module#DepartmentModule',
    data: { title: 'Men\'s Outerwear', url: '/assets/json/mens_outerwear.json' }
  },
  {
    path: 'ladies_outer',
    loadChildren: '../department/department.module#DepartmentModule',
    data: { title: 'Ladies Outerwear', url: '/assets/json/ladies_outerwear.json' }
  },
  {
    path: 'mens_tshirts',
    loadChildren: '../department/department.module#DepartmentModule',
    data: { title: 'Men\'s T-Shirts', url: '/assets/json/mens_tshirts.json' }
  },
  {
    path: 'ladies_tshirts',
    loadChildren: '../department/department.module#DepartmentModule',
    data: { title: 'Ladies T-Shirts', url: '/assets/json/ladies_tshirts.json' }
  },
  {
    path: 'manage-category',
    component: ManageCategoryComponent,
  },
  {
    path: 'manage-product',
    component: ManageProductComponent,
  },
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
