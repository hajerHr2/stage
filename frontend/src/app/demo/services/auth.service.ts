import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';  // ✅ Import du fichier env

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // ✅ Utilisation du service auth unique dans Kubernetes
  private apiUrl = `${environment.authServiceUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  // --- AUTHENTIFICATION ---

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    localStorage.clear();
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, authRequest).pipe(
      map(response => {
        this.setToken(response.token);
        this.router.navigate(['/formations']);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, null, { params: { email } }).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('otp', otp);
    formData.append('newPassword', newPassword);
    
    return this.http.post(`${this.apiUrl}/auth/reset-password`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // --- VALIDATION ---

  checkEmailUnique(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-email/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  checkPhoneUnique(phoneNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-phone/${phoneNumber}`).pipe(
      catchError(this.handleError)
    );
  }

  // --- TOKEN & USER INFO ---

  setToken(token: string): void {
    localStorage.setItem('token', token);
    const decoded: any = jwtDecode(token);
    localStorage.setItem('userId', decoded.id);
    localStorage.setItem('role', decoded.role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  // --- USER MANAGEMENT (même microservice que auth) ---

  getCurrentUser(): Observable<User> {
    const userId = this.getUserId();
    return this.http.get<User>(`${this.apiUrl}/user/getbyid/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(user: User): Observable<User> {
    const userId = this.getUserId();
    return this.http.put<User>(`${this.apiUrl}/user/update/${userId}`, user).pipe(
      catchError(this.handleError)
    );
  }

  // --- ERREUR GLOBALE ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
