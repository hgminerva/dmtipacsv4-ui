// ====================
// Angular and Material
// ====================
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { UserService } from './user.service';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

// =====
// Model
// =====
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../layout/layout.component.css']
})
export class UserComponent {
  // ================
  // Global Variables
  // ================
  title = 'user';
  isProgressBarHidden = false;

  // ==========================
  // User Async Task Properties
  // ==========================
  public userSubscription: any;
  public userData: ObservableArray = new ObservableArray();
  public userCollectionView: CollectionView = new CollectionView(this.userData);

  public isBtnRefreshUserDataDisabled: Boolean = true;

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();
  public usersNumberOfPageIndex: number;

  // =====
  // Wijmo
  // =====
  @ViewChild('userFlexGrid') userFlexGrid: WjFlexGrid;

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

  // ===========
  // Constructor
  // ===========
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  // ================================
  // Create Combo Show Number of Rows
  // ================================
  public createCboShowNumberOfRows(): void {
    for (var i = 0; i <= 4; i++) {
      var rows = 0;
      var rowsString = "";

      if (i == 0) {
        rows = 15;
        rowsString = "Show 15 Rows";
      } else if (i == 1) {
        rows = 50;
        rowsString = "Show 50 Rows";
      } else if (i == 2) {
        rows = 100;
        rowsString = "Show 100 Rows";
      } else if (i == 3) {
        rows = 150;
        rowsString = "Show 150 Rows";
      } else {
        rows = 200;
        rowsString = "Show 200 Rows";
      }

      this.cboShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });
    }
  }

  // ===================================================
  // Combo Show Number of Rows On Selected Index Changed
  // ===================================================
  public cboShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.usersNumberOfPageIndex = selectedValue;

    this.userCollectionView.pageSize = this.usersNumberOfPageIndex;
    this.userCollectionView.refresh();
    this.userFlexGrid.refresh();
  }

  // =============
  // Get User Data
  // =============
  public getUserData(): void {
    this.userData = new ObservableArray();
    this.userCollectionView = new CollectionView(this.userData);
    this.userCollectionView.pageSize = 15;
    this.userCollectionView.trackChanges = true;

    this.isProgressBarHidden = false;
    this.isBtnRefreshUserDataDisabled = true;

    this.userService.getUser();
    this.userSubscription = this.userService.userObservable.subscribe(
      data => {
        if (data != null) {
          this.userData = data;
          this.userCollectionView = new CollectionView(this.userData);
          this.userCollectionView.pageSize = this.usersNumberOfPageIndex;
          this.userCollectionView.trackChanges = true;
        }

        this.isProgressBarHidden = true;
        this.isBtnRefreshUserDataDisabled = false;
      }
    );
  }

  // =========
  // Edit User
  // =========
  public btnEditUserClick(): void {
    let currentUser = this.userCollectionView.currentItem;
    this.router.navigate(['/software/user/detail', currentUser.Id]);
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.createCboShowNumberOfRows();
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      this.getUserData();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.userSubscription != null) this.userSubscription.unsubscribe();
  }
}