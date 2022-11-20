// =======
// Angular
// =======
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AppAuthGuard implements CanActivate {

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
    ) { }

    // ==================
    // Can Activate Route
    // ==================
    canActivate() {
        if (localStorage.getItem("current_user_type_id") != null) {
            if (localStorage.getItem("current_user_type_id") == "3") {
                return true;
            } else {
                this.router.navigate(["/software/forbidden"]);
                return false;
            }
        } else {
            this.router.navigate(["/software/forbidden"]);
            return false;
        }
    }
}