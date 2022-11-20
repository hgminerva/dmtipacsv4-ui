// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ProcedureResultModel } from '../../model/procedure-result.model';
import { ProcedureService } from '../../procedure/procedure.service';

@Component({
    selector: 'app-procedure-result-delete-dialog',
    templateUrl: './procedure-result-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureResultDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'Delete Procedure Result';

    // ================================
    // Procedure Result Async Task Properties
    // ================================
    public procedureResultSubscription: any;

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
        public deleteProcedureResultDialogRef: MatDialogRef<ProcedureResultDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private procedureResultService: ProcedureService
    ) {
        this.title = data.objProcedureResultDeleteDialogTitle;
        this.procedureResultModel.Id = data.objCurrentProcedureResult.Id;
    }

    // ===============================
    // Confirm Delete Procedure Result
    // ===============================
    public btnConfirmDeleteProcedureResultClick(): void {
        let btnConfirmDeleteProcedureResult: Element = document.getElementById("btnConfirmDeleteProcedureResult");
        btnConfirmDeleteProcedureResult.setAttribute("disabled", "disabled");
        btnConfirmDeleteProcedureResult.innerHTML = "<i class='fa fa-trash fa-fw'></i> Deleting...";

        let btnCloseConfirmDeleteProcedureResult: Element = document.getElementById("btnCloseConfirmDeleteProcedureResult");
        btnCloseConfirmDeleteProcedureResult.setAttribute("disabled", "disabled");

        this.procedureResultService.deleteProcedureResult(this.procedureResultModel.Id);
        this.procedureResultSubscription = this.procedureResultService.procedureResultDeletedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.deleteProcedureResultDialogRef.close(200);
                    btnConfirmDeleteProcedureResult.removeAttribute("disabled");
                    btnConfirmDeleteProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedureResult.removeAttribute("disabled");
                } else if (data == 404) {
                    this.deleteProcedureResultDialogRef.close(404);
                    btnConfirmDeleteProcedureResult.removeAttribute("disabled");
                    btnConfirmDeleteProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedureResult.removeAttribute("disabled");
                } else if (data == 400) {
                    this.deleteProcedureResultDialogRef.close(400);
                    btnConfirmDeleteProcedureResult.removeAttribute("disabled");
                    btnConfirmDeleteProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedureResult.removeAttribute("disabled");
                } else if (data == 500) {
                    this.deleteProcedureResultDialogRef.close(500);
                    btnConfirmDeleteProcedureResult.removeAttribute("disabled");
                    btnConfirmDeleteProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedureResult.removeAttribute("disabled");
                }
            }
        );
    }
}