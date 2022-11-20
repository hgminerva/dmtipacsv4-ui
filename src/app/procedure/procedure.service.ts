// =======
// Angular
// =======
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';

// =============
// Async Classes
// =============
import { ObservableArray } from 'wijmo/wijmo';
import { Subject, Observable } from 'rxjs';

// =====
// Model
// =====
import { ProcedureModel } from '../model/procedure.model';
import { ProcedureResultModel } from '../model/procedure-result.model';

import { AppSettings } from '../app-settings'

@Injectable()
export class ProcedureService {
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
    public procedureSource = new Subject<ObservableArray>();
    public procedureObservable = this.procedureSource.asObservable();
    public procedureDetailSource = new Subject<ProcedureModel>();
    public procedureDetailObservable = this.procedureDetailSource.asObservable();
    public procedureSavedSource = new Subject<number>();
    public procedureSavedObservable = this.procedureSavedSource.asObservable();
    public procedureDeletedSource = new Subject<number>();
    public procedureDeletedObservable = this.procedureDeletedSource.asObservable();
    public procedureResultSource = new Subject<ObservableArray>();
    public procedureResultObservable = this.procedureResultSource.asObservable();
    public procedureResultPDFSource = new Subject<Blob>();
    public procedureResultPDFObservable = this.procedureResultPDFSource.asObservable();
    public modalityProcedureSource = new Subject<ObservableArray>();
    public modalityProcedureObservable = this.modalityProcedureSource.asObservable();
    public doctorSource = new Subject<ObservableArray>();
    public doctorObservable = this.doctorSource.asObservable();
    public procedureResultSavedSource = new Subject<number>();
    public procedureResultSavedObservable = this.procedureResultSavedSource.asObservable();
    public procedureResultDeletedSource = new Subject<number>();
    public procedureResultDeletedObservable = this.procedureResultDeletedSource.asObservable();
    public procedureComparativeSource = new Subject<ObservableArray>();
    public procedureComparativeObservable = this.procedureComparativeSource.asObservable();

    // ================
    // Initialize Model
    // ================
    public procedureResultModel: ProcedureResultModel = {
        Id: 0,
        ProcedureId: 0,
        ModalityProcedureId: 0,
        ModalityProcedure: "",
        Result: "",
        DoctorId: 0,
        Doctor: "",
        DoctorDateTime: ""
    };

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

    // =============
    // Get Procedure
    // =============
    public getProcedure(startDate: string, endDate: string, facilityId: number): void {
        let url = this.defaultAPIHostURL + "/api/procedure/list/byDateRange/" + startDate + "/" + endDate + "/" + facilityId;
        let procedureObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureObservableArray.push({
                            Id: results[i].Id,
                            TransactionNumber: results[i].TransactionNumber,
                            TransactionDateTime: results[i].TransactionDateTime,
                            TransactionTime: results[i].TransactionTime,
                            PatientName: results[i].PatientName,
                            Gender: results[i].Gender,
                            Age: results[i].Age,
                            Modality: results[i].Modality,
                            BodyPart: results[i].BodyPart,
                            Doctor: results[i].Doctor
                        });
                    }

