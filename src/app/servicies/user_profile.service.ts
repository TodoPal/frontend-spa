import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Profile } from '../entities/profile.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly URL = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.URL}/${username}`);
  }
}
