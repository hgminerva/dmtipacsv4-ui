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
import { RateModel } from '../model/rate.model';

import { AppSettings } from '../app-settings'

@Injectable()
export class RateService {
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
    public rateSource = new Subject<ObservableArray>();
    public rateObservable = this.rateSource.asObservable();
    public modalityProcedureSource = new Subject<ObservableArray>();
    public modalityProcedureObservable = this.modalityProcedureSource.asObservable();
    public rateSavedSource = new Subject<number>();
    public rateSavedObservable = this.rateSavedSource.asObservable();
    public rateDeletedSource = new Subject<number>();
    public rateDeletedObservable = this.rateDeletedSource.asObservable();

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
        private http: Http,
        private appSettings: AppSettings
    ) { }

    // ========
    // Get Rate
    // ========
    public getRate(): void {
        let url = this.defaultAPIHostURL + "/api/userRate/list";
        let rateObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        rateObservableArray.push({
                            Id: results[i].Id,
                            UserId: results[i].UserId,
                            BodyPart: results[i].BodyPart,
                            ModalityProcedureId: results[i].ModalityProcedureId,
                            ModalityProcedure: results[i].ModalityProcedure,
                            ModalityProcedureCode: results[i].ModalityProcedureCode,
                            FacilityRate: results[i].FacilityRate,
                            DoctorRate: results[i].DoctorRate,
                            ImageRate: results[i].ImageRate,
                            Remarks: results[i].Remarks
                        });
                    }

                    this.rateSource.next(rateObservableArray);
                } else {
                    this.rateSource.next(null);
                }
            },
            error => {
                this.rateSource.next(null);
            }
        );
    }

    // ======================
    // Get Modality Procedure
    // ======================
    public getModalityProcedure(): void {
        let url = this.defaultAPIHostURL + "/api/modalityProcedure/list";
        let modalityProcedureObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        modalityProcedureObservableArray.push({
                            Id: results[i].Id,
                            ModalityProcedure: results[i].ModalityProcedure,
                            ModalityResultTemplate: results[i].ModalityResultTemplate
                        });
                    }

                    this.modalityProcedureSource.next(modalityProcedureObservableArray);
                }
            },
            error => {
                this.modalityProcedureSource.next(null);
            }
        );
    }

    // =========
    // Save Rate
    // =========
    public saveRate(rateModel: RateModel): void {
        if (rateModel.Id == 0) {
            let url = this.defaultAPIHostURL + "/api/userRate/add";
            this.http.post(url, JSON.stringify(rateModel), this.options).subscribe(
                response => {
                    this.rateSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.rateSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.rateSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.rateSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = rateModel.Id;
            let url = this.defaultAPIHostURL + "/api/userRate/update/" + id;
            this.http.put(url, JSON.stringify(rateModel), this.options).subscribe(
                response => {
                    this.rateSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.rateSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.rateSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.rateSavedSource.next(500);
                    }
                }
            )
        }
    }

    // ===========
    // Delete Rate
    // ===========
    public deleteRate(id: number): void {
        let url = this.defaultAPIHostURL + "/api/userRate/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.rateDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.rateDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.rateDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.rateDeletedSource.next(500);
                }
            }
        )
    }
}