// =======
// Angular
// =======
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ProcedureResultModel } from '../../model/procedure-result.model';
import { ProcedureService } from '../../procedure/procedure.service';

import { ObservableArray } from 'wijmo/wijmo';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

@Component({
    selector: 'app-procedure-result-detail-dialog',
    templateUrl: './procedure-result-detail.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureResultDetailDialogComponent {
    title = 'Detail Procedure Result';
    isCurrentDoctor = false;
    isCboProcedureClicked = false;
    isCboProcedureSelected = false;
    isClickedEdit = false;

    // ==========================
    // Rate Async Task Properties
    // ==========================
    public procedureResultSubscription: any;
    public doctorSubscription: any;
    public cboDoctorObservableArray: ObservableArray;
    public modalityProcedureSubscription: any;
    public cboModalityProcedureObservableArray: ObservableArray;

    // =====
    // Wijmo
    // =====
    @ViewChild('cboModality') cboModality: WjComboBox;

    // ================
    // Initialize Model
    // ================
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

    // ===========
    // Constructor
    // ===========
    constructor(
        public detailProcedureResultDialogRef: MatDialogRef<ProcedureResultDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private procedureService: ProcedureService
    ) {
        this.title = data.objProcedureResultDetailDialogTitle;
        this.procedureResultModel.Id = data.objCurrentProcedureResult.Id;
        this.procedureResultModel.ProcedureId = data.objCurrentProcedureResult.ProcedureId;
        this.procedureResultModel.ModalityProcedureId = data.objCurrentProcedureResult.ModalityProcedureId;
        this.procedureResultModel.Result = data.objCurrentProcedureResult.Result;
        this.procedureResultModel.DoctorId = data.objCurrentProcedureResult.DoctorId;
        this.procedureResultModel.Doctor = data.objCurrentProcedureResult.Doctor;

        if (this.procedureResultModel.Id == 0) {
            this.isCurrentDoctor = true;
        } else {
            this.isClickedEdit = true;
        }

        this.getModalityProcedureData(this.procedureResultModel.ModalityProcedureId);
    }

    // ===========================
    // Get Modality Procedure Data
    // ===========================
    public getModalityProcedureData(modalityProcedureId: number): void {
        this.procedureService.getModalityProcedure();
        this.modalityProcedureSubscription = this.procedureService.modalityProcedureObservable.subscribe(
            data => {
                let modalityProcedureObservableArray = new ObservableArray();

                if (data != null) {
                    for (var i = 0; i <= data.length - 1; i++) {
                        modalityProcedureObservableArray.push({
                            Id: data[i].Id,
                            ModalityProcedure: data[i].ModalityProcedure,
                            ModalityProcedureResultTemplate: data[i].ModalityProcedure + " - " + data[i].ModalityResultTemplate,
                            ModalityResultTemplate: data[i].ModalityResultTemplate
                        });
                    }
                }

                this.cboModalityProcedureObservableArray = modalityProcedureObservableArray;

                setTimeout(() => {
                    this.procedureResultModel.ModalityProcedureId = modalityProcedureId;
                }, 1000);
            }
        );
    }

    // ======================================
    // Modality Procedure On Selection Change
    // ======================================
    public cboModalityProcedureOnSelectionChange(event): void {
        if (event.isUserInput) {
            let currentModalityProcedureId = event.source.value;
            if (currentModalityProcedureId == undefined) {
                this.procedureResultModel.Result = "";
            } else {
                if (!this.isClickedEdit) {
                    this.procedureResultModel.Result = this.cboModalityProcedureObservableArray.filter(cboModality => cboModality.Id === currentModalityProcedureId)[0].ModalityResultTemplate;
                } else {
                    this.isClickedEdit = false;
                }
            }
        }
    }

    // =====================
    // Save Procedure Result
    // =====================
    public btnSaveProcedureResultClick(): void {
        let btnSaveProcedureResult: Element = document.getElementById("btnSaveProcedureResult");
        btnSaveProcedureResult.setAttribute("disabled", "disabled");
        btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Saving...";

        let btnCloseProcedureResult: Element = document.getElementById("btnCloseProcedureResult");
        btnCloseProcedureResult.setAttribute("disabled", "disabled");

        this.procedureService.saveProcedureResult(this.procedureResultModel);
        this.procedureResultSubscription = this.procedureService.procedureResultSavedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.detailProcedureResultDialogRef.close(200);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                } else if (data == 404) {
                    this.detailProcedureResultDialogRef.close(404);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                } else if (data == 400) {
                    this.detailProcedureResultDialogRef.close(400);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                } else if (data == 500) {
                    this.detailProcedureResultDialogRef.close(500);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                }
            }
        );
    }

    // =============================
    // Close Procedure Result Dialog
    // =============================
    public btnCloseProcedureResultClick(): void {
        this.detailProcedureResultDialogRef.close();

        if (this.procedureResultSubscription != null) this.procedureResultSubscription.unsubscribe();
        // if (this.modalityProcedureSubscription != null) this.modalityProcedureSubscription.unsubscribe();
    }
}