import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserInputDto } from '../entities/user_input_dto.model';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string): Observable<string> {
    const userInputDto: UserInputDto = {
      username,
      password,
      joined: formatDate(Date.now(), 'yyyy.MM.dd HH:mm', 'en-US')
    };
    return this.http.post<string>(this.URL, userInputDto, {
      responseType: 'text' as 'json'
    });
  }

  deleteUser(username: string, password: string): Observable<any> {
    const userInputDto: UserInputDto = {
      username,
      password,
      joined: ''
    };
    return this.http.delete(`${this.URL}/username`, {
      body: userInputDto
    });
  }
}
