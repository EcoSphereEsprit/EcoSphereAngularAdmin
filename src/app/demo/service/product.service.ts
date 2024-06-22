import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../api/product';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) { }

    // Ajoutez cette méthode
    getProductById(productId: string) {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTQU5BQkgiLCJyb2xlIjoiVVNFUiIsIklkIjoiNjY1YTMwNTc5ZWI1ZWZjN2NhMzBjZWJkIiwiaWF0IjoxNzE5MDgwMjk1LCJleHAiOjE3MTkwODM4OTV9.7tfX_8g0MqtHNG7uuXAcaSkItLEhrhK5ZpITqgpE_L0'
        });

        return this.http.get<any>(`http://localhost:9090/produit/getProduitById/${productId}`, { headers })
            .toPromise()
            .then(res => res as Product);
    }

    // Méthodes existantes...
}
