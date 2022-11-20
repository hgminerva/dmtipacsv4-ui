// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ProcedureModel } from '../../model/procedure.model';
import { ProcedureService } from '../../procedure/procedure.service';

@Component({
    selector: 'app-procedure-delete-dialog',
    templateUrl: './procedure-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'Delete Body Part';

    // ================================
    // Procedure Async Task Properties
    // ================================
    public procedureSubscription: any;

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

    // ===========
    // Constructor
    // ===========
    constructor(
        public deleteProcedureDialogRef: MatDialogRef<ProcedureDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private procedureService: ProcedureService
    ) {
        this.title = data.objProcedureDeleteDialogTitle;
        this.procedureModel.Id = data.objCurrentProcedure.Id;
    }

    // ========================
    // Confirm Delete Procedure
    // ========================
    public btnConfirmDeleteProcedureClick(): void {
        let btnConfirmDeleteProcedure: Element = document.getElementById("btnConfirmDeleteProcedure");
        btnConfirmDeleteProcedure.setAttribute("disabled", "disabled");
        btnConfirmDeleteProcedure.innerHTML = "<i class='fa fa-trash fa-fw'></i> Deleting...";

        let btnCloseConfirmDeleteProcedure: Element = document.getElementById("btnCloseConfirmDeleteProcedure");
        btnCloseConfirmDeleteProcedure.setAttribute("disabled", "disabled");

        this.procedureService.deleteProcedure(this.procedureModel.Id);
        this.procedureSubscription = this.procedureService.procedureDeletedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.deleteProcedureDialogRef.close(200);
                    btnConfirmDeleteProcedure.removeAttribute("disabled");
                    btnConfirmDeleteProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedure.removeAttribute("disabled");
                } else if (data == 404) {
                    this.deleteProcedureDialogRef.close(404);
                    btnConfirmDeleteProcedure.removeAttribute("disabled");
                    btnConfirmDeleteProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedure.removeAttribute("disabled");
                } else if (data == 400) {
                    this.deleteProcedureDialogRef.close(400);
                    btnConfirmDeleteProcedure.removeAttribute("disabled");
                    btnConfirmDeleteProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedure.removeAttribute("disabled");
                } else if (data == 500) {
                    this.deleteProcedureDialogRef.close(500);
                    btnConfirmDeleteProcedure.removeAttribute("disabled");
                    btnConfirmDeleteProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteProcedure.removeAttribute("disabled");
                }
            }
        );
    }
}
