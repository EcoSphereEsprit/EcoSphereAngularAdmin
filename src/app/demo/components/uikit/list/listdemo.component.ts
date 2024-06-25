import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router , NavigationEnd } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { CategoryService } from 'src/app/demo/service/category.service';
import { ProductService } from 'src/app/demo/service/product.service';


@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit, AfterViewInit {

    products: Product[] = [];
    initialProducts: Product[] = [];


    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';
    


    targetCities: any[] = [];
    allCatgories : any = [];
    orderCities: any[] = [];
    filterOptions : any = [];
    ProductIdTobeDeleted : string = "";
    filterOption : string = "none"
    myFilterName : string = "";
    sortOption : string = "default";
    deleteProductsDialog: boolean = false;
    category : any ;
    minPrice : number = 0;
    maxPrice : number = 0;
    role : string = "";


    constructor(private productService: ProductService , private CategoryService : CategoryService, public router: Router, private route: ActivatedRoute , private sanitizer: DomSanitizer) { }

    ngOnInit() {              
        this.productService.getProductList().subscribe((products : any) => {
            products.forEach((p : any) => {

              
            //const objectURL = URL.createObjectURL(p.image);
            //console.log(objectURL);
          //  p.image = this.sanitizer.bypassSecurityTrustUrl(p.image);
            this.products = products; 
            this.initialProducts = products; 
            });
            if (products)
                {
                    this.CategoryService.getCategories().subscribe((categories: any) => {
                        this.allCatgories = categories ;
                        this.products.forEach((p : any) => {
                            p.image = this.sanitizer.bypassSecurityTrustUrl(p.image);

                        });

                    }, (err)=> {
                        console.log(err);
            
                    });
                }
        }, (err)=> {
            console.log(err);

        });    
      

       

        this.sortOptions = [
            { label: 'Default', value: 'default' },
            { label: 'Date High to Low', value: 'desc' },
            { label: 'Date Low to High', value: 'asc' },
        
        ];

        this.filterOptions = [
            { label: '-None-', value: 'none' },
            { label: 'Name', value: 'name' },
            { label: 'Price', value: 'price' },
            { label: 'Category', value: 'category' },
            { label: 'Available', value: 'available' },
        
        ];
    }

    onSortChange(event: any) {
        const value = event.value;
        if (value != 'default') {
            this.productService.sortByDate(this.sortOption).subscribe((filtered : any) => {
                this.products = filtered ;
            }, (err)=> {
                console.log(err);
    
            });  
           
        } else {
            this.products = this.initialProducts ;

        }
    }


    onFilterChange(event: any) {
        this.filterOption = event.value;
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
            this.productService.filterProductsByCategory(this.category.name).subscribe((filtered : any) => {
                this.products = filtered ;
              
            }, (err)=> {
                console.log(err);
    
            });  
        }

        else if (this.filterOption === "name") {
            this.productService.filterProductsByName(this.myFilterName).subscribe((filtered : any) => {
                this.products = filtered ;
              
            }, (err)=> {
                console.log(err);
    
            });  
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
    getCategoryById(id : string)
    {
        return  this.allCatgories.filter((c: any)=> c._id === id)[0]?.name ;

    }

    clearFilter()
    {
        this.products = this.initialProducts;
        this.filterOption = "none"
    }

    getAvailability(isAvailable : boolean)
    {
        return isAvailable ? "In Stock" : "Out of Stock";
    }

    deleteProduct()
    {
        this.productService.deleteProduct(this.ProductIdTobeDeleted).subscribe((res : any) => {
            if (res)
                {
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
                  

                }
          
        }, (err)=> {
            console.log(err);

        });  
    }
    editProduct(product : any)
    {
        this.router.navigate(['/ecommerce/new-product'], { queryParams: { product : product } });
    }

    deleteSelectedProducts(id : string) {
        this.deleteProductsDialog = true;
        this.ProductIdTobeDeleted = id ;
    }

    ngAfterViewInit(): void {
        console.log('View is initialized' , this.products);
        console.log('View is initialized' , this.initialProducts);

      }
    

    


}
