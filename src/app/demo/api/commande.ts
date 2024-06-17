// commande.model.ts

export interface Commande {
    _id?: string; // Assurez-vous de définir les champs nécessaires pour une commande
    numCommande?: string;
    userId?: string;
    statut?: string;
    prixTotal?: number;
    modePaiement?: string;
  }
  