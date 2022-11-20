// ====================
// Angular and Material
// ====================
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Service
// =======
import { UserService } from './user.service';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// =======
// Dialogs
// =======
import { UserDoctorDetailDialogComponent } from '../dialog/user/user-doctor-detail.dialog.component';
import { UserDoctorDeleteDialogComponent } from '../dialog/user/user-doctor-delete.dialog.component';

// =====
// Model
// =====
import { UserModel } from '../model/user.model';
import { UserDoctorModel } from '../model/user-doctor.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user.component.css', '../layout/layout.component.css']
})
export class UserDetailComponent {
  title = 'user detail';
  isUserDoctorProgressBarHidden = false;

  // ==========================
  // User Async Task Properties
  // ==========================
  public userSubscription: any;
  public userTypeSubscription: any;
  public cboUserTypeObservableArray: ObservableArray;

  // ================
  // Initialize Model
  // ================
  public userModel: UserModel = {
    Id: 0,
    Email: "",
    UserName: "",
    FullName: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
    ContactNumber: "",
    UserTypeId: 0
  };
  public userDoctorModel: UserDoctorModel = {
    Id: 0,
    UserId: 0,
    DoctorId: 0,
  };

  // =================================
  // User Doctor Async Task Properties
  // =================================
  public userDoctorSubscription: any;
  public userDoctorData: ObservableArray = new ObservableArray();
  public userDoctorCollectionView: CollectionView = new CollectionView(this.userDoctorData);

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  // =======================
  // Get Parameter Id Method
  // =======================
  private getId(): number {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params["id"];
    });
    return id;
  }

  // ====================
  // Get User Detail Data
  // ====================
  public getUserDetailData() {
    this.userService.getUserDetail(this.getId());

    this.userSubscription = this.userService.userDetailObservable
      .subscribe(
        data => {
          this.userModel.Id = data.Id;
          this.userModel.UserName = data.UserName;
          this.userModel.FullName = data.FullName;
          this.userModel.Address = data.Address;
          this.userModel.ContactNumber = data.ContactNumber;
          this.userModel.UserTypeId = data.UserTypeId;

          this.getUserTypeData(this.userModel.UserTypeId);
        }
      );
  }

  // ==================
  // Get User Type Data
  // ==================
  public getUserTypeData(userTypeId: number): void {
    this.userService.getUserType();
    this.userTypeSubscription = this.userService.userTypeObservable.subscribe(
      data => {
        let modalityObservableArray = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            modalityObservableArray.push({
              Id: data[i].Id,
              UserType: data[i].UserType,
            });
          }
        }

        this.cboUserTypeObservableArray = modalityObservableArray;

        setTimeout(() => {
          this.userModel.UserTypeId = userTypeId;
        }, 1000);
      }
    );
  }

  // ===========
  // Update User
  // ===========
  public updateUserClick() {
    let btnUpdateUser: Element = document.getElementById("btnUpdateUser");
    btnUpdateUser.setAttribute("disabled", "disabled");
    btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Updating...";

    let btnCloseUser: Element = document.getElementById("btnCloseUser");
    btnCloseUser.setAttribute("disabled", "disabled");

    this.userService.updateUser(this.userModel);
    this.userSubscription = this.userService.userUpdateObservable.subscribe(
      data => {
        if (data == 200) {
          this.toastr.success("Update Successful!");
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        } else if (data == 404) {
          this.toastr.error('Not Found!');
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        } else if (data == 400) {
          this.toastr.error('Bad Request!');
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        } else if (data == 500) {
          this.toastr.error('Internal Server Error!');
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        }
      }
    );
  }

  // ====================
  // Get User Doctor Data
  // ====================
  public getUserDoctorData(): void {
    this.userDoctorData = new ObservableArray();
    this.userDoctorCollectionView = new CollectionView(this.userDoctorData);
    this.userDoctorCollectionView.pageSize = 15;
    this.userDoctorCollectionView.trackChanges = true;

    this.isUserDoctorProgressBarHidden = false;

    this.userService.getUserDoctor(this.getId());
    this.userDoctorSubscription = this.userService.userDoctorObservable.subscribe(
      data => {
        if (data != null) {
          this.userDoctorData = data;
          this.userDoctorCollectionView = new CollectionView(this.userDoctorData);
          this.userDoctorCollectionView.pageSize = 15;
          this.userDoctorCollectionView.trackChanges = true;
        }

        this.isUserDoctorProgressBarHidden = true;
      }
    );
  }

  // ===============
  // Add User Doctor
  // ===============
  public btnAddUserDoctorClick(): void {
    this.userDoctorModel.Id = 0;
    this.userDoctorModel.UserId = this.getId();
    this.userDoctorModel.DoctorId = 0;

    let detailUserDoctorDialogRef = this.dialog.open(UserDoctorDetailDialogComponent, {
      width: '600px',
      data: {
        objUserDoctorDetailDialogTitle: "Add User Doctor",
        objCurrentUserDoctor: this.userDoctorModel
      }
    });

    detailUserDoctorDialogRef.disableClose = true;
    detailUserDoctorDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Save Successful!');
        this.getUserDoctorData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ================
  // Edit User Doctor
  // ================
  public btnEditUserDoctorClick(): void {
    let currentUserDoctor = this.userDoctorCollectionView.currentItem;
    this.userDoctorModel.Id = currentUserDoctor.Id;
    this.userDoctorModel.UserId = this.getId();
    this.userDoctorModel.DoctorId = currentUserDoctor.DoctorId;

    let detailUserDoctorDialogRef = this.dialog.open(UserDoctorDetailDialogComponent, {
      width: '800px',
      data: {
        objUserDoctorDetailDialogTitle: "Edit User Doctor",
        objCurrentUserDoctor: this.userDoctorModel
      }
    });

    detailUserDoctorDialogRef.disableClose = true;
    detailUserDoctorDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Update Successful!');
        this.getUserDoctorData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ==================
  // Delete User Doctor
  // ==================
  public btnDeleteUserDoctorClick(): void {
    let currentUserDoctor = this.userDoctorCollectionView.currentItem;
    this.userDoctorModel.Id = currentUserDoctor.Id;

    let deleteUserDoctorDialogRef = this.dialog.open(UserDoctorDeleteDialogComponent, {
      width: '400px',
      data: {
        objUserDoctorDeleteDialogTitle: "Delete User Doctor",
        objCurrentUserDoctor: this.userDoctorModel
      }
    });

    deleteUserDoctorDialogRef.disableClose = true;
    deleteUserDoctorDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Delete Successful!');
        this.getUserDoctorData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      this.getUserDetailData();
      this.getUserDoctorData();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.userSubscription != null) this.userSubscription.unsubscribe();
    if (this.userTypeSubscription != null) this.userTypeSubscription.unsubscribe();
    if (this.userDoctorSubscription != null) this.userDoctorSubscription.unsubscribe();
  }
}
