// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ==========
// Components
// ==========
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountLoginComponent } from './account/account.login.component';
import { AccountRegisterComponent } from './account/account.register.component';
import { LayoutComponent } from './layout/layout.component';

// ===================
// Software Components
// ===================
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalityProcedureComponent } from './modality-procedure/modality-procedure.component';
import { BodyPartsComponent } from './body-parts/body-parts.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { RateComponent } from './rate/rate.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { ProcedureDetailComponent } from './procedure/procedure-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


import { AppAuthGuard } from './app-auth-guard';

// ======
// Routes
// ======
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'account/login', component: AccountLoginComponent },
    { path: 'account/register', component: AccountRegisterComponent },
    {
        path: 'software', component: LayoutComponent, children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'modality/procedure', component: ModalityProcedureComponent },
            {
                path: 'body/parts', component: BodyPartsComponent,
                canActivate: [
                    AppAuthGuard
                ],
            },
            {
                path: 'user', component: UserComponent,
                canActivate: [
                    AppAuthGuard
                ],
            },
            {
                path: 'user/detail/:id', component: UserDetailComponent,
                canActivate: [
                    AppAuthGuard
                ],
            },
            { path: 'rate', component: RateComponent },
            { path: 'procedure', component: ProcedureComponent },
            { path: 'procedure/detail/:id', component: ProcedureDetailComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'forbidden', component: ForbiddenComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }