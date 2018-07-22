import {Component, OnInit} from '@angular/core';
import {NAV_BAR_ENTRIES} from "../departments";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  entries: any

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.entries = NAV_BAR_ENTRIES;
  }

  goToAdminPage(routToAdminPage: string) {
    this.router.navigate([routToAdminPage]);
  }

}
