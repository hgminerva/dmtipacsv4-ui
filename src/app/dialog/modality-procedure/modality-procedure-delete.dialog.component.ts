// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ModalityProcedureModel } from '../../model/modality-procedure.model';
import { ModalityProcedureService } from '../../modality-procedure/modality-procedure.service';

@Component({
    selector: 'app-modality-procedure-delete-dialog',
    templateUrl: './modality-procedure-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ModalityProcedureDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'Delete Modality Procedure';

    // ========================================
    // Modality Procedure Async Task Properties
    // ========================================
    public modalityProcedureSubscription: any;

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

    // ===========
    // Constructor
    // ===========
    constructor(
        public deleteModalityProcedureDialogRef: MatDialogRef<ModalityProcedureDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private modalityProcedureService: ModalityProcedureService
    ) {
        this.title = data.objModalityProcedureDeleteDialogTitle;
        this.modalityProcedureModel.Id = data.objCurrentModalityProcedure.Id;
    }

    // =================================
    // Confirm Delete Modality Procedure
    // =================================
    public btnConfirmDeleteModalityProcedureClick(): void {
        let btnConfirmDeleteModalityProcedure: Element = document.getElementById("btnConfirmDeleteModalityProcedure");
        btnConfirmDeleteModalityProcedure.setAttribute("disabled", "disabled");
        btnConfirmDeleteModalityProcedure.innerHTML = "<i class='fa fa-trash fa-fw'></i> Deleting...";
    
        let btnCloseConfirmDeleteModalityProcedure: Element = document.getElementById("btnCloseConfirmDeleteModalityProcedure");
        btnCloseConfirmDeleteModalityProcedure.setAttribute("disabled", "disabled");

        this.modalityProcedureService.deleteModalityProcedure(this.modalityProcedureModel.Id);
        this.modalityProcedureSubscription = this.modalityProcedureService.modalityProcedureDeletedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.deleteModalityProcedureDialogRef.close(200);
                    btnConfirmDeleteModalityProcedure.removeAttribute("disabled");
                    btnConfirmDeleteModalityProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteModalityProcedure.removeAttribute("disabled");
                } else if (data == 404) {
                    this.deleteModalityProcedureDialogRef.close(404);
                    btnConfirmDeleteModalityProcedure.removeAttribute("disabled");
                    btnConfirmDeleteModalityProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteModalityProcedure.removeAttribute("disabled");
                } else if (data == 400) {
                    this.deleteModalityProcedureDialogRef.close(400);
                    btnConfirmDeleteModalityProcedure.removeAttribute("disabled");
                    btnConfirmDeleteModalityProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteModalityProcedure.removeAttribute("disabled");
                } else if (data == 500) {
                    this.deleteModalityProcedureDialogRef.close(500);
                    btnConfirmDeleteModalityProcedure.removeAttribute("disabled");
                    btnConfirmDeleteModalityProcedure.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteModalityProcedure.removeAttribute("disabled");
                }
            }
        );
    }
}
