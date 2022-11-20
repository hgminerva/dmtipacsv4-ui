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
export class ReportService {
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
    public procedureSummaryReportSource = new Subject<ObservableArray>();
    public procedureSummaryReportObservable = this.procedureSummaryReportSource.asObservable();
    public procedureDetailReportSource = new Subject<ObservableArray>();
    public procedureDetailReportObservable = this.procedureDetailReportSource.asObservable();

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
                            UserFacility: results[i].UserFacility
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

    // ============================
    // Get Procedure Summary Report
    // ============================
    public getProcedureSummaryReport(startDate: string, endDate: string, facilityId: number): void {
        let url = this.defaultAPIHostURL + "/api/procedureSummaryReport/list/byDateRange/" + startDate + "/" + endDate + "/" + facilityId;
        let procedureSummaryReportObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureSummaryReportObservableArray.push({
                            // Id: results[i].Id,
                            Facility: results[i].Facility,
                            TransactionNumber: results[i].TransactionNumber,
                            TransactionDateTime: results[i].TransactionDateTime,
                            TransactionTime: results[i].TransactionTime,
                            PatientName: results[i].PatientName,
                            Age: results[i].Age,
                            Modality: results[i].Modality,
                            Doctor: results[i].Doctor
                        });
                    }

                    this.procedureSummaryReportSource.next(procedureSummaryReportObservableArray);
                } else {
                    this.procedureSummaryReportSource.next(null);
                }
            },
            error => {
                this.procedureSummaryReportSource.next(null);
            }
        );
    }

    // ===========================
    // Get Procedure Detail Report
    // ===========================
    public getProcedureDetailReport(startDate: string, endDate: string, facilityId: number): void {
        let url = this.defaultAPIHostURL + "/api/procedureDetailReport/list/byDateRange/" + startDate + "/" + endDate + "/" + facilityId;
        let procedureDetailReportObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureDetailReportObservableArray.push({
                            // Id: results[i].Id,
                            Facility: results[i].Facility,
                            TransactionNumber: results[i].TransactionNumber,
                            TransactionDateTime: results[i].TransactionDateTime,
                            Patient: results[i].Patient,
                            Modality: results[i].Modality,
                            ModalityProcedure: results[i].ModalityProcedure,
                            Doctor: results[i].Doctor,
                            FacilityRate: results[i].FacilityRate,
                            DoctorRate: results[i].DoctorRate,
                            ImageRate: results[i].ImageRate
                        });
                    }

                    this.procedureDetailReportSource.next(procedureDetailReportObservableArray);
                } else {
                    this.procedureDetailReportSource.next(null);
                }
            },
            error => {
                this.procedureDetailReportSource.next(null);
            }
        );
    }
}