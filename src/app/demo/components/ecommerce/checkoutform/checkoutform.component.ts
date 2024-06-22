import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandeService } from '../../../../service/commande.service';
import { Commande } from '../../../../api/commande'; // Adjust path as per your application structure

@Component({
  selector: 'app-checkout',
  templateUrl: './checkoutform.component.html'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  total: number = 0;
  paymentMethod: string = 'card'; // Default payment method
  paymentOptions: string[] = ['card', 'cash']; // Payment options
    userId: any;

  constructor(
    private formBuilder: FormBuilder,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCartItems();
    this.calculateTotal();
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      newsletter: [false],
      saveInfo: [false],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      paymentMethod: [this.paymentMethod, Validators.required]
    });
  }

  loadCartItems(): void {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    } else {
      this.cartItems = [];
    }
  }

  calculateTotal(): void {
    let subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.total = subtotal + this.getShippingCost();
  }

  getShippingCost(): number {
    return this.paymentMethod === 'cash' ? 7 : 0;
  }

  updatePaymentMethod(method: string): void {
    this.paymentMethod = method;
    this.calculateTotal();
  }

  processCheckout(): void {
    if (this.checkoutForm.valid) {
      // Form is valid, proceed with checkout
      const formData = this.checkoutForm.value;
      const commandeData = {
        numCommande: `CMD${Math.floor(Math.random() * 10000)}`,
        produits: this.cartItems.map(item => ({
          idProduit: '665a3242c0e86fbef95cda57',
          quantite: item.quantity,
          prixUnitaire: item.price
        })),
        infosLivraison: {
          nom: formData.name,
          prenom: formData.lastName,
          adresse: formData.address,
          ville: formData.city,
          codePostal: formData.postalCode,
          pays: 'Tunis',
          telephone: formData.phoneNumber
        },
        prixTotal: this.total,
        modePaiement: formData.paymentMethod,
        coupon: null,
        pourcentageRéduction: 0,

      };
  
      // Call commandeService to add order
      this.commandeService.ajouterCommande(commandeData).subscribe(
        (response: Commande) => {
          console.log('Commande ajoutée avec succès:', response);
          // Display order details or redirect as needed
        },
        error => {
          console.error('Erreur lors de l\'ajout de la commande:', error);
          // Handle error
        }
      );
    } else {
      // Form is invalid, log validation errors
      console.error('Form validation error. Please check your input.');
      // Optional: Provide user feedback on invalid fields
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const controlErrors = this.checkoutForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error(`Validation error for ${key}: ${keyError}`);
          });
        }
      });
    }
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
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }
}
