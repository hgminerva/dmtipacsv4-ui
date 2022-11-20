// =======
// Angular
// =======
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, Event, NavigationEnd } from '@angular/router';

// =======
// Service
// =======
import { ComponentsService } from './../components.service';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// =======
// Dialogs
// =======
import { FacilityDialogComponent } from '../../dialog/facility/facility.dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  title = 'sidenav';
  username = localStorage.getItem("username");
  currentFacilityId: number = 0;
  currentFacility: string;

  // ===========
  // Constructor
  // ===========
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  // ======================
  // Launch Facility Dialog
  // ======================
  public launchFacilityDialog(): void {
    let detailFacilityDialogRef = this.dialog.open(FacilityDialogComponent, {
      width: '400px',
      data: {
        objFacilityTitle: "Choose Facility",
      }
    });

    detailFacilityDialogRef.disableClose = true;
    detailFacilityDialogRef.afterClosed().subscribe(result => {
      this.currentFacility = result;
    });
  }

  // ========
  // Side Nav
  // ========
  public sideNavMenuClick(page: string): void {
    let sideNavMenuDashboard = document.getElementById("sideNavMenuDashboard");
    let sideNavMenuBodyParts = document.getElementById("sideNavMenuBodyParts");
    let sideNavMenuModalityProcedure = document.getElementById("sideNavMenuModalityProcedure");
    let sideNavMenuUser = document.getElementById("sideNavMenuUser");
    let sideNavMenuRate = document.getElementById("sideNavMenuRate");
    let sideNavMenuProcedure = document.getElementById("sideNavMenuProcedure");
    let sideNavMenuReports = document.getElementById("sideNavMenuReports");

    switch (page) {
      case 'dashboard': {
        sideNavMenuDashboard.classList.add("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuUser.classList.remove("sideNavMenuStyles");
        sideNavMenuRate.classList.remove("sideNavMenuStyles");
        sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuReports.classList.remove("sideNavMenuStyles");
        break;
      };
      case 'bodyParts': {
        sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.add("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuUser.classList.remove("sideNavMenuStyles");
        sideNavMenuRate.classList.remove("sideNavMenuStyles");
        sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuReports.classList.remove("sideNavMenuStyles");
        break;
      };
      case 'modalityProcedure': {
        sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.add("sideNavMenuStyles");
        sideNavMenuUser.classList.remove("sideNavMenuStyles");
        sideNavMenuRate.classList.remove("sideNavMenuStyles");
        sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuReports.classList.remove("sideNavMenuStyles");
        break;
      };
      case 'user': {
        sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuUser.classList.add("sideNavMenuStyles");
        sideNavMenuRate.classList.remove("sideNavMenuStyles");
        sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuReports.classList.remove("sideNavMenuStyles");
        break;
      };
      case 'rate': {
        sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuUser.classList.remove("sideNavMenuStyles");
        sideNavMenuRate.classList.add("sideNavMenuStyles");
        sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuReports.classList.remove("sideNavMenuStyles");
        break;
      };
      case 'procedure': {
        sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuUser.classList.remove("sideNavMenuStyles");
        sideNavMenuRate.classList.remove("sideNavMenuStyles");
        sideNavMenuProcedure.classList.add("sideNavMenuStyles");
        sideNavMenuReports.classList.remove("sideNavMenuStyles");
        break;
      };
      case 'reports': {
        sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
        sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
        sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuUser.classList.remove("sideNavMenuStyles");
        sideNavMenuRate.classList.remove("sideNavMenuStyles");
        sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
        sideNavMenuReports.classList.add("sideNavMenuStyles");
        break;
      };
      default: {

        break;
      }
    }
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      if (localStorage.getItem("current_facility_id") == null || localStorage.getItem("current_facility") == null) {
        setTimeout(() => {
          this.launchFacilityDialog();
        }, 100);
      } else {
        this.currentFacility = localStorage.getItem("current_facility");
      }
    }
  }
}