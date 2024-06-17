import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private loginUrl = 'http://localhost:9090/user/login';
  private registerUrl = 'http://localhost:9090/user/signup';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.loginUrl, body, { headers });
  }

  register(username: string, email: string, password: string, phoneNumber: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('image', image);

    return this.http.post<any>(this.registerUrl, formData);
  }
}
