import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert.service';
import { CreateAddress, GetAddress, GetAddresses } from 'src/app/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url = `${environment.API_URL}/adress`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  create(dto: CreateAddress){
    this.loadingService.showLoading();
    console.log('soy el servicio de creare');
    console.log(dto);
    return this.http.post<GetAddress>(this.url, dto).pipe(
      finalize(()=> this.loadingService.hideLoading() )
    )
  }

  getAddres(){
    this.loadingService.showLoading();
    return this.http.get<GetAddresses>(this.url).pipe(
      finalize(()=> this.loadingService.hideLoading() )
    )
  }

  deleteClient(id: number) {
    this.loadingService.showLoading();
    return  this.http.delete(`${this.url}/${id}`).pipe(
      finalize(() => this.loadingService.hideLoading())
    )
  }

}
