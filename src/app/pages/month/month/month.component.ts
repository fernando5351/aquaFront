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
        Swal.fire({
          icon: 'success',
          title: '¡Mes creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/months']);
        });
      },
      (error) => {
        console.error('Error al crear el mes:', error);
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message
          });
        }
        if (error.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Los meses de apertura y cierre deben ser unicos'
          });
        }
      }
    );
  }

}
