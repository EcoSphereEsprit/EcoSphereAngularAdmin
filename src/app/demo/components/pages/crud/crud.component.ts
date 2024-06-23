import { CategoryService } from 'src/app/demo/service/category.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/demo/api/category';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    edit : boolean= true ;
    add : boolean = false ;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;


    product: Category = {};

    selectedProducts: Product[] = [];

    categoriesList : any = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService , private CategoryService : CategoryService) { }

    ngOnInit() {
        this.CategoryService.getCategories().subscribe((categories: any) => {
            this.categoriesList = categories
        }, (err)=> {
            console.log(err);

        });
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'Nbr_produits', header: 'Nbr_produits' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.edit = false ;
        this.add = true ;
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
      

    }

    editProduct(product: Product) {
        this.edit = true ;
        this.add = false ;
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
         this.deleteProductsDialog = false;
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        // this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.CategoryService.deleteCategorie(this.product._id as string).subscribe((res: any) => {
            if (res)
                {
                    this.CategoryService.getCategories().subscribe((categories: any) => {
                        this.categoriesList = categories
                    }, (err)=> {
                        console.log(err);
            
                    });

                }
        }, (err)=> {
            console.log(err);

        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (!this.edit)
            {
                this.CategoryService.createNewCategorie(this.product).subscribe((res: any) => {
                    if (res)
                        {
                            this.CategoryService.getCategories().subscribe((categories: any) => {
                                this.categoriesList = categories
                            }, (err)=> {
                                console.log(err);
                    
                            });
        
                        }
                }, (err)=> {
                    console.log(err);
        
                });
            }
            else
            {
                this.CategoryService.updateCategorie(this.product._id as string , this.product).subscribe((res: any) => {
                    if (res)
                        {
                            this.CategoryService.getCategories().subscribe((categories: any) => {
                                this.categoriesList = categories
                            }, (err)=> {
                                console.log(err);
                    
                            });
        
                        }
                }, (err)=> {
                    console.log(err);
        
                });
            }
 
        
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.products.length; i++) {
        //     if (this.products[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

  
}