                    this.procedureSource.next(procedureObservableArray);
                } else {
                    this.procedureSource.next(null);
                }
            },
            error => {
                this.procedureSource.next(null);
            }
        );
    }

    // ====================
    // Get Procedure Detail
    // ====================
    public getProcedureDetail(id: number): void {
        let procedureModel: ProcedureModel;
        let url = this.defaultAPIHostURL + "/api/procedure/detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    procedureModel = {
                        Id: result.Id,
                        TransactionNumber: result.TransactionNumber,
                        TransactionDateTime: result.TransactionDateTime,
                        TransactionTime: result.TransactionTime,
                        DICOMFileName: result.DICOMFileName,
                        PatientName: result.PatientName,
                        Gender: result.Gender,
                        DateOfBirth: result.DateOfBirth,
                        Age: result.Age,
                        Particulars: result.Particulars,
                        ModalityId: result.ModalityId,
                        Modality: result.Modality,
                        BodyPartId: result.BodyPartId,
                        BodyPart: result.BodyPart,
                        UserId: result.UserId,
                        User: result.User,
                        PatientAddress: result.PatientAddress,
                        ReferringPhysician: result.ReferringPhysician,
                        StudyDate: result.StudyDate,
                        HospitalNumber: result.HospitalNumber,
                        HospitalWardNumber: result.HospitalWardNumber,
                        StudyInstanceId: result.StudyInstanceId
                    };

                    this.procedureDetailSource.next(procedureModel);
                }
            },
            error => {
                this.procedureDetailSource.next(null);
            }
        );
    }

    // ================
    // Delete Procedure
    // ================
    public deleteProcedure(id: number): void {
        let url = this.defaultAPIHostURL + "/api/procedureProcedure/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.procedureDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.procedureDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.procedureDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.procedureDeletedSource.next(500);
                }
            }
        )
    }

    // ====================
    // Get Procedure Result
    // ====================
    public getProcedureResult(procedureId: number): void {
        let url = this.defaultAPIHostURL + "/api/procedureResult/list/" + procedureId;
        let procedureResultObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureResultObservableArray.push({
                            Id: results[i].Id,
                            ProcedureId: results[i].ProcedureId,
                            ModalityProcedureId: results[i].ModalityProcedureId,
                            ModalityProcedure: results[i].ModalityProcedure,
                            Result: results[i].Result,
                            DoctorId: results[i].DoctorId,
                            Doctor: results[i].Doctor,
                            DoctorDateTime: results[i].DoctorDateTime,
                            DoctorTime: results[i].DoctorTime
                        });
                    }

                    this.procedureResultSource.next(procedureResultObservableArray);
                } else {
                    this.procedureResultSource.next(null);
                }
            },
            error => {
                this.procedureResultSource.next(null);
            }
        );
    }

    // ========================
    // Get Procedure Result PDF
    // ========================
    public getProcedureResultPDF(id: number): void {
        let url = this.defaultAPIHostURL + "/api/procedureResultReport/PDF/result/" + id;

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe(
            response => {
                let pdf = new Blob([response.blob()], { type: 'application/pdf' });
                this.procedureResultPDFSource.next(pdf);
            });
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
                } else {
                    this.modalityProcedureSource.next(null);
                }
            },
            error => {
                this.modalityProcedureSource.next(null);
            }
        );
    }

    // ==========
    // Get Doctor
    // ==========
    public getDoctor(): void {
        let url = this.defaultAPIHostURL + "/api/user/list/byUserType/2";
        let doctorObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        doctorObservableArray.push({
                            Id: results[i].Id,
                            FullName: results[i].FullName
                        });
                    }

                    this.doctorSource.next(doctorObservableArray);
                } else {
                    this.doctorSource.next(null);
                }
            },
            error => {
                this.doctorSource.next(null);
            }
        );
    }

    // =====================
    // Save Procedure Result
    // =====================
    public saveProcedureResult(procedureResultModel: ProcedureResultModel): void {
        if (procedureResultModel.Id == 0) {
            let url = this.defaultAPIHostURL + "/api/procedureResult/add";
            this.http.post(url, JSON.stringify(procedureResultModel), this.options).subscribe(
                response => {
                    this.procedureResultSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.procedureResultSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.procedureResultSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.procedureResultSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = procedureResultModel.Id;
            let url = this.defaultAPIHostURL + "/api/procedureResult/update/" + id;
            this.http.put(url, JSON.stringify(procedureResultModel), this.options).subscribe(
                response => {
                    this.procedureResultSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.procedureResultSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.procedureResultSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.procedureResultSavedSource.next(500);
                    }
                }
            )
        }
    }

    // =======================
    // Delete Procedure Result
    // =======================
    public deleteProcedureResult(id: number): void {
        let url = this.defaultAPIHostURL + "/api/procedureResult/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.procedureResultDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.procedureResultDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.procedureResultDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.procedureResultDeletedSource.next(500);
                }
            }
        )
    }

    // =========================
    // Get Procedure Comparative
    // =========================
    public getProcedureComparative(id: number): void {
        let facilityId: number = parseInt(localStorage.getItem("current_facility_id"));
        let url = this.defaultAPIHostURL + "/api/procedure/list/comparative/" + id + "/" + facilityId;
        let procedureComparativeObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureComparativeObservableArray.push({
                            Id: results[i].Id,
                            TransactionNumber: results[i].TransactionNumber,
                            TransactionDateTime: results[i].TransactionDateTime,
                            TransactionTime: results[i].TransactionTime,
                            DICOMFileName: results[i].DICOMFileName,
                            PatientName: results[i].PatientName,
                            Gender: results[i].Gender,
                            DateOfBirth: results[i].DateOfBirth,
                            Age: results[i].Age,
                            Particulars: results[i].Particulars,
                            ModalityId: results[i].ModalityId,
                            Modality: results[i].Modality,
                            BodyPartId: results[i].BodyPartId,
                            BodyPart: results[i].BodyPart,
                            UserId: results[i].UserId,
                            User: results[i].User,
                            PatientAddress: results[i].PatientAddress,
                            ReferringPhysician: results[i].ReferringPhysician,
                            StudyDate: results[i].StudyDate,
                            HospitalNumber: results[i].HospitalNumber,
                            HospitalWardNumber: results[i].HospitalWardNumber,
                            StudyInstanceId: results[i].StudyInstanceId,
                            Doctor: results[i].Doctor
                        });
                    }

                    this.procedureComparativeSource.next(procedureComparativeObservableArray);
                } else {
                    this.procedureComparativeSource.next(null);
                }
            },
            error => {
                this.procedureComparativeSource.next(null);
            }
        );
    }
}