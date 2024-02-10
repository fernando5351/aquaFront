import { Component } from '@angular/core';
import {getAmounts} from '../../../models/amount.model';
import {AmountService} from '../../../services/amount/amount.service'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-get-amount',
  templateUrl: './get-amount.component.html',
  styleUrls: ['./get-amount.component.scss']
})
export class GetAmountComponent {

  amounts: getAmounts = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      amount: 0,
      createdAt: ''
    }]
  }

  constructor (
    private  amountService: AmountService,
    private  router: Router
  ){}

  ngOnInit(){
    this.getAmount()
  }

  getAmount(){
    this.amountService.getAmounts().subscribe(
      (data)=>{
        this.amounts = data
        console.log(this.amounts.data);
      },
      (error)=>{
        console.log('Error to get amount',error);

      }
    );
  }

}
