import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/demo/service/category.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './productlist.component.html'
})
export class ProductListComponent implements OnInit {
    products : any =  [
    ];
    color1: string = 'Bluegray';
    allCatgories : any = [] ;
   

    constructor(private productsService : ProductService , private CategoryService : CategoryService) { }
    ngOnInit(): void {
        this.productsService.getProductList().subscribe((products : any) => {
            this.products = products
            if (products)
                {
                    this.CategoryService.getCategories().subscribe((categories: any) => {
                        this.allCatgories = categories
                    }, (err)=> {
                        console.log(err);
            
                    });
                }
        }, (err)=> {
            console.log(err);

        });    
    
    }

    getProductCategoryById()
    {
        
    }

}
