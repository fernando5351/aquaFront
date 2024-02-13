import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonthService } from '../../../services/month/month.service';
import { GetMonth, Month } from '../../../models/month.model';

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
    private monthService: MonthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.monthId = +params['id'];
      this.closeMonth();
    });
  }

  closeMonth() {
    this.monthService.closeMonth(this.monthId).subscribe(
      (data: GetMonth) => {
        this.month = data;
        console.log(this.month);
      },
      (error) => {
        console.error('Error al obtener los detalles del mes', error);
      }
    );
  }


}
