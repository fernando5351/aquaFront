import { Component,Input } from '@angular/core';
import {GetClients} from '../../models/clients.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  @Input() clients: GetClients = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      email: '',
      password: '',
      dui: '',
      cellphone: '',
      otherCellphone: '',
      createdAt: ''
    }]
  }

  seeInfo(id: number){
    this.router.navigate([`infoclient/${id}`])
  }


constructor(private router: Router) {}
}

