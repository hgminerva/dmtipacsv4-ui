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
  selector: 'app-account-register',
  templateUrl: './account.register.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountRegisterComponent {
  title = 'register';
  isFieldDisabled = false;

  // ==========================================
  // Account Subscription Async Task Properties
  // ==========================================
  private registerSubscription: any;

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

  // ========
  // Register
  // ========
  public btnRegisterClick(): void {
    if (this.registerSubscription != null) this.registerSubscription.unsubscribe();

    let btnRegister: Element = document.getElementById("btnRegister");
    btnRegister.setAttribute("disabled", "disabled");
    btnRegister.innerHTML = "Saving your credentials...";
    this.isFieldDisabled = true;

    this.accountService.register(this.userModel);
    this.registerSubscription = this.accountService.registerObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Register successful.");
          setTimeout(() => {
            this.router.navigate(['/account/login']);
          }, 500);
        } else if (data == 0) {
          this.toastr.error("Register failed.");
          btnRegister.removeAttribute("disabled");
          btnRegister.innerHTML = "Register";
          this.isFieldDisabled = false;
        }
      }
    );
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.registerSubscription != null) this.registerSubscription.unsubscribe();
  }
}
