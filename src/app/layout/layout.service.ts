// =======
// Angular
// =======
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// =============
// Async Classes
// =============
import { ObservableArray } from 'wijmo/wijmo';
import { Subject, Observable } from 'rxjs';

import { AppSettings } from '../app-settings'

@Injectable()
export class LayoutService {
    // ================================
    // Token: Headers and Authorization
    // ================================
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });
    private defaultAPIHostURL: string = this.appSettings.defaultAPIHostURL;

    // ================
    // Async Properties 
    // ================
    public facilitiesSource = new Subject<ObservableArray>();
    public facilitiesObservable = this.facilitiesSource.asObservable();

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
        private http: Http,
        private appSettings: AppSettings
    ) { }

    // =================
    // Get Facility List
    // =================
    public getFacilities(): void {
        let url = this.defaultAPIHostURL + "/api/facility/list";
        let facilitiesObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        facilitiesObservableArray.push({
                            Id: results[i].Id,
                            UserId: results[i].UserId,
                            UserFacility: results[i].UserFacility,
                            UserTypeId: results[i].UserTypeId
                        });
                    }

                    this.facilitiesSource.next(facilitiesObservableArray);
                } else {
                    this.facilitiesSource.next(null);
                }
            },
            error => {
                this.facilitiesSource.next(null);
            }
        );
    }
}