// ====================
// Angular and Material
// ====================
import { Component, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Service
// =======
import { ProcedureService } from './procedure.service';
import { UserService } from '../user/user.service';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

// =====
// Model
// =====
import { ProcedureModel } from '../model/procedure.model';
import { ProcedureResultModel } from '../model/procedure-result.model';

// =======
// Dialogs
// =======
import { ProcedureResultDetailDialogComponent } from '../dialog/procedure/procedure-result-detail.dialog.component';
import { ProcedureResultDeleteDialogComponent } from '../dialog/procedure/procedure-result-delete.dialog.component';
import { ProcedureResultPDFDetailPDFDialogComponent } from '../dialog/procedure/procedure-result-detail-pdf.dialog.component';

@Component({
    selector: 'app-procedure-detail',
    templateUrl: './procedure-detail.component.html',
    styleUrls: ['./procedure.component.css', '../layout/layout.component.css']
})
export class ProcedureDetailComponent {
    title = 'procedure detail';
    isProcedureResultProgressBarHidden = false;
    isProcedureComparativeProgressBarHidden = false;
    downloadJsonHref: SafeUrl;
    isBtnAddProcedureResultDisabled: Boolean = false;
    isBtnEditProcedureResultDisabled: Boolean = false;
    isBtnDeleteProcedureResultDisabled: Boolean = false;

    // =====
    // Wijmo
    // =====
    @ViewChild('procedureResultFlexGrid') procedureResultFlexGrid: WjFlexGrid;
    @ViewChild('procedureComparativeFlexGrid') procedureComparativeFlexGrid: WjFlexGrid;

    // ==========================
    // User Async Task Properties
    // ==========================
    public procedureSubscription: any;
    public isOtherComponentShow: boolean = false;

    // =================================
    // Procedure Result Async Task Properties
    // =================================
    public procedureResultSubscription: any;
    public procedureResultData: ObservableArray = new ObservableArray();
    public procedureResultCollectionView: CollectionView = new CollectionView(this.procedureResultData);

    // ===========================================
    // Procedure Comparative Async Task Properties
    // ===========================================
    public procedureComparativeSubscription: any;
    public procedureComparativeData: ObservableArray = new ObservableArray();
    public procedureComparativeCollectionView: CollectionView = new CollectionView(this.procedureComparativeData);

    // ============
    // Current User
    // ============
    public procedureCurrentUserSubscription: any;

    // ===========
    // Constructor
    // ===========
    constructor(
        public dialog: MatDialog,
        private procedureService: ProcedureService,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) { }

    // =======================
    // Get Parameter Id Method
    // =======================
    private getId(): number {
        let id = 0;
        this.activatedRoute.params.subscribe(params => {
            id = params["id"];
        });
        return id;
    }

    // ================
    // Initialize Model
    // ================
    public procedureModel: ProcedureModel = {
        Id: 0,
        TransactionNumber: "",
        TransactionDateTime: "",
        TransactionTime: "",
        DICOMFileName: "",
        PatientName: "",
        Gender: "",
        DateOfBirth: "",
        Age: 0,
        Particulars: "",
        ModalityId: 0,
        Modality: "",
        BodyPartId: 0,
        BodyPart: "",
        UserId: 0,
        User: "",
        PatientAddress: "",
        ReferringPhysician: "",
        StudyDate: "",
        HospitalNumber: "",
        HospitalWardNumber: "",
        StudyInstanceId: ""
    };
    public procedureResultModel: ProcedureResultModel = {
        Id: 0,
        ProcedureId: 0,
        ModalityProcedureId: 0,
        ModalityProcedure: "",
        Result: "",
        DoctorId: 0,
        Doctor: "",
        DoctorDateTime: ""
    };

    // =========================
    // Get Procedure Detail Data
    // =========================
    public getProcedureDetailData() {
        this.procedureService.getProcedureDetail(this.getId());

        this.procedureSubscription = this.procedureService.procedureDetailObservable
            .subscribe(
                data => {
                    this.procedureModel.Id = data.Id;
                    this.procedureModel.TransactionNumber = data.TransactionNumber;
                    this.procedureModel.TransactionDateTime = data.TransactionDateTime;
                    this.procedureModel.TransactionTime = data.TransactionTime;
                    this.procedureModel.DICOMFileName = data.DICOMFileName;
                    this.procedureModel.PatientName = data.PatientName;
                    this.procedureModel.Gender = data.Gender;
                    this.procedureModel.DateOfBirth = data.DateOfBirth;
                    this.procedureModel.Age = data.Age;
                    this.procedureModel.Particulars = data.Particulars;
                    this.procedureModel.ModalityId = data.ModalityId;
                    this.procedureModel.Modality = data.Modality;
                    this.procedureModel.BodyPartId = data.BodyPartId;
                    this.procedureModel.BodyPart = data.BodyPart;
                    this.procedureModel.User = data.User;
                    this.procedureModel.PatientAddress = data.PatientAddress;
                    this.procedureModel.ReferringPhysician = data.ReferringPhysician;
                    this.procedureModel.StudyDate = data.StudyDate;
                    this.procedureModel.HospitalNumber = data.HospitalNumber;
                    this.procedureModel.HospitalWardNumber = data.HospitalWardNumber;
                    this.procedureModel.StudyInstanceId = data.StudyInstanceId;
                }
            );
    }

    // =========================
    // Download Procedure - JSON
    // =========================
    public btnDownloadJSONProcedureClick(): void {
        let currentProcedure = [];

        currentProcedure.push({
            Id: this.procedureModel.Id,
            TransactionNumber: this.procedureModel.TransactionNumber,
            TransactionDateTime: this.procedureModel.TransactionDateTime,
            DICOMFileName: this.procedureModel.DICOMFileName,
            PatientName: this.procedureModel.PatientName,
            Gender: this.procedureModel.Gender,
            DateOfBirth: this.procedureModel.DateOfBirth,
            Age: this.procedureModel.Age,
            Particulars: this.procedureModel.Particulars,
            ModalityId: this.procedureModel.ModalityId,
            BodyPartId: this.procedureModel.BodyPartId,
            BodyPart: this.procedureModel.BodyPart,
            User: this.procedureModel.User,
            PatientAddress: this.procedureModel.PatientAddress,
            ReferringPhysician: this.procedureModel.ReferringPhysician,
            StudyDate: this.procedureModel.StudyDate,
            HospitalNumber: this.procedureModel.HospitalNumber,
            HospitalWardNumber: this.procedureModel.HospitalWardNumber,
            StudyInstanceId: this.procedureModel.StudyInstanceId
        });

        let jsonData = JSON.stringify(currentProcedure);
        let element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(jsonData));
        element.setAttribute('download', this.procedureModel.TransactionNumber + ".json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // =========================
    // Get Procedure Result Data
    // =========================
    public getProcedureResultData(): void {
        this.procedureResultData = new ObservableArray();
        this.procedureResultCollectionView = new CollectionView(this.procedureResultData);
        this.procedureResultCollectionView.pageSize = 15;
        this.procedureResultCollectionView.trackChanges = true;

        this.isProcedureResultProgressBarHidden = false;

        this.procedureService.getProcedureResult(this.getId());
        this.procedureResultSubscription = this.procedureService.procedureResultObservable.subscribe(
            data => {
                if (data != null) {
                    this.procedureResultData = data;
                    this.procedureResultCollectionView = new CollectionView(this.procedureResultData);
                    this.procedureResultCollectionView.pageSize = 15;
                    this.procedureResultCollectionView.trackChanges = true;

                    this.userService.getCurrentUser();
                    this.procedureCurrentUserSubscription = this.userService.userCurrentObservable.subscribe(
                        data => {
                            if (data != null) {
                                if (data.Id != this.procedureResultCollectionView.items[0].DoctorId) {
                                    this.isBtnAddProcedureResultDisabled = true;
                                    this.isBtnEditProcedureResultDisabled = true;
                                    this.isBtnDeleteProcedureResultDisabled = true;
                                }
                            }
                        }
                    );
                }

                this.isProcedureResultProgressBarHidden = true;
            }
        );
    }

    // ====================
    // Add Procedure Result
    // ====================
    public btnAddProcedureResultClick(): void {
        this.procedureResultModel.Id = 0;
        this.procedureResultModel.ProcedureId = this.getId();
        this.procedureResultModel.ModalityProcedureId = 0;
        this.procedureResultModel.Result = "";
        this.procedureResultModel.DoctorId = 0;
        this.procedureResultModel.Doctor = "";

        let detailProcedureResultDialogRef = this.dialog.open(ProcedureResultDetailDialogComponent, {
            width: '800px',
            data: {
                objProcedureResultDetailDialogTitle: "Add Procedure Result",
                objCurrentProcedureResult: this.procedureResultModel
            }
        });

        detailProcedureResultDialogRef.disableClose = true;
        detailProcedureResultDialogRef.afterClosed().subscribe(result => {
            if (result == 200) {
                this.toastr.success('Save Successful!');
                this.getProcedureResultData();
            } else if (result == 404) {
                this.toastr.error('Not Found!');
            } else if (result == 400) {
                this.toastr.error('Bad Request!');
            } else if (result == 500) {
                this.toastr.error('Internal Server Error!');
            };
        });
    }

    // =====================
    // Edit Procedure Result
    // =====================
    public btnEditProcedureResultClick(): void {
        let currentProcedureResult = this.procedureResultCollectionView.currentItem;
        this.procedureResultModel.Id = currentProcedureResult.Id;
        this.procedureResultModel.ProcedureId = this.getId();
        this.procedureResultModel.ModalityProcedureId = currentProcedureResult.ModalityProcedureId;
        this.procedureResultModel.Result = currentProcedureResult.Result;
        this.procedureResultModel.DoctorId = currentProcedureResult.DoctorId;
        this.procedureResultModel.Doctor = currentProcedureResult.Doctor;

        let detailProcedureResultDialogRef = this.dialog.open(ProcedureResultDetailDialogComponent, {
            width: '800px',
            data: {
                objProcedureResultDetailDialogTitle: "Edit Procedure Result",
                objCurrentProcedureResult: this.procedureResultModel
            }
        });

        detailProcedureResultDialogRef.disableClose = true;
        detailProcedureResultDialogRef.afterClosed().subscribe(result => {
            if (result == 200) {
                this.toastr.success('Update Successful!');
                this.getProcedureResultData();
            } else if (result == 404) {
                this.toastr.error('Not Found!');
            } else if (result == 400) {
                this.toastr.error('Bad Request!');
            } else if (result == 500) {
                this.toastr.error('Internal Server Error!');
            };
        });
    }

    // ======================
    // Print Procedure Result
    // ======================
    public btnPrintProcedureResultClick(): void {
        let currentProcedureResult = this.procedureResultCollectionView.currentItem;
        this.procedureResultModel.Id = currentProcedureResult.Id;

        let printProcedureResultDialogRef = this.dialog.open(ProcedureResultPDFDetailPDFDialogComponent, {
            width: '1100px',
            data: {
                objProcedureResultDetailPDFDialogTitle: "Print Result",
                id: this.procedureResultModel.Id
            }
        });

        printProcedureResultDialogRef.disableClose = true;
        printProcedureResultDialogRef.afterClosed().subscribe(result => {

        });
    }

    // =======================
    // Delete Procedure Result
    // =======================
    public btnDeleteProcedureResultClick(): void {
        let currentProcedureResult = this.procedureResultCollectionView.currentItem;
        this.procedureResultModel.Id = currentProcedureResult.Id;

        let deleteProcedureResultDialogRef = this.dialog.open(ProcedureResultDeleteDialogComponent, {
            width: '400px',
            data: {
                objProcedureResultDeleteDialogTitle: "Delete Procedure Result",
                objCurrentProcedureResult: this.procedureResultModel
            }
        });

        deleteProcedureResultDialogRef.disableClose = true;
        deleteProcedureResultDialogRef.afterClosed().subscribe(result => {
            if (result == 200) {
                this.toastr.success('Delete Successful!');
                this.getProcedureResultData();
            } else if (result == 404) {
                this.toastr.error('Not Found!');
            } else if (result == 400) {
                this.toastr.error('Bad Request!');
            } else if (result == 500) {
                this.toastr.error('Internal Server Error!');
            };
        });
    }

    // ==============================
    // Get Procedure Comparative Data
    // ==============================
    public getProcedureComparativeData(): void {
        this.procedureComparativeData = new ObservableArray();
        this.procedureComparativeCollectionView = new CollectionView(this.procedureComparativeData);
        this.procedureComparativeCollectionView.pageSize = 15;
        this.procedureComparativeCollectionView.trackChanges = true;

        this.isProcedureComparativeProgressBarHidden = false;

        this.procedureService.getProcedureComparative(this.getId());
        this.procedureComparativeSubscription = this.procedureService.procedureComparativeObservable.subscribe(
            data => {
                if (data != null) {
                    this.procedureComparativeData = data;
                    this.procedureComparativeCollectionView = new CollectionView(this.procedureComparativeData);
                    this.procedureComparativeCollectionView.pageSize = 15;
                    this.procedureComparativeCollectionView.trackChanges = true;
                }

                this.isProcedureComparativeProgressBarHidden = true;
            }
        );
    }

    // =====================================
    // Download Procedure Comparative - JSON
    // =====================================
    public btnDownloadJSONProcedureComparativeClick(): void {
        let procedureComparative = [];

        for (let i = 0; i < this.procedureComparativeCollectionView.items.length; i++) {
            procedureComparative.push({
                Id: this.procedureComparativeCollectionView.items[i].Id,
                TransactionNumber: this.procedureComparativeCollectionView.items[i].TransactionNumber,
                TransactionDateTime: this.procedureComparativeCollectionView.items[i].TransactionDateTime,
                TransactionTime: this.procedureComparativeCollectionView.items[i].TransactionTime,
                DICOMFileName: this.procedureComparativeCollectionView.items[i].DICOMFileName,
                PatientName: this.procedureComparativeCollectionView.items[i].PatientName,
                Gender: this.procedureComparativeCollectionView.items[i].Gender,
                DateOfBirth: this.procedureComparativeCollectionView.items[i].DateOfBirth,
                Age: this.procedureComparativeCollectionView.items[i].Age,
                Particulars: this.procedureComparativeCollectionView.items[i].Particulars,
                ModalityId: this.procedureComparativeCollectionView.items[i].ModalityId,
                Modality: this.procedureComparativeCollectionView.items[i].Modality,
                BodyPartId: this.procedureComparativeCollectionView.items[i].BodyPartId,
                BodyPart: this.procedureComparativeCollectionView.items[i].BodyPart,
                UserId: this.procedureComparativeCollectionView.items[i].UserId,
                User: this.procedureComparativeCollectionView.items[i].User,
                PatientAddress: this.procedureComparativeCollectionView.items[i].PatientAddress,
                ReferringPhysician: this.procedureComparativeCollectionView.items[i].ReferringPhysician,
                StudyDate: this.procedureComparativeCollectionView.items[i].StudyDate,
                HospitalNumber: this.procedureComparativeCollectionView.items[i].HospitalNumber,
                HospitalWardNumber: this.procedureComparativeCollectionView.items[i].HospitalWardNumber,
                StudyInstanceId: this.procedureComparativeCollectionView.items[i].StudyInstanceId,
                Doctor: this.procedureComparativeCollectionView.items[i].Doctor
            });
        }

        let jsonData = JSON.stringify(procedureComparative);
        let element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(jsonData));
        element.setAttribute('download', this.procedureModel.TransactionNumber + ".json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // =============
    // On Click Tabs
    // =============
    public onTabClick(event: MatTabChangeEvent) {
        if (event.index == 0) {
            this.procedureResultCollectionView.refresh();
            this.procedureResultFlexGrid.refresh();
        } else if (event.index == 1) {
            this.procedureComparativeCollectionView.refresh();
            this.procedureComparativeFlexGrid.refresh();
        } else if (event.index == 2) {
            this.isOtherComponentShow = true;
        }
    }

    // ============
    // On Load Page
    // ============
    ngOnInit() {
        if (localStorage.getItem("access_token") == null) {
            this.router.navigate(['/account/login']);
        } else {
            this.getProcedureDetailData();
            this.getProcedureResultData();
            this.getProcedureComparativeData();
        }
    }

    // ===============
    // On Destory Page
    // ===============
    ngOnDestroy() {
        if (this.procedureSubscription != null) this.procedureSubscription.unsubscribe();
        if (this.procedureResultSubscription != null) this.procedureResultSubscription.unsubscribe();
        if (this.procedureComparativeSubscription != null) this.procedureComparativeSubscription.unsubscribe();
        if (this.procedureCurrentUserSubscription != null) this.procedureCurrentUserSubscription.unsubscribe();
    }
}