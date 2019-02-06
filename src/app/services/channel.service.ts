import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Channel } from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  getAllChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(environment.apiUrl + '/channels');
  }
}
