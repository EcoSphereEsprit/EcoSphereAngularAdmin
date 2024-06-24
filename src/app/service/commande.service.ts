// commande.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../api/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:9090/commandes';

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTQU5BQkgiLCJyb2xlIjoiVVNFUiIsIklkIjoiNjY1YTMwNTc5ZWI1ZWZjN2NhMzBjZWJkIiwiaWF0IjoxNzE5MTYyMTAwLCJleHAiOjE3MTkxNjU3MDB9.dThQHD8aulWqMWjFCmW5z1Gq6DP0ExrXoMGNCAUQj-M')

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commande[]>('http://localhost:9090/commandes', { headers });
  }

  getCommandeDetails(id: string): Observable<Commande> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTQU5BQkgiLCJyb2xlIjoiVVNFUiIsIklkIjoiNjY1YTMwNTc5ZWI1ZWZjN2NhMzBjZWJkIiwiaWF0IjoxNzE5MTYyMTAwLCJleHAiOjE3MTkxNjU3MDB9.dThQHD8aulWqMWjFCmW5z1Gq6DP0ExrXoMGNCAUQj-M')

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commande>(`${this.apiUrl}/${id}`, { headers });
  }

  addCommande(commande: Commande): Promise<Commande> {
    return this.http.post<Commande>(this.apiUrl, commande)
      .toPromise()
      .then(createdCommande => createdCommande || {})
      .catch(error => {
        console.error('Error adding commande:', error);
        throw error;
      });
  }


  ajouterCommande(commandeData: any): Observable<any> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTQU5BQkgiLCJyb2xlIjoiVVNFUiIsIklkIjoiNjY1YTMwNTc5ZWI1ZWZjN2NhMzBjZWJkIiwiaWF0IjoxNzE5MTYyMTAwLCJleHAiOjE3MTkxNjU3MDB9.dThQHD8aulWqMWjFCmW5z1Gq6DP0ExrXoMGNCAUQj-M')
    // Récupération du token d'authentification depuis le local storage
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token is missing');
    }

    // Ajout du token d'authentification dans les headers
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    // Appel HTTP POST vers l'API backend pour ajouter la commande
    return this.http.post<any>(`http://localhost:9090/commandes/ajouter`, commandeData, { headers });
}



  updateCommande(commande: Commande): Promise<Commande> {
    const url = `${this.apiUrl}/${commande._id}`;
    return this.http.put<Commande>(url, commande)
      .toPromise()
      .then(updatedCommande => updatedCommande || {})
      .catch(error => {
        console.error('Error updating commande:', error);
        throw error;
      });
  }

  deleteCommande(id: string): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).toPromise()
      .catch(error => {
        console.error('Error deleting commande:', error);
        throw error;
      });
  }
  

  cancelOrder(id: string): Observable<any> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTQU5BQkgiLCJyb2xlIjoiVVNFUiIsIklkIjoiNjY1YTMwNTc5ZWI1ZWZjN2NhMzBjZWJkIiwiaWF0IjoxNzE5MTYyMTAwLCJleHAiOjE3MTkxNjU3MDB9.dThQHD8aulWqMWjFCmW5z1Gq6DP0ExrXoMGNCAUQj-M')

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(`Sending request to cancel order with id ${id}`);  // Log
    return this.http.put(`http://localhost:9090/commandes/${id}/annuler`, {}, { headers });
  }
  
  
  
   // Nouvelle méthode pour récupérer les commandes filtrées par statut
   getCommandesByStatut(statut: string): Observable<Commande[]> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTQU5BQkgiLCJyb2xlIjoiVVNFUiIsIklkIjoiNjY1YTMwNTc5ZWI1ZWZjN2NhMzBjZWJkIiwiaWF0IjoxNzE5MTUyNTg0LCJleHAiOjE3MTkxNTYxODR9.kfRzxrQNNeuq9vMAmSEyrSRoeUTyt2FtQoBo5OkkYnM');

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('statut', statut); // Paramètre de requête pour filtrer par statut
    return this.http.get<Commande[]>(`${this.apiUrl}/filtre`, { headers, params });
  }
}