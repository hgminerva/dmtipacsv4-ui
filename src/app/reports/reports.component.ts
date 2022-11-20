// ====================
// Angular and Material
// ====================
import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

// =================================
// Async Task and Wijmo and Services
// =================================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';
import { ReportService } from './reports.service';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  // ================
  // Global Variables
  // ================
  title = 'reports';
  isProcedureSummaryReportProgressBarHidden = false;
  isProcedureDetailReportProgressBarHidden = false;

  // =====
  // Wijmo
  // =====
  @ViewChild('procedureSummaryReportFlexGrid') procedureSummaryReportFlexGrid: WjFlexGrid;
  @ViewChild('procedureDetailReportFlexGrid') procedureDetailReportFlexGrid: WjFlexGrid;
  @ViewChild('cboProcedureSummaryReportFacility') cboProcedureSummaryReportFacility: WjComboBox;
  @ViewChild('cboProcedureDetailReportFacility') cboProcedureDetailReportFacility: WjComboBox;

  // ==============================================
  // Procedure Summary Report Async Task Properties
  // ==============================================
  public procedureSummaryReportSubscription: any;
  public procedureSummaryReportData: ObservableArray = new ObservableArray();
  public procedureSummaryReportCollectionView: CollectionView = new CollectionView(this.procedureSummaryReportData);

  // =============================================
  // Procedure Detail Report Async Task Properties
  // =============================================
  public procedureDetailReportSubscription: any;
  public procedureDetailReportData: ObservableArray = new ObservableArray();
  public procedureDetailReportCollectionView: CollectionView = new CollectionView(this.procedureSummaryReportData);

  // ===========================
  // Date Range Filters (Values)
  // ===========================
  public procedureSummaryReportStartDateData = new Date();
  public procedureSummaryReportEndDateData = new Date();
  public procedureDetailReportStartDateData = new Date();
  public procedureDetailReportEndDateData = new Date();
  public isProcedureSummaryReportStartDateClicked: Boolean = false;
  public isProcedureSummaryReportStartDateSelected: Boolean = false;
  public isProcedureSummaryReportEndDateClicked: Boolean = false;
  public isProcedureSummaryReportEndDateSelected: Boolean = false;
  public isProcedureDetailReportStartDateClicked: Boolean = false;
  public isProcedureDetailReportStartDateSelected: Boolean = false;
  public isProcedureDetailReportEndDateClicked: Boolean = false;
  public isProcedureDetailReportEndDateSelected: Boolean = false;
  public cboProcedureSummaryReportShowNumberOfRows: ObservableArray = new ObservableArray();
  public cboProcedureDetailReportShowNumberOfRows: ObservableArray = new ObservableArray();
  public procedureSummaryReportNumberOfPageIndex: number;
  public procedureDetailReportNumberOfPageIndex: number;

  public isBtnRefreshProcedureSummaryReportDataDisabled: Boolean = true;
  public isBtnRefreshProcedureDetailReportDataDisabled: Boolean = true;

  public facilitySubscription: any;
  public cboFacilityObservableArray: ObservableArray = new ObservableArray();

  // ===========
  // Constructor
  // ===========
  constructor(
    private reportService: ReportService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // =================================================
  // Text Change : Start Date Procedure Summary Report
  // =================================================
  public procedureSummaryReportStartDateTextChanged() {
    if (this.isProcedureSummaryReportStartDateClicked == true) {
      if (this.isProcedureSummaryReportStartDateSelected == true) {
        this.getProcedureSummaryReportData();
      } else {
        this.isProcedureSummaryReportStartDateSelected = true;
      }
    } else {
      this.isProcedureSummaryReportStartDateClicked = true;
    }
  }

  // ===============================================
  // Text Change : End Date Procedure Summary Report
  // ===============================================
  public procedureSummaryReportEndDateTextChanged() {
    if (this.isProcedureSummaryReportEndDateClicked == true) {
      if (this.isProcedureSummaryReportEndDateSelected == true) {
        this.getProcedureSummaryReportData();
      } else {
        this.isProcedureSummaryReportEndDateClicked = true;
      }
    } else {
      this.isProcedureSummaryReportEndDateSelected = true;
    }
  }

  // ==================================================================
  // Combo Box Procedure Summary Report Facility Selected Index Changed
  // ==================================================================
  public cboProcedureSummaryReportFacilitySelectedIndexChanged(): void {
    if (this.cboProcedureSummaryReportFacility.selectedValue != null) {
      this.getProcedureSummaryReportData();
    }
  }

  // ================================================
  // Text Change : Start Date Procedure Detail Report
  // ================================================
  public procedureDetailReportStartDateTextChanged() {
    if (this.isProcedureDetailReportStartDateClicked == true) {
      if (this.isProcedureDetailReportStartDateSelected == true) {
        this.getProcedureDetailReportData();
      } else {
        this.isProcedureDetailReportStartDateSelected = true;
      }
    } else {
      this.isProcedureDetailReportStartDateClicked = true;
    }
  }

  // ==============================================
  // Text Change : End Date Procedure Detail Report
  // ==============================================
  public procedureDetailReportEndDateTextChanged() {
    if (this.isProcedureDetailReportEndDateClicked == true) {
      if (this.isProcedureDetailReportEndDateSelected == true) {
        this.getProcedureDetailReportData();
      } else {
        this.isProcedureDetailReportEndDateClicked = true;
      }
    } else {
      this.isProcedureDetailReportEndDateSelected = true;
    }
  }

  // =================================================================
  // Combo Box Procedure Detail Report Facility Selected Index Changed
  // =================================================================
  public cboProcedureDetailReportFacilitySelectedIndexChanged(): void {
    if (this.cboProcedureDetailReportFacility.selectedValue != null) {
      this.getProcedureDetailReportData();
    }
  }

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

      this.cboProcedureSummaryReportShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });

      this.cboProcedureDetailReportShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });
    }
  }

  // =================
  // Get Facility Data
  // =================
  public getFacilityData(): void {
    this.reportService.getFacilities();
    this.facilitySubscription = this.reportService.facilitiesObservable.subscribe(
      data => {
        let facilityObservableArray = new ObservableArray();

        if (data != null) {
          for (var i = 0; i <= data.length - 1; i++) {
            facilityObservableArray.push({
              Id: data[i].Id,
              UserId: data[i].UserId,
              UserFacility: data[i].UserFacility
            });
          }

          this.cboFacilityObservableArray = facilityObservableArray;

          this.getProcedureSummaryReportData();
          this.getProcedureDetailReportData();
        }
      }
    );
  }

  // =================================
  // Get Procedure Summary Report Data
  // =================================
  public getProcedureSummaryReportData(): void {
    this.procedureSummaryReportData = new ObservableArray();
    this.procedureSummaryReportCollectionView = new CollectionView(this.procedureSummaryReportData);
    this.procedureSummaryReportCollectionView.pageSize = this.procedureSummaryReportNumberOfPageIndex;
    this.procedureSummaryReportCollectionView.trackChanges = true;

    if (this.procedureSummaryReportSubscription != null) this.procedureSummaryReportSubscription.unsubscribe();

    this.isProcedureSummaryReportProgressBarHidden = false;
    this.isBtnRefreshProcedureSummaryReportDataDisabled = true;

    let dateStart = [this.procedureSummaryReportStartDateData.getFullYear(), this.procedureSummaryReportStartDateData.getMonth() + 1, this.procedureSummaryReportStartDateData.getDate()].join('-');
    let dateEnd = [this.procedureSummaryReportEndDateData.getFullYear(), this.procedureSummaryReportEndDateData.getMonth() + 1, this.procedureSummaryReportEndDateData.getDate()].join('-');

    let facilityId = parseInt(localStorage.getItem("current_facility_id"));
    if (this.cboProcedureSummaryReportFacility.selectedValue != null) {
      facilityId = this.cboProcedureSummaryReportFacility.selectedValue;
    }

    this.reportService.getProcedureSummaryReport(dateStart, dateEnd, facilityId);
    this.procedureSummaryReportSubscription = this.reportService.procedureSummaryReportObservable.subscribe(
      data => {
        if (data != null) {
          this.procedureSummaryReportData = data;
          this.procedureSummaryReportCollectionView = new CollectionView(this.procedureSummaryReportData);
          this.procedureSummaryReportCollectionView.pageSize = this.procedureSummaryReportNumberOfPageIndex;
          this.procedureSummaryReportCollectionView.trackChanges = true;
        }

        this.isProcedureSummaryReportProgressBarHidden = true;
        this.isBtnRefreshProcedureSummaryReportDataDisabled = false;
      }
    );
  }

  // ========================================
  // Export CSV Procedure Summary Report Data
  // ============================-===========
  public btnExportCSVProcedureSummaryReport() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: ["Facility", "Tx No.", "Tx Date", "Tx Time", "Patient", "Age", "Modality", "Doctor"]
    };

    new Angular5Csv(this.procedureSummaryReportCollectionView.items, 'Procedure Summary Report', options);
  }

  // =============================================================================
  // Combo Show Number of Rows On Selected Index Changed: Procedure Summary Report
  // =============================================================================
  public cboProcedureSummaryReportShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.procedureSummaryReportNumberOfPageIndex = selectedValue;

    this.procedureSummaryReportCollectionView.pageSize = this.procedureSummaryReportNumberOfPageIndex;
    this.procedureSummaryReportCollectionView.refresh();
    this.procedureSummaryReportFlexGrid.refresh();
  }

  // ================================
  // Get Procedure Detail Report Data
  // ================================
  public getProcedureDetailReportData(): void {
    this.procedureDetailReportData = new ObservableArray();
    this.procedureDetailReportCollectionView = new CollectionView(this.procedureDetailReportData);
    this.procedureDetailReportCollectionView.pageSize = this.procedureDetailReportNumberOfPageIndex;
    this.procedureDetailReportCollectionView.trackChanges = true;

    if (this.procedureDetailReportSubscription != null) this.procedureDetailReportSubscription.unsubscribe();

    this.isProcedureDetailReportProgressBarHidden = false;
    this.isBtnRefreshProcedureDetailReportDataDisabled = true;

    let dateStart = [this.procedureDetailReportStartDateData.getFullYear(), this.procedureDetailReportStartDateData.getMonth() + 1, this.procedureDetailReportStartDateData.getDate()].join('-');
    let dateEnd = [this.procedureDetailReportEndDateData.getFullYear(), this.procedureDetailReportEndDateData.getMonth() + 1, this.procedureDetailReportEndDateData.getDate()].join('-');

    let facilityId = parseInt(localStorage.getItem("current_facility_id"));
    if (this.cboProcedureDetailReportFacility.selectedValue != null) {
      facilityId = this.cboProcedureDetailReportFacility.selectedValue;
    }

    this.reportService.getProcedureDetailReport(dateStart, dateEnd, facilityId);
    this.procedureDetailReportSubscription = this.reportService.procedureDetailReportObservable.subscribe(
      data => {
        if (data != null) {
          this.procedureDetailReportData = data;
          this.procedureDetailReportCollectionView = new CollectionView(this.procedureDetailReportData);
          this.procedureDetailReportCollectionView.pageSize = this.procedureDetailReportNumberOfPageIndex;
          this.procedureDetailReportCollectionView.trackChanges = true;
        }

        this.isProcedureDetailReportProgressBarHidden = true;
        this.isBtnRefreshProcedureDetailReportDataDisabled = false;
      }
    );
  }

  // =======================================
  // Export CSV Procedure Detail Report Data
  // =======================================
  public btnExportCSVProcedureDetailReport() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: ["Facility", "Tx No.", "Tx Date", "Tx Time", "Patient", "Exam Taken", "Procedure", "Doctor", "Facility Rate", "Doctor Rate", "Image Rate"]
    };

    new Angular5Csv(this.procedureDetailReportCollectionView.items, 'Procedure Detail Report', options);
  }

  // ============================================================================
  // Combo Show Number of Rows On Selected Index Changed: Procedure Detail Report
  // ============================================================================
  public cboProcedureDetailReportShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.procedureDetailReportNumberOfPageIndex = selectedValue;

    this.procedureDetailReportCollectionView.pageSize = this.procedureDetailReportNumberOfPageIndex;
    this.procedureDetailReportCollectionView.refresh();
    this.procedureDetailReportFlexGrid.refresh();
  }

  // ============
  // On Click Tabs
  // =============
  public onTabClick(event: MatTabChangeEvent) {
    if (event.index == 0) {
      setTimeout(() => {
        this.procedureSummaryReportCollectionView.refresh();
        this.procedureSummaryReportFlexGrid.refresh();
      }, 500);
    } else if (event.index == 1) {
      setTimeout(() => {
        this.procedureDetailReportCollectionView.refresh();
        this.procedureDetailReportFlexGrid.refresh();
      }, 500);
    }
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.createCboShowNumberOfRows();
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      this.getFacilityData();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.facilitySubscription != null) this.facilitySubscription.unsubscribe();
    if (this.procedureSummaryReportSubscription != null) this.procedureSummaryReportSubscription.unsubscribe();
    if (this.procedureDetailReportSubscription != null) this.procedureDetailReportSubscription.unsubscribe();
  }
}