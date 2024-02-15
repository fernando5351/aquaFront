import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MonthService } from '../../../services/month/month.service';
import { CreateMonth } from 'src/app/models/month.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent {

  selectedFromDate: Date = new Date();
  selectedUntilDate: Date = new Date();
  selectedStatus: string = 'active';

  constructor(private monthService: MonthService, private router: Router) { }

  createMonth(event:Event) {
    const dto: CreateMonth = {
      from: this.selectedFromDate,
      untill: this.selectedUntilDate,
      status: this.selectedStatus
    };

    this.monthService.createMonth(dto).subscribe(
      (response) => {
        console.log('Mes creado exitosamente:', response);
        // Muestra la ventana modal de SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Mes creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redirige al usuario a la URL '/months'
          this.router.navigate(['/months']);
        });
      },
      (error) => {
        console.error('Error al crear el mes:', error);
        // Verifica si el error tiene status 400
        if (error.status === 400) {
          // Muestra el mensaje de error en la ventana modal de SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message // Suponiendo que el mensaje de error está en el campo 'message' del objeto de error
          });
        } else {
          // Otro manejo de errores
        }
      }
    );
  }

}
