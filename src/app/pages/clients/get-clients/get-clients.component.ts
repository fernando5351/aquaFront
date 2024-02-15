import { Component, OnInit } from '@angular/core';
import { GetClients } from '../../../models/clients.model';
import { ClientService } from '../../../services/clients/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-clients',
  templateUrl: './get-clients.component.html',
  styleUrls: ['./get-clients.component.scss']
})
export class GetClientsComponent implements OnInit {

  placeholder = 'Buscar cliente...';

  clients: GetClients = {

    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      email: '',
      password: '',
      amountId: 0,
      dui: '',
      cellphone: '',
      otherCellphone: 0,
      createdAt: new Date()
    }]
  };

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data;
        console.log(this.clients.data);
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
        if (error.status === 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'El cliente ya existe',
            timer: 2000
          });
        }
      }
    );
  }

  searchChange(name: string) {
    if (name.length > 0) {
      this.clientService.search(name).subscribe((response) => {
        this.clients.data = response.data;
        console.log();
      });
    } else {
      this.getClients();
    }
  }
}
