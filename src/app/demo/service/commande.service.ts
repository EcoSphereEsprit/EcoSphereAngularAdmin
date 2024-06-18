// commande.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../api/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:9090/commandes';

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commande[]>(this.apiUrl, { headers });
  }

  getCommandeDetails(id: string): Observable<Commande> {
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
}
