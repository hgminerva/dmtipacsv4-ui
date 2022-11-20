// =======
// Angular
// =======
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// =============
// Async Classes
// =============
import { Subject, Observable } from 'rxjs';

// =====
// Model
// =====
import { UserModel } from '../model/user.model';

import { AppSettings } from '../app-settings'

@Injectable()
export class AccountService {
    // ==================
    // private properties
    // ==================
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });
    private defaultAPIHostURL: string = this.appSettings.defaultAPIHostURL;

    // =================
    // public properties
    // =================
    public loginSource = new Subject<number>();
    public loginObservable = this.loginSource.asObservable();
    public logoutSource = new Subject<number>();
    public logoutObservable = this.logoutSource.asObservable();
    public registerSource = new Subject<number>();
    public registerObservable = this.registerSource.asObservable();

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
        private router: Router,
        private http: Http,
        private appSettings: AppSettings
    ) { }

    // =====
    // Login
    // =====
    public login(username: string, password: string): void {
        let url = this.defaultAPIHostURL + '/token';
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers })

        this.http.post(url, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('username', response.json().userName);

                this.loginSource.next(1);
            },
            error => {
                this.loginSource.next(0);
            }
        )
    }

    // ======
    // Logout
    // ======
    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('username');
        localStorage.removeItem('current_facility_id');
        localStorage.removeItem('current_facility');
        localStorage.removeItem('current_user_type_id');

        setTimeout(() => {
            this.logoutSource.next(1);
        }, 500);
    }

    // ========
    // Register
    // ========
    public register(objUser: UserModel): void {
        let url = this.defaultAPIHostURL + "/api/account/Register";
        this.http.post(url, JSON.stringify(objUser), this.options).subscribe(
            response => {
                this.registerSource.next(1);
            },
            error => {
                this.registerSource.next(0);
            }
        )
    }
}