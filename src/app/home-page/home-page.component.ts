import { Component, OnInit } from '@angular/core';
import {NAV_BAR_ENTRIES} from "../departments";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  entries = NAV_BAR_ENTRIES;

  constructor() { }

  ngOnInit() {
  }

}
