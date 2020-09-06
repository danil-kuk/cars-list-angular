import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { CarsEditorComponent } from './cars-editor/cars-editor.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarsPageComponent } from './cars-page.component';
import { ForbiddenRouteComponent } from './forbidden-route/forbidden-route.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

/**
 * Client module.
 */
@NgModule({
  declarations: [
    CarsPageComponent,
    CarsListComponent,
    CarsEditorComponent,
    LoginComponent,
    ToolbarComponent,
    ForbiddenRouteComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    RouterModule,
    MatToolbarModule,
  ],
  exports: [CarsPageComponent],
})
export class ClientModule {}
