import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../alert.service';
import { Observable, finalize } from 'rxjs';
import { Amount, CreateAmount, getAmount, getAmounts } from 'src/app/models/amount.model';

@Injectable({
  providedIn: 'root'
})
export class AmountService {

  private url = `${environment.API_URL}/amount`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  createAmount(dto: CreateAmount){
    this.loadingService.showLoading();
    return this.http.post<getAmount>(`${this.url}`, dto).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    );
  }


  getAmounts(){
    this.loadingService.showLoading();
    return this.http.get<getAmounts>(`${this.url}`).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    );
  };


  pathcAmount(dto: Amount, id: number): Observable<any> {
    this.loadingService.showLoading();
    return this.http.patch(`${this.url}/${id}`, dto ).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  };

  getAmountById(id: number){
    this.loadingService.showLoading();
    return this.http.get<getAmount>(`${this.url}/${id}`).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    );
  }

  deleteAmount(id: number): Observable<any>{
    this.loadingService.showLoading();
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
    };
}
