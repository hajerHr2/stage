import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.authServiceUrl}/user`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allUser`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Error: ${error.error.message}`
        : error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error(errorMessage));
  }
}
