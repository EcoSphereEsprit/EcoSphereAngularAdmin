// crud.component.ts

import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Commande } from 'src/app/demo/api/commande';
import { CommandeService } from 'src/app/demo/service/commande.service';

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {
dt: any;
onGlobalFilter(arg0: any,$event: Event) {
throw new Error('Method not implemented.');
}

  commandes: Commande[] = [];
  selectedCommande: Commande | null = null;
  displayDetailsDialog: boolean = false;
  cols?: any[];
  statutFilter: string = ''; // Variable pour le statut de filtrage

  constructor(private commandeService: CommandeService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.commandeService.getCommandes()
      .subscribe(
        (data) => {
          this.commandes = data;
          console.log('Commandes récupérées :', this.commandes);
        },
        (error) => {
          console.error('Erreur lors de la récupération des commandes :', error);
        }
      );

    this.cols = [
      { field: 'numCommande', header: 'Num Commande' },
      { field: 'userId', header: 'User ID' },
      { field: 'statut', header: 'Status' },
      { field: 'prixTotal', header: 'Total Price' },
      { field: 'modePaiement', header: 'Payment Mode' }
    ];
  }

  showDetailsDialog(commande: Commande) {
    this.selectedCommande = { ...commande };
    this.displayDetailsDialog = true;
  }

  closeDetailsDialog() {
    this.displayDetailsDialog = false;
    this.selectedCommande = null;
  }

  openNew() {
    this.selectedCommande = {} as Commande;
    this.displayDetailsDialog = true;
  }

  editCommande(commande: Commande) {
    this.selectedCommande = { ...commande };
    this.displayDetailsDialog = true;
  }

  hideDialog() {
    this.displayDetailsDialog = false;
    this.selectedCommande = null;
  }

  sauvegarderCommande() {
    if (this.selectedCommande) { // Check if selectedCommande is not null or undefined
      if (this.selectedCommande._id) {
        this.commandeService.updateCommande(this.selectedCommande).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Commande updated', life: 3000 });
          this.hideDialog();
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating commande', life: 3000 });
          console.error('Error updating commande', error);
        });
      } else {
        this.commandeService.addCommande(this.selectedCommande).then((addedCommande) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Commande added', life: 3000 });
          this.hideDialog();
          this.commandes = [...this.commandes, addedCommande];
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding commande', life: 3000 });
          console.error('Error adding commande', error);
        });
      }
    } else {
      // Handle the case where selectedCommande is null
      console.error('selectedCommande is null or undefined');
    }
  }
  
  

  deleteCommande(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this commande?',
      accept: () => {
        this.commandeService.deleteCommande(id).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Commande deleted', life: 3000 });
          this.commandes = this.commandes.filter(c => c._id !== id);
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting commande', life: 3000 });
          console.error('Error deleting commande', error);
        });
      }
    });
  }

cancelCommande(id: string) {
  console.log(`Attempting to cancel order with id ${id}`);
  
  this.commandeService.cancelOrder(id).subscribe(
    (response) => {
      console.log(`Successfully cancelled order with id ${id}`, response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Commande cancelled', life: 3000 });
      this.commandes = this.commandes.map(c => c._id === id ? { ...c, statut: 'annulée' } : c);
    },
    (error) => {
      console.error(`Error cancelling order with id ${id}`, error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error cancelling commande', life: 3000 });
    }
  );
}

  
 

  
}
