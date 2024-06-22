import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { CategoryService } from 'src/app/demo/service/category.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit {

    products: Product[] = [];
    initialProducts: Product[] = [];


    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';


    targetCities: any[] = [];
    allCatgories : any = [];
    orderCities: any[] = [];
    filterOptions : any = [];
    filterOption : string = ""
    minPrice : number = 0;
    maxPrice : number = 1200;

    constructor(private productService: ProductService , private CategoryService : CategoryService) { }

    ngOnInit() {
        this.productService.getProductList().subscribe((products : any) => {
            this.products = products ;
            this.initialProducts = products ;
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
      
        this.targetCities = [];

       

        this.sortOptions = [
            { label: 'Date High to Low', value: '!price' },
            { label: 'Date Low to High', value: 'price' },
        
        ];

        this.filterOptions = [
            { label: 'Price', value: 'price' },
            { label: 'Category', value: 'category' },
            { label: 'Available', value: 'available' },
        
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }


    onFilterChange(event: any) {
        this.filterOption = event.value;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@", event)

       
    }

    filter() {
        if ( this.filterOption  === "price") {
            this.productService.filterProductsByPrice(this.minPrice , this.maxPrice).subscribe((filtered : any) => {
                this.products = filtered ;
              
            }, (err)=> {
                console.log(err);
    
            });  
        } 
        else if (this.filterOption === "category") {
            // this.productService.filterProductsByPrice(this.minPrice , this.maxPrice).subscribe((filtered : any) => {
            //     this.products = filtered ;
              
            // }, (err)=> {
            //     console.log(err);
    
            // });  
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
    getCategoryById(id : string)
    {
        return  this.allCatgories.filter((c: any)=> c._id === id)[0].name ;

    }

    clearFilter()
    {
        this.products = this.initialProducts;
    }
}
