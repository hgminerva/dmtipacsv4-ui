// ===============
// Angular Modules
// ===============
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';

// ========
// Material
// ========
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// ==============
// Custom Modules
// ==============
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ======
// Toastr
// ======
import { ToastrModule } from 'ngx-toastr';

// ==========
// Components
// ==========
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountLoginComponent } from './account/account.login.component';
import { AccountRegisterComponent } from './account/account.register.component';
import { LayoutComponent } from './layout/layout.component';

// ========
// Services
// ========
import { AccountService } from './account/account.service';

// ===========
// App Routing
// ===========
import { AppRoutingModule } from './app-routing.module';

// ==============
// Custom Modules
// ==============
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';

// ===============
// Custom TS Files
// ===============
import { AppRouteReuseStrategy } from './app-route-reuse-strategy';
import { AppSettings } from './app-settings';
import { AppAuthGuard } from './app-auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountLoginComponent, AccountRegisterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      progressBar: true
    }),
    ComponentsModule,
    LayoutModule,
    NgbModule.forRoot(),
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  exports: [
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    AppSettings,
    AccountService,
    { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },
    AppAuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }