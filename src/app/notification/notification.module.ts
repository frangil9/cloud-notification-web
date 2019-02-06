import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification/notification.component';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatSelectModule, MatSlideToggleModule, MatDividerModule, MAT_DATE_LOCALE,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, DateAdapter, MAT_DATE_FORMATS, MatFormFieldModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

@NgModule({
  declarations: [NotificationComponent, AddNotificationComponent, EditNotificationComponent, WrapperComponent, NavbarComponent, ListNotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NotificationRoutingModule
  ],
  entryComponents: [
    AddNotificationComponent,
    EditNotificationComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class NotificationModule { }
