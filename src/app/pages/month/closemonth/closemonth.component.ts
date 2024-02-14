import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthService } from '../../../services/month/month.service';
import { GetMonth, Month } from '../../../models/month.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-closemonth',
  templateUrl: './closemonth.component.html',
  styleUrls: ['./closemonth.component.scss']
})
export class ClosemonthComponent {

  monthId: number = 0;
  month: GetMonth | null = null;

  constructor(
    private route: ActivatedRoute,
    private monthService: MonthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.monthId = +params['id'];
      this.closeMonth();
    });
  }

  closeMonth() {
    this.monthService.closeMonth(this.monthId).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          Swal.fire('Mes cerrado exitosamente', '', 'success').then(() => {
            this.router.navigate(['/months']);
          });
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      },
      (error) => {
        console.error('Error al cerrar el mes', error);
        Swal.fire('Error', 'Ocurrió un error al cerrar el mes', 'error');
      }
    );
  }




}
