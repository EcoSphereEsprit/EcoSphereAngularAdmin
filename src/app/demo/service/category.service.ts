import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public baseUrl = "http://localhost:9090/categories"
  public token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkltZW5zZWJ0ZW91aSIsInJvbGUiOiJVU0VSIiwiSWQiOiI2NjU4ZjA3NmI1NjBmNGNmMmE3Mjg1MzEiLCJpYXQiOjE3MTkwNjY4OTEsImV4cCI6MTcxOTA3MDQ5MX0.cwafuKLdyYY4img7z6Q5_imjy6-yILBF-k6vH2mSfw0";
  constructor(private http: HttpClient) { }


  getCategories() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(`${this.baseUrl}/GetCategories` , {headers})
  }
}
