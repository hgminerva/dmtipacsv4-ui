// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { BodyPartsModel } from '../../model/body-parts.model';
import { BodyPartsService } from '../../body-parts/body-parts.service';

@Component({
    selector: 'app-body-parts-delete-dialog',
    templateUrl: './body-parts-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class BodyPartsDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'Delete Body Part';

    // ================================
    // Body Parts Async Task Properties
    // ================================
    public bodyPartsSubscription: any;

    // ================
    // Initialize Model
    // ================
    public bodyPartsModel: BodyPartsModel = {
        Id: 0,
        BodyPart: ""
    };

    // ===========
    // Constructor
    // ===========
    constructor(
        public deleteBodyPartsDialogRef: MatDialogRef<BodyPartsDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bodyPartsService: BodyPartsService
    ) {
        this.title = data.objBodyPartsDeleteDialogTitle;
        this.bodyPartsModel.Id = data.objCurrentBodyParts.Id;
    }

    // =========================
    // Confirm Delete Body Parts
    // =========================
    public btnConfirmDeleteBodyPartsClick(): void {
        let btnConfirmDeleteBodyParts: Element = document.getElementById("btnConfirmDeleteBodyParts");
        btnConfirmDeleteBodyParts.setAttribute("disabled", "disabled");
        btnConfirmDeleteBodyParts.innerHTML = "<i class='fa fa-trash fa-fw'></i> Deleting...";

        let btnCloseConfirmDeleteBodyParts: Element = document.getElementById("btnCloseConfirmDeleteBodyParts");
        btnCloseConfirmDeleteBodyParts.setAttribute("disabled", "disabled");

        this.bodyPartsService.deleteBodyParts(this.bodyPartsModel.Id);
        this.bodyPartsSubscription = this.bodyPartsService.bodyPartsDeletedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.deleteBodyPartsDialogRef.close(200);
                    btnConfirmDeleteBodyParts.removeAttribute("disabled");
                    btnConfirmDeleteBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteBodyParts.removeAttribute("disabled");
                } else if (data == 404) {
                    this.deleteBodyPartsDialogRef.close(404);
                    btnConfirmDeleteBodyParts.removeAttribute("disabled");
                    btnConfirmDeleteBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteBodyParts.removeAttribute("disabled");
                } else if (data == 400) {
                    this.deleteBodyPartsDialogRef.close(400);
                    btnConfirmDeleteBodyParts.removeAttribute("disabled");
                    btnConfirmDeleteBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteBodyParts.removeAttribute("disabled");
                } else if (data == 500) {
                    this.deleteBodyPartsDialogRef.close(500);
                    btnConfirmDeleteBodyParts.removeAttribute("disabled");
                    btnConfirmDeleteBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteBodyParts.removeAttribute("disabled");
                }
            }
        );
    }
}
