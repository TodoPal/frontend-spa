import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInputDto } from '../entities/user_input_dto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  loginUser(userInput: UserInputDto): Observable<string> {
    return this.http.post<string>(`${this.URL}/login`, userInput, {
      responseType: 'text' as 'json'
    });
  }

  loginUserWithJwt(jwtToken: string): Observable<string> {
    return this.http.post<string>(`${this.URL}/loginWithJwt`, jwtToken, {
      responseType: 'text' as 'json'
    });
  }
}
