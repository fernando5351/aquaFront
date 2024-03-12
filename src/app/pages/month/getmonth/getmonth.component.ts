import { Component,OnInit } from '@angular/core';
import { MonthService } from '../../../services/month/month.service';
import { Month } from 'src/app/models/month.model';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getmonth',
  templateUrl: './getmonth.component.html',
  styleUrls: ['./getmonth.component.scss']
})
export class GetmonthComponent implements OnInit {
  months: Month[] = [];

  constructor(private getMonthService: MonthService,
    private router:Router) { }

  ngOnInit(): void {
    this.getMonths();
  }

  getMonths() {
    this.getMonthService.getMonths().subscribe({
      next: (response) => {
        this.months = response.data;
      },
      error: (error) => {
        console.error('Error al obtener los meses:', error);
      }
    });
  }


  closeMonth(id: number){
    Swal.fire({
      title: '¿Estas seguro de cerrar el mes?',
      text: 'No podras revertir esto',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([`closeMonth/${id}`])
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Accion Cancelada'
        })
      }
    })

  }

  detailsMonth(id:number){
    this.router.navigate([`oneMonth/${id}`])
  }


}
