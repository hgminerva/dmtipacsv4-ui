// ==================
// Angular and Layout
// ==================
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // ================
  // Global Variables
  // ================
  title = 'layout';
  mobileQuery: MediaQueryList;

  @ViewChild('sidenav') sidenav: MatSidenav;

  private _mobileQueryListener: () => void;

  // ===========
  // Constructor
  // ===========
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // ========================
  // Open Side Navigation Bar
  // ========================
  public openSideNav() {
    this.sidenav.toggle();
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      this.openSideNav();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}