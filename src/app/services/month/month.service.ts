import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { Observable, finalize } from 'rxjs';
import { Month, CreateMonth, GetMonth, GetMonths, UpdateMonth, DeleteMonth } from 'src/app/models/month.model';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  private url = `${environment.API_URL}/monthlyfees`;


  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  createMonth(dto: CreateMonth): Observable<GetMonth> {
    this.loadingService.showLoading();
    return this.http.post<GetMonth>(`${this.url}/open`, dto).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  getMonths(): Observable<GetMonths> {
    this.loadingService.showLoading();
    return this.http.get<GetMonths>(`${this.url}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  updateMonth(dto: UpdateMonth, id: number): Observable<any> {
    this.loadingService.showLoading();
    return this.http.patch(`${this.url}/${id}`, dto).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  closeMonth(id: number): Observable<GetMonth> {
    this.loadingService.showLoading();
    return this.http.get<GetMonth>(`${this.url}/close-month/${id}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  detailById(id: number): Observable<GetMonth> {
    this.loadingService.showLoading();
    return this.http.get<GetMonth>(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  deleteMonth(id: number): Observable<DeleteMonth> {
    this.loadingService.showLoading();
    return this.http.delete<DeleteMonth>(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
