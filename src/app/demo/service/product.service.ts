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
     
        return this.http.get<any>(`http://localhost:9090/produit/getProduitById/${productId}`)
            .toPromise()
            .then(res => res as Product);
    }

    // Méthodes existantes...
}
