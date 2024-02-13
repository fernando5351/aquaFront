import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{MonthService} from '../../../services/month/month.service'
import { CreateMonth } from 'src/app/models/month.model';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent {

  selectedFromDate: Date = new Date();
  selectedUntilDate: Date = new Date();
  selectedStatus: string = 'active';

  constructor(private monthService: MonthService) { }

  createMonth(event:Event) {
    const dto: CreateMonth = {
      from: this.selectedFromDate,
      untill: this.selectedUntilDate,
      status: this.selectedStatus
    };

    this.monthService.createMonth(dto).subscribe(
      (response) => {
        console.log('Mes creado exitosamente:', response);
        // Agrega lógica para manejar la respuesta del servicio
      },
      (error) => {
        console.error('Error al crear el mes:', error);
        // Agrega lógica para manejar el error
      }
    );
  }

}

