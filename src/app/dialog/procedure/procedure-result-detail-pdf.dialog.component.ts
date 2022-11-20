// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ProcedureService } from '../../procedure/procedure.service';

@Component({
    selector: 'app-procedure-result-detail-pdf-dialog',
    templateUrl: './procedure-result-detail-pdf.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureResultPDFDetailPDFDialogComponent {
    title = 'Print Result';
    pdfSrc: string;
    procedureResultId: number;
    isBtnPrintDisabled: Boolean = true;
    isPDFProgressSpinnerHidden: Boolean = false;
    isPDFContentHidden: Boolean = true;

    // =================
    // Public Properties
    // =================
    public procedureResultPDFSubscription: any;
    public procedureResultPDFURL: string;

    // ===========
    // Constructor
    // ===========
    constructor(
        public detailProcedureResultPDFDialogRef: MatDialogRef<ProcedureResultPDFDetailPDFDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private procedureService: ProcedureService
    ) {
        this.title = data.objProcedureResultDetailPDFDialogTitle;
        this.procedureResultId = data.id;
        this.procedureResultPDF(this.procedureResultId);
    }

    // ===
    // PDF
    // ===
    public procedureResultPDF(id: number): void {
        this.procedureService.getProcedureResultPDF(id)
        this.procedureResultPDFSubscription = this.procedureService.procedureResultPDFObservable.subscribe(
            data => {
                this.procedureResultPDFURL = URL.createObjectURL(data);

                let printPDF: Element = document.getElementById("printPDF");
                printPDF.setAttribute("src", this.procedureResultPDFURL);

                this.isPDFProgressSpinnerHidden = true;
                this.isPDFContentHidden = false;
                this.isBtnPrintDisabled = false;
            }
        );
    }

    // =====
    // Print
    // =====
    public btnPrintrocedureResultPDFClick(): void {
        window.frames["printPDF"].focus();
        window.frames["printPDF"].print();
    }

    // =============================
    // Close Procedure Result Dialog
    // =============================
    public btnCloseProcedureResultPDFClick(): void {
        this.detailProcedureResultPDFDialogRef.close();
        if (this.procedureResultPDFSubscription != null) this.procedureResultPDFSubscription.unsubscribe();
    }
}