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
import { ModalityProcedureModel } from '../model/modality-procedure.model';

import { AppSettings } from '../app-settings'

@Injectable()
export class ModalityProcedureService {
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
    public modalityProcedureSource = new Subject<ObservableArray>();
    public modalityProcedureObservable = this.modalityProcedureSource.asObservable();
    public modalitySource = new Subject<ObservableArray>();
    public modalityObservable = this.modalitySource.asObservable();
    public modalityProcedureSavedSource = new Subject<number>();
    public modalityProcedureSavedObservable = this.modalityProcedureSavedSource.asObservable();
    public modalityProcedureDeletedSource = new Subject<number>();
    public modalityProcedureDeletedObservable = this.modalityProcedureDeletedSource.asObservable();

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
        private http: Http,
        private appSettings: AppSettings
    ) { }

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
                            ModalityId: results[i].ModalityId,
                            Modality: results[i].Modality,
                            ModalityProcedure: results[i].ModalityProcedure,
                            ModalityResultTemplate: results[i].ModalityResultTemplate,
                            DoctorId: results[i].DoctorId == null ? null : results[i].DoctorId
                        });
                    }

                    this.modalityProcedureSource.next(modalityProcedureObservableArray);
                } else {
                    this.modalityProcedureSource.next(null);
                }
            },
            error => {
                this.modalityProcedureSource.next(null);
            }
        );
    }

    // ============
    // Get Modality
    // ============
    public getModality(): void {
        let url = this.defaultAPIHostURL + "/api/modality/list";
        let modalityObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        modalityObservableArray.push({
                            Id: results[i].Id,
                            Modality: results[i].Modality
                        });
                    }

                    this.modalitySource.next(modalityObservableArray);
                }
            },
            error => {
                this.modalitySource.next(null);
            }
        );
    }

    // =======================
    // Save Modality Procedure
    // =======================
    public saveModalityProcedure(modalityProcedureModel: ModalityProcedureModel): void {
        if (modalityProcedureModel.Id == 0) {
            let url = this.defaultAPIHostURL + "/api/modalityProcedure/add";
            this.http.post(url, JSON.stringify(modalityProcedureModel), this.options).subscribe(
                response => {
                    this.modalityProcedureSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.modalityProcedureSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.modalityProcedureSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.modalityProcedureSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = modalityProcedureModel.Id;
            let url = this.defaultAPIHostURL + "/api/modalityProcedure/update/" + id;
            this.http.put(url, JSON.stringify(modalityProcedureModel), this.options).subscribe(
                response => {
                    this.modalityProcedureSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.modalityProcedureSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.modalityProcedureSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.modalityProcedureSavedSource.next(500);
                    }
                }
            )
        }
    }

    // =========================
    // Delete Modality Procedure
    // =========================
    public deleteModalityProcedure(id: number): void {
        let url = this.defaultAPIHostURL + "/api/modalityProcedure/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.modalityProcedureDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.modalityProcedureDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.modalityProcedureDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.modalityProcedureDeletedSource.next(500);
                }
            }
        )
    }
}