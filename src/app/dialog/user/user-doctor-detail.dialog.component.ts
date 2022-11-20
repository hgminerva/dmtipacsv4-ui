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

import { ObservableArray } from 'wijmo/wijmo';

@Component({
    selector: 'app-user-doctor-detail-dialog',
    templateUrl: './user-doctor-detail.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class UserDoctorDetailDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'modality procedure detail dialog';

    // =================================
    // User Doctor Async Task Properties
    // =================================
    public userDoctorSubscription: any;
    public doctorSubscription: any;
    public cboDoctorObservableArray: ObservableArray;

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
        public detailUserDoctorDialogRef: MatDialogRef<UserDoctorDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userDoctorService: UserService
    ) {
        this.title = data.objUserDoctorDetailDialogTitle;
        this.userDoctorModel.Id = data.objCurrentUserDoctor.Id;
        this.userDoctorModel.UserId = data.objCurrentUserDoctor.UserId;
        this.userDoctorModel.DoctorId = data.objCurrentUserDoctor.DoctorId;

        this.geDoctorData(this.userDoctorModel.DoctorId);
    }

    // ===============
    // Get Doctor Data
    // ===============
    public geDoctorData(doctorId: number): void {
        this.userDoctorService.getDoctor();
        this.doctorSubscription = this.userDoctorService.doctorObservable.subscribe(
            data => {
                let doctorObservableArray = new ObservableArray();

                if (data.length > 0) {
                    for (var i = 0; i <= data.length - 1; i++) {
                        doctorObservableArray.push({
                            Id: data[i].Id,
                            FullName: data[i].FullName,
                        });
                    }
                }

                this.cboDoctorObservableArray = doctorObservableArray;

                setTimeout(() => {
                    this.userDoctorModel.DoctorId = doctorId;
                }, 1000);
            }
        );
    }

    // ================
    // Save User Doctor
    // ================
    public btnSaveUserDoctorClick(): void {
        let btnSaveUserDoctor: Element = document.getElementById("btnSaveUserDoctor");
        btnSaveUserDoctor.setAttribute("disabled", "disabled");
        btnSaveUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Saving...";

        let btnCloseUserDoctor: Element = document.getElementById("btnCloseUserDoctor");
        btnCloseUserDoctor.setAttribute("disabled", "disabled");

        this.userDoctorService.saveUserDoctor(this.userDoctorModel);
        this.userDoctorSubscription = this.userDoctorService.userDoctorSavedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.detailUserDoctorDialogRef.close(200);
                    btnSaveUserDoctor.removeAttribute("disabled");
                    btnSaveUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseUserDoctor.removeAttribute("disabled");
                } else if (data == 404) {
                    this.detailUserDoctorDialogRef.close(404);
                    btnSaveUserDoctor.removeAttribute("disabled");
                    btnSaveUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseUserDoctor.removeAttribute("disabled");
                } else if (data == 400) {
                    this.detailUserDoctorDialogRef.close(400);
                    btnSaveUserDoctor.removeAttribute("disabled");
                    btnSaveUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseUserDoctor.removeAttribute("disabled");
                } else if (data == 500) {
                    this.detailUserDoctorDialogRef.close(500);
                    btnSaveUserDoctor.removeAttribute("disabled");
                    btnSaveUserDoctor.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseUserDoctor.removeAttribute("disabled");
                }
            }
        );
    }

    // ========================
    // Close User Doctor Dialog
    // ========================
    public btnCloseUserDoctorClick(): void {
        this.detailUserDoctorDialogRef.close();

        if (this.userDoctorSubscription != null) this.userDoctorSubscription.unsubscribe();
        if (this.doctorSubscription != null) this.doctorSubscription.unsubscribe();
    }
}
