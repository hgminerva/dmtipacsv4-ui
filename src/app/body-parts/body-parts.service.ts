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

// =====
// Model
// =====
import { BodyPartsModel } from '../model/body-parts.model';

import { AppSettings } from '../app-settings'

@Injectable()
export class BodyPartsService {
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
    public bodyPartsSource = new Subject<ObservableArray>();
    public bodyPartsObservable = this.bodyPartsSource.asObservable();
    public bodyPartsSavedSource = new Subject<number>();
    public bodyPartsSavedObservable = this.bodyPartsSavedSource.asObservable();
    public bodyPartsDeletedSource = new Subject<number>();
    public bodyPartsDeletedObservable = this.bodyPartsDeletedSource.asObservable();

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
        private http: Http,
        private appSettings: AppSettings
    ) { }

    // ==============
    // Get Body Parts
    // ==============
    public getBodyParts(): void {
        let url = this.defaultAPIHostURL + "/api/bodyParts/list";
        let bodyPartsObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        bodyPartsObservableArray.push({
                            Id: results[i].Id,
                            BodyPart: results[i].BodyPart
                        });
                    }

                    this.bodyPartsSource.next(bodyPartsObservableArray);
                } else {
                    this.bodyPartsSource.next(null);
                }
            },
            error => {
                this.bodyPartsSource.next(null);
            }
        );
    }

    // ===============
    // Save Body Parts
    // ===============
    public saveBodyParts(bodyPartsModel: BodyPartsModel): void {
        if (bodyPartsModel.Id == 0) {
            let url = this.defaultAPIHostURL + "/api/bodyParts/add";
            this.http.post(url, JSON.stringify(bodyPartsModel), this.options).subscribe(
                response => {
                    this.bodyPartsSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.bodyPartsSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.bodyPartsSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.bodyPartsSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = bodyPartsModel.Id;
            let url = this.defaultAPIHostURL + "/api/bodyParts/update/" + id;
            this.http.put(url, JSON.stringify(bodyPartsModel), this.options).subscribe(
                response => {
                    this.bodyPartsSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.bodyPartsSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.bodyPartsSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.bodyPartsSavedSource.next(500);
                    }
                }
            )
        }
    }

    // =================
    // Delete Body Parts
    // =================
    public deleteBodyParts(id: number): void {
        let url = this.defaultAPIHostURL + "/api/bodyParts/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.bodyPartsDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.bodyPartsDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.bodyPartsDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.bodyPartsDeletedSource.next(500);
                }
            }
        )
    }
}