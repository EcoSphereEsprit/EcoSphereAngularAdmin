import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkoutform.component.html'
})
export class CheckoutComponent implements OnInit {

  email: string = '';
  phoneNumber: string = '';
  newsletter: boolean = false;
  saveInfo: boolean = false;
  shippingInfo: any = {
    name: '',
    lastName: '',
    address: '',
    address2: '',
    postalCode: '',
    city: ''
  };
  cartItems: any[] = [];
  paymentMethod: string = '';
  paymentOptions: string[] = ['card', 'cash'];
  total: number = 0;

  checkoutForm: FormGroup = new FormGroup({});
router: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadPaymentMethod();
    this.initializeForm();
    this.calculateTotal();

    console.log('Cart Items in CheckoutComponent:', this.cartItems);
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+(?:[0-9]●?●?){6,14}[0-9]$')]], // Validation for international phone number
      newsletter: [this.newsletter],
      saveInfo: [this.saveInfo],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      paymentMethod: ['', Validators.required]
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

  loadPaymentMethod(): void {
    const storedPaymentMethod = localStorage.getItem('paymentMethod');
    if (storedPaymentMethod && this.paymentOptions.includes(storedPaymentMethod)) {
      this.paymentMethod = storedPaymentMethod;
      this.checkoutForm.patchValue({ paymentMethod: this.paymentMethod });
    } else {
      this.paymentMethod = ''; // Set default if none stored
    }
  }

  calculateTotal(): void {
    let subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.total = subtotal + this.getShippingCost();
  }

  getShippingCost(): number {
    return this.paymentMethod === 'cash' ? 7 : 0;
  }

  processCheckout(): void {
    if (this.checkoutForm.valid) {
      console.log('Checkout process initiated...');
      // Implement checkout logic here
    } else {
      console.error('Form validation error. Please check your input.');
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

  updatePaymentMethod(method: string) {
    this.paymentMethod = method;
    this.calculateTotal(); // Recalculate total with updated payment method
    localStorage.setItem('paymentMethod', this.paymentMethod);
  }
}
