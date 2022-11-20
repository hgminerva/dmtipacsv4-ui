// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { RateModel } from '../../model/rate.model';
import { RateService } from '../../rate/rate.service';

import { ObservableArray } from 'wijmo/wijmo';

@Component({
    selector: 'app-rate-detail-dialog',
    templateUrl: './rate-detail.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class RateDetailDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'modality procedure detail dialog';

    // ==========================
    // Rate Async Task Properties
    // ==========================
    public rateSubscription: any;
    public modalityProcedureSubscription: any;
    public cboModalityProcedureObservableArray: ObservableArray;

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
        public detailRateDialogRef: MatDialogRef<RateDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private rateService: RateService
    ) {
        this.title = data.objModalityDetailProcedureDialogTitle;
        this.rateModel.Id = data.objCurrentRate.Id;
        this.rateModel.UserId = data.objCurrentRate.UserId;
        this.rateModel.ModalityProcedureId = data.objCurrentRate.ModalityProcedureId;
        this.rateModel.ModalityProcedureCode = data.objCurrentRate.ModalityProcedureCode;
        this.rateModel.FacilityRate = data.objCurrentRate.FacilityRate;
        this.rateModel.DoctorRate = data.objCurrentRate.DoctorRate;
        this.rateModel.ImageRate = data.objCurrentRate.ImageRate;
        this.rateModel.Remarks = data.objCurrentRate.Remarks;

        this.getModalityProcedureData(this.rateModel.ModalityProcedureId);
    }

    // ===========================
    // Get Modality Procedure Data
    // ===========================
    public getModalityProcedureData(modalityProcedureId: number): void {
        this.rateService.getModalityProcedure();
        this.modalityProcedureSubscription = this.rateService.modalityProcedureObservable.subscribe(
            data => {
                let modalityProcedureObservableArray = new ObservableArray();

                if (data.length > 0) {
                    for (var i = 0; i <= data.length - 1; i++) {
                        modalityProcedureObservableArray.push({
                            Id: data[i].Id,
                            ModalityProcedure: data[i].ModalityProcedure,
                            ModalityProcedureResultTemplate: data[i].ModalityProcedure + " - " + data[i].ModalityResultTemplate,
                        });
                    }
                }

                this.cboModalityProcedureObservableArray = modalityProcedureObservableArray;

                setTimeout(() => {
                    this.rateModel.ModalityProcedureId = modalityProcedureId;
                }, 1000);
            }
        );
    }

    // =========
    // Save Rate
    // =========
    public btnSaveRateClick(): void {
        let btnSaveRate: Element = document.getElementById("btnSaveRate");
        btnSaveRate.setAttribute("disabled", "disabled");
        btnSaveRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Saving...";

        let btnCloseRate: Element = document.getElementById("btnCloseRate");
        btnCloseRate.setAttribute("disabled", "disabled");

        this.rateService.saveRate(this.rateModel);
        this.rateSubscription = this.rateService.rateSavedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.detailRateDialogRef.close(200);
                    btnSaveRate.removeAttribute("disabled");
                    btnSaveRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseRate.removeAttribute("disabled");
                } else if (data == 404) {
                    this.detailRateDialogRef.close(404);
                    btnSaveRate.removeAttribute("disabled");
                    btnSaveRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseRate.removeAttribute("disabled");
                } else if (data == 400) {
                    this.detailRateDialogRef.close(400);
                    btnSaveRate.removeAttribute("disabled");
                    btnSaveRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseRate.removeAttribute("disabled");
                } else if (data == 500) {
                    this.detailRateDialogRef.close(500);
                    btnSaveRate.removeAttribute("disabled");
                    btnSaveRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseRate.removeAttribute("disabled");
                }
            }
        );
    }

    // =================
    // Close Rate Dialog
    // ==================
    public btnCloseRateClick(): void {
        this.detailRateDialogRef.close();

        if (this.rateSubscription != null) this.rateSubscription.unsubscribe();
        if (this.modalityProcedureSubscription != null) this.modalityProcedureSubscription.unsubscribe();
    }
}
