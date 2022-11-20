// =======
// Angular
// =======
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// =======
// Service
// =======
import { AccountService } from './account.service';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =====
// Model
// =====
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-account-login',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountLoginComponent {
  // ================
  // Global Variables
  // ================
  title = 'Login';

  // ==========================================
  // Account Subscription Async Task Properties
  // ==========================================
  private loginSubscription: any;

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
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {
  }

  // =====
  // Login
  // =====
  public btnLoginClick(): void {
    if (this.loginSubscription != null) this.loginSubscription.unsubscribe();

    let btnLogin: Element = document.getElementById("btnLogin");
    btnLogin.setAttribute("disabled", "disabled");
    btnLogin.innerHTML = "Logging in...";

    let inpUsername: Element = document.getElementById("inpUsername");
    inpUsername.setAttribute("disabled", "disabled");

    let inpPassword: Element = document.getElementById("inpPassword");
    inpPassword.setAttribute("disabled", "disabled");

    this.accountService.login(this.userModel.UserName, this.userModel.Password);
    this.loginSubscription = this.accountService.loginObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Login successful.");
          setTimeout(() => {
            this.router.navigate(['/software']);
          }, 500);
        } else if (data == 0) {
          this.toastr.error("Login failed.");
          btnLogin.removeAttribute("disabled");
          btnLogin.innerHTML = "Login";
          inpUsername.removeAttribute("disabled");
          inpPassword.removeAttribute("disabled");
        }
      }
    );
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    if (localStorage.getItem("access_token") != null) {
      this.router.navigate(['/software']);
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.loginSubscription != null) this.loginSubscription.unsubscribe();
  }
}
