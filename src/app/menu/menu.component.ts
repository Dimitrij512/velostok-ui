import { Component, OnInit } from '@angular/core';
import {NAV_BAR_ENTRIES} from "../departments";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  entries:any

  constructor() { }

  ngOnInit() {
    this.entries = NAV_BAR_ENTRIES;
  }

}
