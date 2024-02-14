import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetClient, GetClients, createClient, Client, UpdateClient } from '../../models/clients.model';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = `${environment.API_URL}/clients`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  createClient(dto: createClient): Observable<GetClient> {
    this.loadingService.showLoading();
    return this.http.post<GetClient>(`${this.url}`, dto).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  getClients(){
    this.loadingService.showLoading();
    return this.http.get<GetClients>(`${this.url}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  getClientById(id: number): Observable<GetClient> {
    this.loadingService.showLoading();
    return this.http.get<GetClient>(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  search(name: string) {
    return this.http.get<GetClients>(`${this.url}/search/${name}`);
  }

  updateClient(dto: UpdateClient, id: number): Observable<any> {
    this.loadingService.showLoading();
    return this.http.patch(`${this.url}/${id}`, dto).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  deleteClient(id: number): Observable<any> {
    this.loadingService.showLoading();
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
