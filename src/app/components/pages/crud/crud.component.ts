import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Commande } from '../../../api/commande';
import { CommandeService } from '../../../service/commande.service';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService]
})
export class CrudComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  @ViewChild('cancelConfirmationModal') cancelConfirmationModal!: ElementRef<HTMLDialogElement>;

  commandes: Commande[] = [];
  selectedCommande: Commande | undefined | null = null;
  displayDetailsDialog: boolean = false;
  cols?: any[];
  statutFilter: string = '';

  constructor(
    private commandeService: CommandeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
    this.cols = [
      { field: 'numCommande', header: 'Numéro de Commande' },
      { field: 'produit', header: 'Nom des Produits' },
      { field: 'statutLivraison', header: 'Statut Livraison' },
      { field: 'prixTotal', header: 'Prix Total' },
      { field: 'modePaiement', header: 'Mode de Paiement' },
    ];
  }

  loadCommandes(): void {
    const isAdmin = this.isAdmin();

    if (isAdmin) {
      // Récupérer toutes les commandes (administrateur)
      this.commandeService.getCommandes().subscribe(
        data => {
          this.commandes = data;
          console.log('Commandes récupérées :', this.commandes);
        },
        error => {
          console.error('Erreur lors de la récupération des commandes :', error);
        }
      );
    } else {
      // Récupérer les commandes de l'utilisateur connecté (non-administrateur)
      this.commandeService.getCommandes().subscribe(
        data => {
          this.commandes = data;
          console.log('Commandes récupérées :', this.commandes);
        },
        error => {
          console.error('Erreur lors de la récupération des commandes de l\'utilisateur :', error);
        }
      );
    }
  }

  isAdmin(): boolean {
    // Vérifier si l'utilisateur a le rôle d'administrateur dans le local storage après la connexion
    const role = localStorage.getItem('role'); // Remplacer 'role' par la clé réelle utilisée pour stocker le rôle

    return role === 'ADMIN'; // Adapter cette comparaison en fonction de la manière dont le rôle est stocké dans le local storage
  }

  // Afficher le dialogue de détails de la commande
  showDetailsDialog(commande: Commande) {
    this.selectedCommande = { ...commande }; // Assurez-vous que commande est correctement défini ici
    this.displayDetailsDialog = true;
  }

  // Cacher le dialogue de détails de la commande
  hideDetailsDialog() {
    this.selectedCommande = null;
    this.displayDetailsDialog = false;
  }

  // Ouvrir le dialogue pour une nouvelle commande ou éditer une commande existante
  openNew() {
    this.selectedCommande = {} as Commande;
    this.displayDetailsDialog = true;
  }

  // Éditer une commande existante
  editCommande(commande: Commande) {
    this.selectedCommande = { ...commande };
    this.displayDetailsDialog = true;
  }

  // Fermer le dialogue de détails de la commande
  closeDetailsDialog() {
    this.selectedCommande = null;
    this.displayDetailsDialog = false;
  }

  // Filtrage global des données dans la table des commandes
  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (value) {
      dt.filterGlobal(value, 'contains');
    } else {
      dt.reset();
    }
  }

  // Afficher la boîte de dialogue de confirmation d'annulation
  showCancellationConfirmation(commandeId: any) {
    this.selectedCommande = this.commandes.find(c => c._id === commandeId);
    this.cancelConfirmationModal.nativeElement.showModal();
  }

  // Cacher la boîte de dialogue de confirmation d'annulation
  hideCancellationConfirmation() {
    this.cancelConfirmationModal.nativeElement.close();
  }

  // Annuler une commande
  cancelCommande(id: any) {
    console.log(`Tentative d'annulation de la commande avec l'ID ${id}`);
    this.commandeService.cancelOrder(id).subscribe(
      response => {
        console.log(`Commande annulée avec succès avec l'ID ${id}`, response);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande annulée', life: 3000 });
        this.commandes = this.commandes.map(c => (c._id === id ? { ...c, statut: 'annulée' } : c));
      },
      error => {
        console.error(`Erreur lors de l'annulation de la commande avec l'ID ${id}`, error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'annulation de la commande', life: 3000 });
      }
    );
    console.log('Commande annulée avec succès.');
    this.hideCancellationConfirmation(); // Cacher la boîte de dialogue après confirmation
  }  livraisonStatusOptions: any[] = ['en_attente', 'en_cours_traitement', 'expediee']; // Options de statut de livraison


  // Mettre à jour le statut de livraison
  updateLivraisonStatut(id: any, newStatut: any) {
    console.log(`Mise à jour du statut de livraison pour la commande avec l'ID ${id} vers ${newStatut}`);
    this.commandeService.updateLivraisonStatut(id, newStatut).subscribe(
      response => {
        console.log(`Statut de livraison mis à jour avec succès pour la commande avec l'ID ${id}`, response);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: `Statut de livraison mis à jour vers ${newStatut}`, life: 3000 });
        this.commandes = this.commandes.map(c => (c._id === id ? { ...c, statutLivraison: newStatut } : c));
      },
      error => {
        console.error(`Erreur lors de la mise à jour du statut de livraison pour la commande avec l'ID ${id}`, error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du statut de livraison', life: 3000 });
      }
    );
  }
  getLivraisonStatut(commande: Commande): any {
    return commande.statutLivraison;
  }
  
  
}
