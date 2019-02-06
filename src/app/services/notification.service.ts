import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { MetadataNotification } from '../models/metadata.notification';
import { NotificationFilterDTO } from '../models/notification.filter';
import { NotificationDTO } from '../models/notification-dto';
import { MetadataNotificationEntityDTO } from '../models/metadata.notifications.list';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotificationsFilter(filter: NotificationFilterDTO): Observable<MetadataNotification> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify(filter);
    return this.http.post<MetadataNotification>(environment.apiUrl + '/notifications/filter', body, {headers: headers});
  }

  saveNotification(notification: NotificationDTO): Observable<NotificationDTO> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify(notification);
    return this.http.post<NotificationDTO>(environment.apiUrl + '/notifications', body, {headers: headers});
  }

  updateNotification(id: string, notification: NotificationDTO): Observable<NotificationDTO> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify(notification);
    return this.http.put<NotificationDTO>(environment.apiUrl + `/notifications/${id}`, body, {headers: headers});
  }

  getNotification(id: string): Observable<NotificationDTO> {
    return this.http.get<NotificationDTO>(environment.apiUrl + `/notifications/${id}`);
  }

  getNotifications(page: number, max: number, order: string, field: string): Observable<MetadataNotificationEntityDTO> {
    const  params = new  HttpParams().set('page', page.toString())
                                      .set('max', max.toString())
                                      .set('order', order)
                                      .set('field', field);
    return this.http.get<MetadataNotificationEntityDTO>(environment.apiUrl + '/notifications', {params});
  }
  
}
