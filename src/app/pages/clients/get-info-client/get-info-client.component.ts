import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/clients/client.service'; // Reemplaza 'tu-ruta-del-servicio' con la ruta correcta
import { GetClient } from '../../../models/clients.model'; // Reemplaza 'tu-ruta-del-modelo' con la ruta correcta

@Component({
  selector: 'app-get-info-client',
  templateUrl: './get-info-client.component.html',
  styleUrls: ['./get-info-client.component.scss']
})
export class GetInfoClientComponent implements OnInit {
  clientId: number = 0;
  clientInfo: GetClient | null = null;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.getClientInfo();
    });
  }

  getClientInfo() {
    this.clientService.getClientById(this.clientId).subscribe(
      (data: GetClient) => {
        this.clientInfo = data;
        console.log(this.clientInfo);
      },
      (error) => {
        console.error('Error al obtener la información del cliente', error);
      }
    );
  }
}
