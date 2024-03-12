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
      amountId: [],
      email: '',
      password: '',
      dui: '',
      cellphone: '',
      otherCellphone: 0,
      createdAt: new Date()
    }]
  }

  constructor(private router: Router, private clientService: ClientService) {}

  refreshPage(){
    window.location.reload()
  }

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
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(
          (response: any) => {
            console.log(response);
            if (response.statusCode === 200) {
              Swal.fire(
                'Eliminado',
                'El cliente ha sido eliminado correctamente.',
                'success'
              ).then(() => {
                this.refreshPage();
              });
            } else {
              Swal.fire(
                'Error',
                'No se pudo eliminar el cliente.',
                'error'
              );
            }
          },
          (error) => {
            console.error('Error al eliminar el cliente', error);
            if (error.status === 403) {
              Swal.fire(
                'Acceso denegado',
                'Tu usuario no está autorizado para esta acción.',
                'error'
              );
            } else {
              Swal.fire(
                'Error',
                'Ocurrió un error al eliminar el cliente.',
                'error'
              );
            }
          }
        );
      }
    });
  }

  update(id: number) {
    // Obtener la información del cliente por su ID
    this.clientService.getClientById(id).subscribe((clientData: any) => {
      const client = clientData.data;

      // Crear el HTML para el formulario en el modal
      const modalHtml = `
        <form>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" class="swal2-input" value="${client.name}">
          </div>
          <div class="form-group">
            <label for="dui">DUI:</label>
            <input type="text" id="dui" class="swal2-input" value="${client.dui}">
          </div>
          <div class="form-group">
            <label for="cellphone">Teléfono:</label>
            <input type="text" id="cellphone" class="swal2-input" value="${client.cellphone}">
          </div>
          <!-- Agregar aquí más campos del formulario según sea necesario -->
        </form>
      `;

      Swal.fire({
        title: 'Editar Cliente',
        html: modalHtml,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        preConfirm: () => {
          // Capturar los valores de los campos en el formulario antes de confirmar
          const updatedClient = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            dui: (document.getElementById('dui') as HTMLInputElement).value,
            cellphone: (document.getElementById('cellphone') as HTMLInputElement).value,
            // Agregar aquí más campos según sea necesario
          };

          return updatedClient;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar una solicitud HTTP PUT para actualizar el cliente en el servidor
          this.clientService.updateClient(result.value, id).subscribe(
            (response: any) => {
              if (response.statusCode === 200) {
                Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success').then(() => {
                  this.refreshPage()
                });
              } else {
                Swal.fire('Error', 'No se pudo actualizar el cliente.', 'error');
              }
            },
            (error) => {
              // Manejar los errores según sea necesario
            }
          );
        }
      });
    });
  }

}

