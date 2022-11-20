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

import { ObservableArray } from 'wijmo/wijmo';

@Component({
    selector: 'app-body-parts-detail-dialog',
    templateUrl: './body-parts-detail.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class BodyPartsDetailDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'modality procedure detail dialog';

    // ========================================
    // Body Part Async Task Properties
    // ========================================
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
        public detailBodyPartsDialogRef: MatDialogRef<BodyPartsDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bodyPartsService: BodyPartsService
    ) {
        this.title = data.objModalityDetailProcedureDialogTitle;
        this.bodyPartsModel.Id = data.objCurrentBodyParts.Id;
        this.bodyPartsModel.BodyPart = data.objCurrentBodyParts.BodyPart;
    }

    // ==============
    // Save Body Part
    // ==============
    public btnSaveBodyPartsClick(): void {
        let btnSaveBodyParts: Element = document.getElementById("btnSaveBodyParts");
        btnSaveBodyParts.setAttribute("disabled", "disabled");
        btnSaveBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Saving...";

        let btnCloseBodyParts: Element = document.getElementById("btnCloseBodyParts");
        btnCloseBodyParts.setAttribute("disabled", "disabled");

        this.bodyPartsService.saveBodyParts(this.bodyPartsModel);
        this.bodyPartsSubscription = this.bodyPartsService.bodyPartsSavedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.detailBodyPartsDialogRef.close(200);
                    btnSaveBodyParts.removeAttribute("disabled");
                    btnSaveBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseBodyParts.removeAttribute("disabled");
                } else if (data == 404) {
                    this.detailBodyPartsDialogRef.close(404);
                    btnSaveBodyParts.removeAttribute("disabled");
                    btnSaveBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseBodyParts.removeAttribute("disabled");
                } else if (data == 400) {
                    this.detailBodyPartsDialogRef.close(400);
                    btnSaveBodyParts.removeAttribute("disabled");
                    btnSaveBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseBodyParts.removeAttribute("disabled");
                } else if (data == 500) {
                    this.detailBodyPartsDialogRef.close(500);
                    btnSaveBodyParts.removeAttribute("disabled");
                    btnSaveBodyParts.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseBodyParts.removeAttribute("disabled");
                }
            }
        );
    }

    // ======================
    // Close Body Part Dialog
    // ======================
    public btnCloseBodyPartsClick(): void {
        this.detailBodyPartsDialogRef.close();

        if (this.bodyPartsSubscription != null) this.bodyPartsSubscription.unsubscribe();
    }
}
