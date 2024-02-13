import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CreateAddress } from 'src/app/models/address.model';
import { Amount } from 'src/app/models/amount.model';
import { createClient } from 'src/app/models/clients.model';
import { AddressService } from 'src/app/services/address/address.service';
import { AmountService } from 'src/app/services/amount/amount.service';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.scss']
})

export class CreateClientsComponent implements OnInit {
  addresses: { id: number}[] = [{ id: 1 }];
  form: FormGroup = new  FormGroup({});
  invalidName: boolean = false;
  invalidDui: boolean = false;
  invalidAmountId: boolean = false;
  direction: boolean = false;
  invalidPolygon: [{ id: number; status: boolean; }] = [{id: 0, status: false}];
  invalidStreet: [{ id: number, status: boolean}] = [{id: 0, status: false}];
  invalidHouse: [{ id: number, status: boolean}] = [{id: 0, status: false}];

  amount: Amount[] = [{
    id: 0,
    name: '',
    amount: 0,
    createdAt: new Date()
  }];

  constructor(
    private formBuilder: FormBuilder,
    private amountService: AmountService,
    private clientService: ClientService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      dui: ['', Validators.required],
      cellphone: [''],
      amountId: ['', Validators.required],
      streetName1: ['', Validators.required],
      houseNumber1: ['', Validators.required],
      polygonNumber1: ['', Validators.required]
    });

    this.getAllAmount();
  }

  addAddress() {
    const streetName = this.form.get(`streetName${this.addresses.length}`)?.value;
    const houseNumber = this.form.get(`houseNumber${this.addresses.length}`)?.value;
    const polygonNumber = this.form.get(`polygonNumber${this.addresses.length}`)?.value;

    if (streetName && houseNumber && polygonNumber) {
      this.addresses.push({ id: this.addresses.length + 1 });
      this.form.addControl(`streetName${this.addresses.length}`, this.formBuilder.control(''));
      this.form.addControl(`houseNumber${this.addresses.length}`, this.formBuilder.control(''));
      this.form.addControl(`polygonNumber${this.addresses.length}`, this.formBuilder.control(''));
    }
  }

  record(){
    for (let i = 0; i < this.addresses.length; i++) {
      const address = this.addresses[i]

      const streetName = this.form.get(`streetName${address.id}`)?.value;
      const houseNumber = this.form.get(`houseNumber${address.id}`)?.value;
      const polygonNumber = this.form.get(`polygonNumber${address.id}`)?.value;

      console.log('Calle ' + streetName + ' casa numero ' + houseNumber + ' poligono numero ' + polygonNumber);

    }
  }

  onAmountSelected(event: any) {
    const selectedValue = event.target.value;
    console.log('Valor seleccionado:', selectedValue);
    this.form.patchValue({
      amountId: selectedValue
    });
  }

  getAllAmount(){
    this.amountService.getAllAmount().subscribe({
      next: (response) => {
        this.amount = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  sendRequest(event: Event){
    event.preventDefault();

    const name = this.form.get('name')?.value;
    const email = this.form.get('email')?.value;
    const dui = this.form.get('dui')?.value;
    const cellphone = this.form.get('cellphone')?.value;
    const amountId = this.form.get('amountId')?.value;

    if (!name || name.trim() === '') {
      console.log('name is: ' + name);
      this.invalidName = true;
    } else {
      this.invalidName = false;
    }

    if (!dui || dui.trim() === '') {
      console.log('name is: ' + name);
      this.invalidDui = true;
    } else {
      this.invalidDui = false;
    }

    if (!amountId || amountId.trim() === '') {
      console.log('name is: ' + name);
      this.invalidAmountId = true;
    } else {
      this.invalidAmountId = false;
    }

    const streetName1 = this.form.get('streetName1')?.value;
    const houseNumber1 = this.form.get('houseNumber1')?.value;
    const polygonNumber1 = this.form.get('polygonNumber1')?.value;
    if (!streetName1 && !houseNumber1 && !polygonNumber1) {
      this.direction = true;
      console.log('no tengo info');
    } else {
      this.direction = false;
      console.log('tengo info ' + streetName1 + " " + houseNumber1 + " " + polygonNumber1);
    }

    const dto: createClient = {
      name: name,
      email: email,
      dui: dui,
      amountId:  amountId,
      cellphone: cellphone,
      otherCellphone: 0
    };

    console.log(dto);


    this.clientService.createClient(dto).subscribe({
      next: (response) => {
        const cliendId = response.data.id;



        for (let i = 0; i < this.addresses.length; i++) {
          const address = this.addresses[i];
          console.log(address);


          let streetName = this.form.get(`streetName${address.id}`)?.value;
          let houseNumber = this.form.get(`houseNumber${address.id}`)?.value;
          let polygonNumber = this.form.get(`polygonNumber${address.id}`)?.value;

          const dtoAddress: CreateAddress = {
            idClient: cliendId,
            streetName: streetName,
            houseNumber: houseNumber,
            polygonNumber: polygonNumber
          }

          this.addressService.create(dtoAddress)
        }

        finalize(() => {
          this.router.navigate(['/clients'])
        })
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
