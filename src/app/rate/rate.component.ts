// ====================
// Angular and Material
// ====================
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Dialogs
// =======
import { RateDetailDialogComponent } from '../dialog/rate/rate-detail.dialog.component';
import { RateDeleteDialogComponent } from '../dialog/rate/rate-delete.dialog.component';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { RateService } from './rate.service';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

// =====
// Model
// =====
import { RateModel } from '../model/rate.model';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css', '../layout/layout.component.css']
})
export class RateComponent {
  // ================
  // Global Variables
  // ================
  title = 'rate';
  isProgressBarHidden = false;

  // ==========================
  // Rate Async Task Properties
  // ==========================
  public rateSubscription: any;
  public rateData: ObservableArray = new ObservableArray();
  public rateCollectionView: CollectionView = new CollectionView(this.rateData);

  public isBtnRefreshRateDataDisabled: Boolean = true;

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();
  public ratesNumberOfPageIndex: number;

  // =====
  // Wijmo
  // =====
  @ViewChild('rateFlexGrid') rateFlexGrid: WjFlexGrid;

  // ================
  // Initialize Model
  // ================
  public rateModel: RateModel = {
    Id: 0,
    UserId: 0,
    ModalityProcedureId: 0,
    ModalityProcedureCode: "",
    FacilityRate: 0,
    DoctorRate: 0,
    ImageRate: 0,
    Remarks: ""
  };

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialog: MatDialog,
    private rateService: RateService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // ================================
  // Create Combo Show Number of Rows
  // ================================
  public createCboShowNumberOfRows(): void {
    for (var i = 0; i <= 4; i++) {
      var rows = 0;
      var rowsString = "";

      if (i == 0) {
        rows = 15;
        rowsString = "Show 15 Rows";
      } else if (i == 1) {
        rows = 50;
        rowsString = "Show 50 Rows";
      } else if (i == 2) {
        rows = 100;
        rowsString = "Show 100 Rows";
      } else if (i == 3) {
        rows = 150;
        rowsString = "Show 150 Rows";
      } else {
        rows = 200;
        rowsString = "Show 200 Rows";
      }

      this.cboShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });
    }
  }

  // ===================================================
  // Combo Show Number of Rows On Selected Index Changed
  // ===================================================
  public cboShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.ratesNumberOfPageIndex = selectedValue;

    this.rateCollectionView.pageSize = this.ratesNumberOfPageIndex;
    this.rateCollectionView.refresh();
    this.rateFlexGrid.refresh();
  }

  // =============
  // Get Rate Data
  // =============
  public getRateData(): void {
    this.rateData = new ObservableArray();
    this.rateCollectionView = new CollectionView(this.rateData);
    this.rateCollectionView.pageSize = 15;
    this.rateCollectionView.trackChanges = true;

    this.isProgressBarHidden = false;
    this.isBtnRefreshRateDataDisabled = true;

    this.rateService.getRate();
    this.rateSubscription = this.rateService.rateObservable.subscribe(
      data => {
        if (data != null) {
          this.rateData = data;
          this.rateCollectionView = new CollectionView(this.rateData);
          this.rateCollectionView.pageSize = this.ratesNumberOfPageIndex;
          this.rateCollectionView.trackChanges = true;
        }

        this.isProgressBarHidden = true;
        this.isBtnRefreshRateDataDisabled = false;
      }
    );
  }

  // ========
  // Add Rate
  // ========
  public btnAddRateClick(): void {
    this.rateModel.Id = 0;
    this.rateModel.UserId = 0;
    this.rateModel.ModalityProcedureId = 0;
    this.rateModel.ModalityProcedureCode = "";
    this.rateModel.FacilityRate = 0;
    this.rateModel.DoctorRate = 0;
    this.rateModel.ImageRate = 0;
    this.rateModel.Remarks = "";

    let detailRateDialogRef = this.dialog.open(RateDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Add Rate",
        objCurrentRate: this.rateModel
      }
    });

    detailRateDialogRef.disableClose = true;
    detailRateDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Save Successful!');
        this.getRateData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // =========
  // Edit Rate
  // =========
  public btnEditRateClick(): void {
    let currentRate = this.rateCollectionView.currentItem;
    this.rateModel.Id = currentRate.Id;
    this.rateModel.UserId = currentRate.UserId;
    this.rateModel.ModalityProcedureId = currentRate.ModalityProcedureId;
    this.rateModel.ModalityProcedureCode = currentRate.ModalityProcedureCode;
    this.rateModel.FacilityRate = currentRate.FacilityRate;
    this.rateModel.DoctorRate = currentRate.DoctorRate;
    this.rateModel.ImageRate = currentRate.ImageRate;
    this.rateModel.Remarks = currentRate.Remarks;

    let detailRateDialogRef = this.dialog.open(RateDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Edit Rate",
        objCurrentRate: this.rateModel
      }
    });

    detailRateDialogRef.disableClose = true;
    detailRateDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Update Successful!');
        this.getRateData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ===========
  // Delete Rate
  // ===========
  public btnDeleteRateClick(): void {
    let currentRate = this.rateCollectionView.currentItem;
    this.rateModel.Id = currentRate.Id;

    let deleteRateDialogRef = this.dialog.open(RateDeleteDialogComponent, {
      width: '400px',
      data: {
        objRateDeleteDialogTitle: "Delete Rate",
        objCurrentRate: this.rateModel
      }
    });

    deleteRateDialogRef.disableClose = true;
    deleteRateDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Delete Successful!');
        this.getRateData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.createCboShowNumberOfRows();
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      this.getRateData();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.rateSubscription != null) this.rateSubscription.unsubscribe();
  }
}