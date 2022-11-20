// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ========
// Material
// ========
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

// =============
// Wijmo Modules
// =============
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// =========
// Component
// =========
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';

// ========
// Services
// ========
import { ComponentsService } from './components.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDividerModule, MatListModule,
    WjGridFilterModule, WjGridModule, WjInputModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    MatDividerModule, MatListModule,
    WjGridFilterModule, WjGridModule, WjInputModule
  ],
  providers: [
    ComponentsService
  ]
})
export class ComponentsModule { }
