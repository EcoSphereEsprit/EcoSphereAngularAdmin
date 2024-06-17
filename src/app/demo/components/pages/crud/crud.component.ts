import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Commande } from 'src/app/demo/api/commande';
import { CommandeService } from 'src/app/demo/service/commande.service';

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {

  commandes: Commande[] = [];
  selectedCommandes: Commande[] = [];
  commandeDialog: boolean = false;
  deleteCommandeDialog: boolean = false;
  deleteCommandesDialog: boolean = false;
  commande: Commande = {};
  submitted: boolean = false;

  cols?: any[];

  constructor(private commandeService: CommandeService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.commandeService.getCommandes().then(data => this.commandes = data);

    this.cols = [
      { field: 'numCommande', header: 'Num Commande' },
      { field: 'userId', header: 'User ID' },
      { field: 'statut', header: 'Status' },
      { field: 'prixTotal', header: 'Total Price' },
      { field: 'modePaiement', header: 'Payment Mode' }
    ];
  }

  openNew() {
    this.commande = {};
    this.submitted = false;
    this.commandeDialog = true;
  }

  editCommande(commande: Commande) {
    this.commande = { ...commande };
    this.commandeDialog = true;
  }

  hideDialog() {
    this.commandeDialog = false;
    this.submitted = false;
  }

  sauvegarderCommande() {
    if (this.commande._id) {
      this.commandeService.updateCommande(this.commande).then(() => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Commande updated', life: 3000});
        this.hideDialog();
        this.commandes = [...this.commandes];
      }).catch(error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error updating commande', life: 3000});
        console.error('Error updating commande', error);
      });
    } else {
      this.commandeService.addCommande(this.commande).then((addedCommande) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Commande added', life: 3000});
        this.hideDialog();
        this.commandes = [...this.commandes, addedCommande];
      }).catch(error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error adding commande', life: 3000});
        console.error('Error adding commande', error);
      });
    }
  }

 

 





  onGlobalFilter(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
