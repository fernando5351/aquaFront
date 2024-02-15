import { Component } from '@angular/core';
import {MonthService} from '../../../services/month/month.service'
import { Router,ActivatedRoute } from '@angular/router';
import {GetMonth} from '../../../models/month.model'

@Component({
  selector: 'app-getonemonth',
  templateUrl: './getonemonth.component.html',
  styleUrls: ['./getonemonth.component.scss']
})
export class GetonemonthComponent {

  monthId: number = 0
  month: GetMonth | null =  null

  constructor(private monthService: MonthService,
              private router: ActivatedRoute,
    ){}


    ngOnInit(): void {
      this.router.params.subscribe(params => {
        this.monthId = +params['id'];
        this.getMonthInfo();
      });
    }

    getMonthInfo() {
      this.monthService.detailById(this.monthId).subscribe(
        (data: GetMonth) => {
          this.month = data;
          console.log(this.month);
        },
        (error) => {
          console.error('Error al obtener la información del mes', error);
        }
      );
    }

}
