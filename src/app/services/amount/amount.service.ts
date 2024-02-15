import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../alert.service';
import { finalize } from 'rxjs';
import { CreateAmount, DeleteAmount, GetAllAmount, GetOneAmount } from 'src/app/models/amount.model';

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
    return this.http.post<GetOneAmount>(this.url, dto).pipe(
      finalize(()=> this.loadingService.hideLoading())
    )
  }

  getAllAmount(){
    this.loadingService.showLoading();
    return this.http.get<GetAllAmount>(this.url).pipe(
        finalize(() => this.loadingService.hideLoading())
    )
  }

  getOneAmount(id: number){
    this.loadingService.showLoading();
    return this.http.get<GetOneAmount>(`${this.url}/${id}`).pipe(
        finalize(() => this.loadingService.hideLoading())
    )
  }

  patchAmount(id: number, dto: CreateAmount){
    this.loadingService.showLoading();
    return this.http.patch<GetOneAmount>(`${this.url}/${id}`, dto).pipe(
      finalize(()=> this.loadingService.hideLoading())
    )
  }

  deleteAmount(id: number) {
    this.loadingService.showLoading();
    return this.http.delete<DeleteAmount>(`${this.url}/${id}`).pipe(
      finalize(() => this.loadingService.hideLoading())
    )
  }

}
