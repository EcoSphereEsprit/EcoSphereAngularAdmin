import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';


@NgModule({
    declarations: [
        FlashSaleComponent
    ],
    imports: [
        CommonModule,
        AdministrationRoutingModule
    ]
})
export class AdministrationModule { }
