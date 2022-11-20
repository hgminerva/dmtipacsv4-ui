// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// ========
// Material
// ========
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

// =============
// Wijmo Modules
// =============
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// ===================
// Software Components
// ===================
import { FacilityDialogComponent } from '../dialog/facility/facility.dialog.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModalityProcedureComponent } from '../modality-procedure/modality-procedure.component';
import { ModalityProcedureDetailDialogComponent } from '../dialog/modality-procedure/modality-procedure-detail.dialog.component';
import { ModalityProcedureDeleteDialogComponent } from '../dialog/modality-procedure/modality-procedure-delete.dialog.component';
import { BodyPartsComponent } from '../body-parts/body-parts.component';
import { BodyPartsDetailDialogComponent } from '../dialog/body-parts/body-parts-detail.dialog.component';
import { BodyPartsDeleteDialogComponent } from '../dialog/body-parts/body-parts-delete.dialog.component';
import { UserComponent } from '../user/user.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDoctorDetailDialogComponent } from '../dialog/user/user-doctor-detail.dialog.component';
import { UserDoctorDeleteDialogComponent } from '../dialog/user/user-doctor-delete.dialog.component';
import { RateComponent } from '../rate/rate.component';
import { RateDetailDialogComponent } from '../dialog/rate/rate-detail.dialog.component';
import { RateDeleteDialogComponent } from '../dialog/rate/rate-delete.dialog.component';
import { ProcedureComponent } from '../procedure/procedure.component';
import { ProcedureDetailComponent } from '../procedure/procedure-detail.component';
import { ProcedureDeleteDialogComponent } from '../dialog/procedure/procedure-delete.dialog.component';
import { ProcedureResultDetailDialogComponent } from '../dialog/procedure/procedure-result-detail.dialog.component';
import { ProcedureResultDeleteDialogComponent } from '../dialog/procedure/procedure-result-delete.dialog.component';
import { ProcedureResultPDFDetailPDFDialogComponent } from '../dialog/procedure/procedure-result-detail-pdf.dialog.component';
import { ReportsComponent } from '../reports/reports.component';
import { ForbiddenComponent } from '../forbidden/forbidden.component';

// ========
// Services
// ========
import { LayoutService } from '../layout/layout.service';
import { ModalityProcedureService } from '../modality-procedure/modality-procedure.service';
import { BodyPartsService } from '../body-parts/body-parts.service';
import { RateService } from '../rate/rate.service';
import { UserService } from '../user/user.service';
import { ReportService } from '../reports/reports.service';
import { ProcedureService } from '../procedure/procedure.service';

@NgModule({
    declarations: [
        FacilityDialogComponent,
        DashboardComponent,
        ModalityProcedureComponent, ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
        BodyPartsComponent, BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
        UserComponent, UserDetailComponent, UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
        RateComponent, RateDetailDialogComponent, RateDeleteDialogComponent,
        ProcedureComponent, ProcedureDetailComponent, ProcedureDeleteDialogComponent, ProcedureResultDetailDialogComponent, ProcedureResultDeleteDialogComponent, ProcedureResultPDFDetailPDFDialogComponent,
        ReportsComponent,
        ForbiddenComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule,
        MatButtonModule, MatProgressBarModule, MatProgressSpinnerModule, MatInputModule, MatDialogModule, MatTabsModule, MatAutocompleteModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatNativeDateModule,
        WjGridFilterModule, WjGridModule, WjInputModule
    ],
    exports: [
        DashboardComponent,
        ModalityProcedureComponent, ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
        BodyPartsComponent, BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
        UserComponent, UserDetailComponent, UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
        RateComponent, RateDetailDialogComponent, RateDeleteDialogComponent,
        ProcedureComponent, ProcedureDetailComponent, ProcedureDeleteDialogComponent, ProcedureResultDetailDialogComponent, ProcedureResultDeleteDialogComponent, ProcedureResultPDFDetailPDFDialogComponent,
        ReportsComponent,
        MatButtonModule, MatProgressBarModule, MatProgressSpinnerModule, MatInputModule, MatDialogModule, MatTabsModule, MatAutocompleteModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatNativeDateModule,
        WjGridFilterModule, WjGridModule, WjInputModule
    ],
    providers: [
        LayoutService,
        ModalityProcedureService,
        BodyPartsService,
        RateService,
        UserService,
        ReportService,
        ProcedureService
    ],
    entryComponents: [
        FacilityDialogComponent,
        ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
        BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
        RateDetailDialogComponent, RateDeleteDialogComponent,
        UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
        ProcedureDeleteDialogComponent, ProcedureResultDetailDialogComponent, ProcedureResultDeleteDialogComponent, ProcedureResultPDFDetailPDFDialogComponent
    ]
})
export class LayoutModule { }