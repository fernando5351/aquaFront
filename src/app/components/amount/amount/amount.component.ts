import { Component,Input } from '@angular/core';
import { DeleteAmount, UpdateAMount, GetAllAmount, GetOneAmount, Amount, CreateAmount} from '../../../models/amount.model';
import Swal from 'sweetalert2';
import {AmountService} from '../../../services/amount/amount.service'

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {

  @Input() amounts: GetAllAmount = {
    statusCode: 0,
    message: '',
    data:[{
      id:0,
      name: '',
      amount: 0,
      createdAt: new Date()
    }]
  }

  constructor(private amountService: AmountService) {}




  refreshPage(){
    window.location.reload()
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este monto?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.amountService.deleteAmount(id).subscribe({
          next: (response) => {
            // Manejar la respuesta del servicio
            console.log(response);
            if (response.statusCode == 200) {
              Swal.fire(
                'Eliminado',
                'El monto ha sido eliminado correctamente.',
                'success'
              );
              // Aquí puedes actualizar la lista de montos si es necesario
            } else {
              Swal.fire(
                'Error',
                'No se pudo eliminar el monto.',
                'error'
              );
            }
          },
          error: (error) => {
            console.error('Error al eliminar el monto', error);
            if (error.status === 403) {
              Swal.fire(
                'Acceso denegado',
                'Tu usuario no está autorizado para esta acción.',
                'error'
              );
            } else {
              Swal.fire(
                'Error',
                'Ocurrió un error al eliminar el monto.',
                'error'
              );
            }
          }
        });
      }
    });
  }


  update(id: number) {
    this.amountService.getOneAmount(id).subscribe((amount) => {
      const selectedAmount: GetOneAmount = amount;
      const editableAmount = { ...selectedAmount };

      Swal.fire({
        title: 'Editar Monto',
        html: `
          <form>
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" id="name" class="swal2-input" value="${editableAmount.data.name}">
            </div>
            <div class="form-group">
              <label for="amount">Monto:</label>
              <input type="number" id="amount" class="swal2-input" value="${editableAmount.data.amount}">
            </div>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        preConfirm: () => {
          const updatedAmount: CreateAmount  = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            amount: parseFloat((document.getElementById('amount') as HTMLInputElement).value)
          };
          return updatedAmount;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.amountService.patchAmount( id, result.value).subscribe(
            (response) => {
              if (response.statusCode == 200) {
                Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success').then(() => {
                  this.refreshPage(); // Redirige a la página después de la actualización.
                });
              } else {
                Swal.fire('Error', 'No se pudo actualizar el monto.', 'error');
              }
            },
            (error) => {
              if (error.status === 409) {
                Swal.fire('Error', 'El monto que intentas actualizar ya existe.', 'error');
              } else if (error.status === 403) {
                Swal.fire('Error', 'Tu usuario no esta autorizado para esta accion', 'error');
              }
            }
          );
        }
      });
    });
  }

}


