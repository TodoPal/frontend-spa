import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtUtilService {
  getExpiration(token: string): number | undefined {
    try {
      return jwt_decode<{ exp: number; }>(token)?.exp;
    } catch (Error) {
      return undefined;
    }
  }
}
