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

@Component({
    selector: 'app-rate-delete-dialog',
    templateUrl: './rate-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class RateDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'Delete Body Part';

    // ================================
    // Body Parts Async Task Properties
    // ================================
    public rateSubscription: any;

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
        public deleteRateDialogRef: MatDialogRef<RateDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private rateService: RateService
    ) {
        this.title = data.objRateDeleteDialogTitle;
        this.rateModel.Id = data.objCurrentRate.Id;
    }

    // =========================
    // Confirm Delete Body Parts
    // =========================
    public btnConfirmDeleteRateClick(): void {
        let btnConfirmDeleteRate: Element = document.getElementById("btnConfirmDeleteRate");
        btnConfirmDeleteRate.setAttribute("disabled", "disabled");
        btnConfirmDeleteRate.innerHTML = "<i class='fa fa-trash fa-fw'></i> Deleting...";

        let btnCloseConfirmDeleteRate: Element = document.getElementById("btnCloseConfirmDeleteRate");
        btnCloseConfirmDeleteRate.setAttribute("disabled", "disabled");

        this.rateService.deleteRate(this.rateModel.Id);
        this.rateSubscription = this.rateService.rateDeletedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.deleteRateDialogRef.close(200);
                    btnConfirmDeleteRate.removeAttribute("disabled");
                    btnConfirmDeleteRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteRate.removeAttribute("disabled");
                } else if (data == 404) {
                    this.deleteRateDialogRef.close(404);
                    btnConfirmDeleteRate.removeAttribute("disabled");
                    btnConfirmDeleteRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteRate.removeAttribute("disabled");
                } else if (data == 400) {
                    this.deleteRateDialogRef.close(400);
                    btnConfirmDeleteRate.removeAttribute("disabled");
                    btnConfirmDeleteRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteRate.removeAttribute("disabled");
                } else if (data == 500) {
                    this.deleteRateDialogRef.close(500);
                    btnConfirmDeleteRate.removeAttribute("disabled");
                    btnConfirmDeleteRate.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteRate.removeAttribute("disabled");
                }
            }
        );
    }
}
