import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DepartmentComponent } from './department.component';
import { HttpClientModule } from '@angular/common/http';
import {DepartmentRoutingModule} from "./department-routing";
import {MatFormFieldModule, MatIconModule, MatInputModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2OrderModule} from "ng2-order-pipe";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DepartmentRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  declarations: [DepartmentComponent],
  bootstrap: [DepartmentComponent]
})
export class DepartmentModule { }
