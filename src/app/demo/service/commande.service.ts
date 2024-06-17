import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../api/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:9090/commandes';

  constructor(private http: HttpClient) {}

  getCommandes(): Promise<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl)
      .toPromise()
      .then(response => response || [])
      .catch(error => {
        console.error('Error fetching commandes:', error);
        return [];
      });
  }

  addCommande(commande: Commande): Promise<Commande> {
    return this.http.post<Commande>(this.apiUrl, commande)
      .toPromise()
      .then(createdCommande => createdCommande || {}) // handle potential null or undefined
      .catch(error => {
        console.error('Error adding commande:', error);
        throw error; // or handle error as per your application's logic
      });
  }

  updateCommande(commande: Commande): Promise<Commande> {
    const url = `${this.apiUrl}/${commande._id}`;
    return this.http.put<Commande>(url, commande)
      .toPromise()
      .then(updatedCommande => updatedCommande || {}) // handle potential null or undefined
      .catch(error => {
        console.error('Error updating commande:', error);
        throw error; // or handle error as per your application's logic
      });
  }

  deleteCommande(id: string): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).toPromise();
  }
}
