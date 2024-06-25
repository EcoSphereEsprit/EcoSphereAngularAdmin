import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    getCustomersSmall() {
        return this.http
            .get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then((res) => res.data as CustomerService[])
            .then((data) => data);
    }

    getCustomersMedium() {
        return this.http
            .get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then((res) => res.data as CustomerService[])
            .then((data) => data);
    }

    getCustomersLarge() {
        return this.http
            .get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then((res) => res.data as CustomerService[])
            .then((data) => data);
    }
}
