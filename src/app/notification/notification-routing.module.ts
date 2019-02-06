import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';

const routes: Routes = [
  { 
    path: '', component: WrapperComponent,
    children: [
      { path: '', redirectTo: 'list' },
      { path: 'details', component: NotificationComponent },
      { path: 'list', component: ListNotificationComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
