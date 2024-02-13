import { Component,OnInit } from '@angular/core';
import { MonthService } from '../../../services/month/month.service';
import { Month } from 'src/app/models/month.model';
import { Router } from '@angular/router'

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
    this.getMonthService.getMonths().subscribe(
      (response) => {
        this.months = response.data;
      },
      (error) => {
        console.error('Error al obtener los meses:', error);
        // Agrega lógica para manejar el error
      }
    );
  }


  closeMonth(id: number){
    this.router.navigate([`closeMonth/${id}`])
  }

  detailsMonth(id:number){
    this.router.navigate([`oneMonth/${id}`])
  }


}
