import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../demo/api/product';
import { ProductService } from '../../../demo/service/product.service';

@Component({
    templateUrl: './productoverview.component.html',
})
export class ProductOverviewComponent implements OnInit {
    
    color: string = 'bluegray';
    size: string = 'M';
    liked: boolean = false;
    images: string[] = [];
    selectedImageIndex: number = 0;
    quantity: number = 1;  // Initial quantity

    product: Product = { id: '', name: '', prix: 0 };

    constructor(private productService: ProductService, private router: Router) { }

    ngOnInit(): void {
        this.images = [
            'product-overview-3-1.png',
            'product-overview-3-2.png',
            'product-overview-3-3.png',
            'product-overview-3-4.png'
        ];

        const productId = '665a3242c0e86fbef95cda57';
        this.productService.getProductById(productId).then(data => {
            this.product = data;
        }).catch(error => {
            console.error('Error fetching product:', error);
        });
    }

    addToCart() {
        // Clear cart from local storage
        localStorage.removeItem('cart');

        const cartItem = {
            id: this.product.id,
            name: this.product.name,
            price: this.product.prix,
            quantity: this.quantity,
            image: this.images[this.selectedImageIndex] // Assuming this should be 'image' instead of 'Image'
        };

        // Retrieve existing cart items from local storage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if the product already exists in the cart
        const existingItemIndex = cart.findIndex((item: any) => item.id === this.product.id);
        if (existingItemIndex !== -1) {
            // If the product exists, update the quantity
            cart[existingItemIndex].quantity += this.quantity;
        } else {
            // Otherwise, add the new item to the cart
            cart.push(cartItem);
        }

        // Update the local storage with the updated cart items
        localStorage.setItem('cart', JSON.stringify(cart));

        // Alert and navigate to the shopping cart page
        alert('Product added to cart');
        this.router.navigate(['/ecommerce/shopping-cart']);
    }
}
