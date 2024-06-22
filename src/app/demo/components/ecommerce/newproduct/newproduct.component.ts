import { filter } from 'rxjs';
import { CategoryService } from './../../../service/category.service';
import { ProductService } from './../../../service/product.service';


import { Component, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';

interface Product {
    name: string;
    prix: string;
    quantite_stock: string;
    brand: string;
    categorie: string;
    couleur: string;
    available: boolean;
    description: string;
    image: Image;
}

interface Image {
    name: string;
    objectURL: string;
    file ?: File
}

@Component({
    templateUrl: './newproduct.component.html',
    styleUrls: ['./newproduct.component.scss']
})
export class NewProductComponent implements OnInit {

    
    public categoriesList : any = [] ;
    public allCatgories : any = [] ;


    constructor(private CategoryService : CategoryService , private ProductService : ProductService )
    {

    }
    ngOnInit(): void {
        this.CategoryService.getCategories().subscribe((categories: any) => {
            this.allCatgories = categories
            this.categoriesList = categories.map((category : any)=> category.name);
            this.product.categorie = this.categoriesList[0]
        }, (err)=> {
            console.log(err);

        });
        
    }

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    text: string = '';


    colorOptions : any[]= [
    { name: 'Black', background: "bg-gray-900" },
    { name: 'Orange', background: "bg-orange-500" },
    { name: 'Green', background: "bg-green-500" },
    { name: 'Red', background: "bg-red-500" },
    { name: 'Blue', background: "bg-blue-500" },
    { name: 'Grey', background: "bg-gray-500" }
];

    product: Product = {
        name: 'test',
        prix: '1234',
        quantite_stock: '4',
        brand: 'dfghj',
        categorie: "",
        couleur: 'Blue',
        available: true,
        description: 'testayayayya',
        image: {
            name: "default",
            objectURL: ""
        }
    };

    uploadedFiles: any[] = [];

    showRemove: boolean = false;

    

    onColorSelect(color: string) {
        this.product.couleur = color;
    }

    onUpload(event: any) {
        const file: File = event.files[0];
        
        this.product.image = {
            name: file.name,
            objectURL: window.URL.createObjectURL(file),
            file : event.files[0] 
        } ;
        
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
        })
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
        })
    }

    removeImage(file: Image) {
        this.product.image = {
            name: "default",
            objectURL: ""
        };
    }

    createNewProduct()
    {
        let body : any = this.product ; 
        let image : any = this.product.image;
        body.file = image;
        body.ImageName = image.file.name
        body.protocol = "http"
        body.categorie = this.allCatgories.filter((c: any)=> c.name === this.product.categorie)[0]._id ;

        this.ProductService.createNewProduct(body).subscribe((result: any) => {
            console.log(result);
        }, (err)=> {
            console.log(err);

        });

    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.product.image = {
            name: file.name,
            objectURL: window.URL.createObjectURL(file),
            file : event.target.files[0] 
        } ;      }


        // showSuccess() {
        //     this.toastr.success('Product added successfully!', 'Success');
        //   }
        
        //   showError() {
        //     this.toastr.error('Failed to add product', 'Error');
        //   }
        
}
