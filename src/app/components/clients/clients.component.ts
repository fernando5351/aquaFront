import { Component,Input } from '@angular/core';
import {GetClients} from '../../models/clients.model';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  @Input() clients: GetClients = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      amountId: 0,
      email: '',
      password: '',
      dui: '',
      cellphone: '',
      otherCellphone: 0,
      createdAt: ''
    }]
  }

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {}

  seeInfo(id: number){
    this.router.navigate([`infoclient/${id}`])
  }

  deleteCliend(id:number){
    Swal.fire({
      title: 'Estas seguro de eliminar  este cliente?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(()=>{
          const index = this.clients.data.findIndex(item => item.id === id);
          this.clients.data.splice(index,1);
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado con exito.',
            'success'
          )
        })
      }
    })
  }

}

