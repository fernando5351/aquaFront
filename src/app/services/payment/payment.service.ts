import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
 import {environment} from 'src/environments/environment';
import { Pay, Payment, getPayment, getReport } from '../../models/payment.model';
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

  getReportPayment(from: Date, untill: Date) {
    this.loadingService.showLoading();
    const params = new HttpParams()
      .set('from', from.toISOString())
      .set('until', untill.toISOString());
    return this.http.get<getReport>(`${this.url}/report`, { params }).pipe(
      finalize(() => {
        this.loadingService.hideLoading()
      })
    )
  }
}

