import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) { }

  getAllLocals(): Observable<Local[]> {
    return this.http.get<Local[]>(environment.apiUrl + '/locals');
  }
}
