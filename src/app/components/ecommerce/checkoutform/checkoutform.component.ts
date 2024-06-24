import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../api/commande';
import { EmailService } from '../../../service/email.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkoutform.component.html'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  total: number = 0;
  paymentMethod: string = 'cash';
  showCardPopup: boolean = false;
  cardForm!: FormGroup;
  secretCode: string = '';
  emailSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commandeService: CommandeService,
    private emailService: EmailService
  ) {}
  private initCartItems(): void {
    // Example data for demonstration
    this.cartItems = [
      { name: 'Cotton Shirt', price: 29.99, quantity: 2, subtotal: 59.98 },
      // Add more items as needed
    ];
  }
  
  ngOnInit(): void {
    this.initCheckoutForm();
    this.initCardForm(); // Ajout de l'initialisation du formulaire de carte ici
    this.initCartItems();
    this.calculateTotal();
  }

  private initCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      saveInfo: [false],
      newsletter: [false]
    });
  }

  private initCardForm(): void {
    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      cardCode: ['', Validators.required],
      secretCodeInput: [''] // Assurez-vous que le nom correspond à celui utilisé dans le template HTML
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updatePaymentMethod(method: string): void {
    this.paymentMethod = method;
    this.calculateTotal();
    this.showCardPopup = method === 'card';
  }

  processCheckout(): void {
    if (this.checkoutForm.valid) {
      if (this.paymentMethod === 'cash') {
        this.confirmOrder();
      } else {
        this.showCardPopup = true;
      }
    } else {
      console.error('Le formulaire de paiement est invalide. Veuillez vérifier les champs.');
    }
  }

  confirmOrder(): void {
    const formData = this.checkoutForm.value;

    const commandeData = {
      numCommande: `CMD${Math.floor(Math.random() * 10000)}`,
      produits: this.cartItems.map(item => ({
        idProduit: '665a3242c0e86fbef95cda57', // Remplacez par l'ID réel du produit
        quantite: item.quantity,
        prixUnitaire: item.price
      })),
      infosLivraison: {
        nom: formData.name,
        prenom: formData.lastName,
        adresse: formData.address,
        ville: formData.city,
        codePostal: formData.postalCode,
        pays: 'Tunis', // Remplacez par le pays approprié
        telephone: formData.phoneNumber
      },
      prixTotal: this.total,
      modePaiement: this.paymentMethod,
      coupon: null,
      pourcentageReduction: 0
    };

    console.log('Données de commande:', commandeData);

    this.commandeService.ajouterCommande(commandeData).subscribe(
      (response: Commande) => {
        console.log('Commande ajoutée avec succès:', response);

        const invoiceData = {
          commandeId: response._id,
          status: 'pending',
          amount: this.total
        };

        this.router.navigate(['/gestion/crud_commande']);
 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la commande:', error);
      }
    );
  }

  confirmOrderPayment(): void {
    const formData = this.checkoutForm.value;
  
    const commandeData = {
      numCommande: `CMD${Math.floor(Math.random() * 10000)}`,
      produits: this.cartItems.map(item => ({
        idProduit: '665a3242c0e86fbef95cda57', // Remplacez par l'ID réel du produit
        quantite: item.quantity,
        prixUnitaire: item.price
      })),
      infosLivraison: {
        nom: formData.name,
        prenom: formData.lastName,
        adresse: formData.address,
        ville: formData.city,
        codePostal: formData.postalCode,
        pays: 'Tunis', // Remplacez par le pays approprié
        telephone: formData.phoneNumber
      },
      prixTotal: this.total,
      modePaiement: this.paymentMethod,
      coupon: null,
      pourcentageReduction: 0
    };
  
    console.log('Données de commande à envoyer pour le paiement par carte:', commandeData);
  
    // Vous devrez ajuster la logique suivante pour correspondre à votre API de traitement de paiement par carte
    this.commandeService.ajouterCommande(commandeData).subscribe(
      (response: Commande) => {
        console.log('Commande ajoutée avec succès pour le paiement par carte:', response);
  
        const invoiceData = {
          commandeId: response._id,
          status: 'paied',
          amount: this.total
        };
        this.router.navigate(['/gestion/crud_commande']);

        // Gérer la réponse de l'API ici, par exemple, naviguer vers une page de confirmation
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la commande pour le paiement par carte:', error);
      }
    );
  }
  

  submitCardDetails(): void {
    if (this.cardForm.valid) {
      if (this.secretCode) {
        this.showCardPopup = false;

        const facturationData = {
          methodePaiement: this.paymentMethod
        };

      
      } else {
        console.error('Veuillez d\'abord générer le code secret en cliquant sur "Générer et envoyer le code".');
      }
    } else {
      console.error('Le formulaire de carte est invalide. Veuillez vérifier les champs.');
    }
  }

  generateAndSendSecretCode(): void {
    this.secretCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log('Code secret généré (simulé):', this.secretCode);

    const email = this.checkoutForm.get('email')?.value;
    console.log(`Envoi du code secret à l'adresse email ${email}`);

    this.emailService.sendSecretCode(email, this.secretCode).then(
      (response) => {
        console.log('Email envoyé avec succès:', response);
        this.emailSent = true;
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
      }
    );
  }

  updateQuantity(event: number, item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity = event;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.calculateTotal();
    }
  }

  removeItem(index: number): void {
    // Implémentez la logique de suppression d'article du panier si nécessaire
  }
}
