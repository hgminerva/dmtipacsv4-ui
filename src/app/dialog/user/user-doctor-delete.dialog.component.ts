// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { UserDoctorModel } from '../../model/user-doctor.model';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'app-user-doctor-delete-dialog',
    templateUrl: './user-doctor-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class UserDoctorDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'Delete Body Part';

    // ================================
    // Body Parts Async Task Properties
    // ================================
    public userDoctorSubscription: any;

    // ================
    // Initialize Model
    // ================
    public userDoctorModel: UserDoctorModel = {
        Id: 0,
        UserId: 0,
        DoctorId: 0,
    };

    // ===========
    // Constructor
    // ===========
    constructor(
        public deleteUserDoctorDialogRef: MatDialogRef<UserDoctorDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService
    ) {
        this.title = data.objUserDoctorDeleteDialogTitle;
        this.userDoctorModel.Id = data.objCurrentUserDoctor.Id;
    }

    // =========================
    // Confirm Delete Body Parts
    // =========================
    public btnConfirmDeleteUserDoctorClick(): void {
        let btnConfirmDeleteUserDoctor: Element = document.getElementById("btnConfirmDeleteUserDoctor");
        btnConfirmDeleteUserDoctor.setAttribute("disabled", "disabled");
        btnConfirmDeleteUserDoctor.innerHTML = "<i class='fa fa-trash fa-fw'></i> Deleting...";

        let btnCloseConfirmDeleteUserDoctor: Element = document.getElementById("btnCloseConfirmDeleteUserDoctor");
        btnCloseConfirmDeleteUserDoctor.setAttribute("disabled", "disabled");

        this.userService.deleteUserDoctor(this.userDoctorModel.Id);
        this.userDoctorSubscription = this.userService.userDoctorDeletedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.deleteUserDoctorDialogRef.close(200);
                    btnConfirmDeleteUserDoctor.removeAttribute("disabled");
                    btnConfirmDeleteUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteUserDoctor.removeAttribute("disabled");
                } else if (data == 404) {
                    this.deleteUserDoctorDialogRef.close(404);
                    btnConfirmDeleteUserDoctor.removeAttribute("disabled");
                    btnConfirmDeleteUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteUserDoctor.removeAttribute("disabled");
                } else if (data == 400) {
                    this.deleteUserDoctorDialogRef.close(400);
                    btnConfirmDeleteUserDoctor.removeAttribute("disabled");
                    btnConfirmDeleteUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteUserDoctor.removeAttribute("disabled");
                } else if (data == 500) {
                    this.deleteUserDoctorDialogRef.close(500);
                    btnConfirmDeleteUserDoctor.removeAttribute("disabled");
                    btnConfirmDeleteUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseConfirmDeleteUserDoctor.removeAttribute("disabled");
                }
            }
        );
    }
}
