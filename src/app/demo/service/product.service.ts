import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'src/app/demo/api/product';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    public baseUrl = "http://localhost:9090/produit"
    public token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkltZW5zZWJ0ZW91aSIsInJvbGUiOiJVU0VSIiwiSWQiOiI2NjU4ZjA3NmI1NjBmNGNmMmE3Mjg1MzEiLCJpYXQiOjE3MTkxNDEzMDIsImV4cCI6MTcxOTE2NjUwMn0.c1nWdrNKk9OKE2J_3N0x2XY02rRnJwgl6lVfU3MOuLU";
  

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersLarge() {
        return this.http.get<any>('assets/demo/data/products-orders.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    //Imen's part of the API 

    createNewProduct(body: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.post<any>(`${this.baseUrl}/addProduit`, body, { headers });
      }

      getProductList(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>(`${this.baseUrl}/Getproduits`,  { headers });
      }

      filterProductsByPrice(minPrice : number , maxPrice : number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>(`${this.baseUrl}/prix?min=${minPrice}&max=${maxPrice}`,  { headers });
      }

      filterProductsByCategory(categoryName: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>(`${this.baseUrl}/categories/name/${categoryName}`, { headers });
    }

    filterProductsByName(productName: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>(`${this.baseUrl}/getProduitByName/search?name=${productName}`,   { headers });
    }

    filterProductsByavailability(productId: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>(`${this.baseUrl}/produit?name=${productId}` ,  { headers });
    }

    sortByDate(type: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>(`${this.baseUrl}/sortedDate?order=${type}`,   { headers });
    }

    deleteProduct(id: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.delete<any>(`${this.baseUrl}/Produits/${id}`,   { headers });
    }
    loadImageWithAuthorization(imageURL : string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
      
        return this.http.get(imageURL, { headers, responseType: 'blob' })
          
      }
}
