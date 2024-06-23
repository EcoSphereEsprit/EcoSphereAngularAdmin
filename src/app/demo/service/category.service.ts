import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public baseUrl = "http://localhost:9090/categories"
  public token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkltZW5zZWJ0ZW91aSIsInJvbGUiOiJVU0VSIiwiSWQiOiI2NjU4ZjA3NmI1NjBmNGNmMmE3Mjg1MzEiLCJpYXQiOjE3MTkxNDEzMDIsImV4cCI6MTcxOTE2NjUwMn0.c1nWdrNKk9OKE2J_3N0x2XY02rRnJwgl6lVfU3MOuLU";
  constructor(private http: HttpClient) { }


  getCategories() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(`${this.baseUrl}/GetCategories` , {headers})
  }


  createNewCategorie(body : any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(`${this.baseUrl}/addCategorie` , body,{headers})
  }

  updateCategorie( id : string , body : any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<any>(`${this.baseUrl}/Categories/${id}` , body,{headers})
  }


  deleteCategorie( id : string ) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/Categories/${id}` , {headers})
  }
}
