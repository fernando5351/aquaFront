// import { Injectable } from '@angular/core';
// import {environment} from 'src/environments/environment';
// import {HttpClient} from '@angular/common/http';
// import {AlertService} from '../alert.service';
// import { Observable, finalize } from 'rxjs';
// import {Payment} from '../../models//payment.model'

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {

//   private url = `${environment.API_URL}/payment`;
//   constructor(
//     private http: HttpClient,
//     private loadingService: AlertService
//   ) { }

//   pay(dto: Payment, id: number): Observable<any> {
//     this.loadingService.showLoading();
//     return this.http.patch(`${this.url}/${id}`, dto).pipe(
//       finalize(() => {
//         this.loadingService.hideLoading()
//       })
//     )
//   }

//   getPaymentsByClientId(clientId: number): Observable<Payment[]> {
//     this.loadingService.showLoading();
//     return this.http.get<Payment[]>(`http://localhost:3000/api/v1/clients/${clientId}`).pipe(
//       finalize(() => {
//         this.loadingService.hideLoading();
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
 import {environment} from 'src/environments/environment';
import { Pay, Payment, getPayment } from '../../models/payment.model';
import { AlertService } from '../alert.service';
import { GetClient } from 'src/app/models/clients.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = `${environment.API_URL}`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  pay(dto: Pay, id: number): Observable<any> {
    this.loadingService.showLoading();
    return this.http.patch(`${this.url}/payment/${id}`, dto).pipe(
      finalize(() => {
        this.loadingService.hideLoading()
      })
    )
  }

  getPaymentsByClientId(clientId: number) {
    this.loadingService.showLoading();
    return this.http.get<GetClient>(`${this.url}/clients/${clientId}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  getAllPayment() {
    this.loadingService.showLoading();
    return this.http.get<getPayment>(`${this.url}/payment`).pipe(
      finalize(() => {
        this.loadingService.hideLoading()
      })
    )
  }
}

