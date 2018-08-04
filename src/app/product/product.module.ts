import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product.routing";
import {MatProgressBarModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
