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
  selectedCommande: Commande |undefined| null = null;
  displayDetailsDialog: boolean = false;
  cols?: any[];
  statutFilter: string = '';

  constructor(
    private commandeService: CommandeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Initialisation des données de commande
    this.commandeService.getCommandes().subscribe(
      data => {
        this.commandes = data;
        console.log('Commandes récupérées :', this.commandes);
      },
      error => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    );

    // Colonnes de la table des commandes
    this.cols = [
      { field: 'numCommande', header: 'Num Commande' },
      { field: 'produit', header: 'Nom Produit' },
      { field: 'statut', header: 'Status' },
      { field: 'prixTotal', header: 'Total Price' },
      { field: 'modePaiement', header: 'Payment Mode' }
    ];
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
  }
}
