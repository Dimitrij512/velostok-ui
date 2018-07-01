import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DepartmentComponent } from './department.component';
import { HttpClientModule } from '@angular/common/http';
import {DepartmentRoutingModule} from "./department-routing";
import {MatIconModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DepartmentRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
  ],
  declarations: [DepartmentComponent]
})
export class DepartmentModule { }
