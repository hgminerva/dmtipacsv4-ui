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
import { ModalityProcedureDetailDialogComponent } from '../dialog/modality-procedure/modality-procedure-detail.dialog.component';
import { ModalityProcedureDeleteDialogComponent } from '../dialog/modality-procedure/modality-procedure-delete.dialog.component';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { ModalityProcedureService } from './modality-procedure.service';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

// =====
// Model
// =====
import { ModalityProcedureModel } from '../model/modality-procedure.model';

@Component({
  selector: 'app-modality-procedure',
  templateUrl: './modality-procedure.component.html',
  styleUrls: ['./modality-procedure.component.css', '../layout/layout.component.css']
})
export class ModalityProcedureComponent {
  // ================
  // Global Variables
  // ================
  title = 'Modality Procedure';
  isProgressBarHidden = false;

  // ========================================
  // Modality Procedure Async Task Properties
  // ========================================
  public modalityProcedureSubscription: any;
  public modalityProcedureData: ObservableArray = new ObservableArray();
  public modalityProcedureCollectionView: CollectionView = new CollectionView(this.modalityProcedureData);

  public isBtnRefreshModalityProcedureDataDisabled: Boolean = true;

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();
  public modalityProcedureNumberOfPageIndex: number;

  // ================
  // Initialize Model
  // ================
  public modalityProcedureModel: ModalityProcedureModel = {
    Id: 0,
    ModalityId: 0,
    Modality: "",
    ModalityProcedure: "",
    ModalityResultTemplate: "",
    DoctorId: null
  };

  // =====
  // Wijmo
  // =====
  @ViewChild('modalityProcedureFlexGrid') modalityProcedureFlexGrid: WjFlexGrid;

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialog: MatDialog,
    private modalityProcedureService: ModalityProcedureService,
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
    this.modalityProcedureNumberOfPageIndex = selectedValue;

    this.modalityProcedureCollectionView.pageSize = this.modalityProcedureNumberOfPageIndex;
    this.modalityProcedureCollectionView.refresh();
    this.modalityProcedureFlexGrid.refresh();
  }

  // ===========================
  // Get Modality Procedure Data
  // ===========================
  public getModalityProcedureData(): void {
    this.modalityProcedureData = new ObservableArray();
    this.modalityProcedureCollectionView = new CollectionView(this.modalityProcedureData);
    this.modalityProcedureCollectionView.pageSize = 15;
    this.modalityProcedureCollectionView.trackChanges = true;

    this.isProgressBarHidden = false;
    this.isBtnRefreshModalityProcedureDataDisabled = true;

    this.modalityProcedureService.getModalityProcedure();
    this.modalityProcedureSubscription = this.modalityProcedureService.modalityProcedureObservable.subscribe(
      data => {
        if (data != null) {
          this.modalityProcedureData = data;
          this.modalityProcedureCollectionView = new CollectionView(this.modalityProcedureData);
          this.modalityProcedureCollectionView.pageSize = this.modalityProcedureNumberOfPageIndex;
          this.modalityProcedureCollectionView.trackChanges = true;
        }

        this.isProgressBarHidden = true;
        this.isBtnRefreshModalityProcedureDataDisabled = false;
      }
    );
  }

  // ======================
  // Add Modality Procedure
  // ======================
  public btnAddModalityProcedureClick(): void {
    this.modalityProcedureModel.Id = 0;
    this.modalityProcedureModel.ModalityId = 0;
    this.modalityProcedureModel.Modality = "";
    this.modalityProcedureModel.ModalityProcedure = "";
    this.modalityProcedureModel.ModalityResultTemplate = "";
    this.modalityProcedureModel.DoctorId = null;

    let detailModalityProcedureDialogRef = this.dialog.open(ModalityProcedureDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Add Modality Procedure",
        objCurrentModalityProcedure: this.modalityProcedureModel
      }
    });

    detailModalityProcedureDialogRef.disableClose = true;
    detailModalityProcedureDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Save Successful!');
        this.getModalityProcedureData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // =======================
  // Edit Modality Procedure
  // =======================
  public btnEditModalityProcedureClick(): void {
    let currentModalityProcedure = this.modalityProcedureCollectionView.currentItem;
    this.modalityProcedureModel.Id = currentModalityProcedure.Id;
    this.modalityProcedureModel.ModalityId = currentModalityProcedure.ModalityId;
    this.modalityProcedureModel.Modality = currentModalityProcedure.Modality;
    this.modalityProcedureModel.ModalityProcedure = currentModalityProcedure.ModalityProcedure;
    this.modalityProcedureModel.ModalityResultTemplate = currentModalityProcedure.ModalityResultTemplate;
    this.modalityProcedureModel.DoctorId = currentModalityProcedure.DoctorId;

    let detailModalityProcedureDialogRef = this.dialog.open(ModalityProcedureDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Edit Modality Procedure",
        objCurrentModalityProcedure: this.modalityProcedureModel
      }
    });

    detailModalityProcedureDialogRef.disableClose = true;
    detailModalityProcedureDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Update Successful!');
        this.getModalityProcedureData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // =========================
  // Delete Modality Procedure
  // =========================
  public btnDeleteModalityProcedureClick(): void {
    let currentModalityProcedure = this.modalityProcedureCollectionView.currentItem;
    this.modalityProcedureModel.Id = currentModalityProcedure.Id;

    let deleteModalityProcedureDialogRef = this.dialog.open(ModalityProcedureDeleteDialogComponent, {
      width: '400px',
      data: {
        objModalityProcedureDeleteDialogTitle: "Delete Modality Procedure",
        objCurrentModalityProcedure: this.modalityProcedureModel
      }
    });

    deleteModalityProcedureDialogRef.disableClose = true;
    deleteModalityProcedureDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Delete Successful!');
        this.getModalityProcedureData();
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
      this.getModalityProcedureData();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.modalityProcedureSubscription != null) this.modalityProcedureSubscription.unsubscribe();
  }
}
