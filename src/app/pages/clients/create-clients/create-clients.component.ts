import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CreateAddress } from 'src/app/models/address.model';
import { Amount, listAmountSelected } from 'src/app/models/amount.model';
import { createClient } from 'src/app/models/clients.model';
import { AddressService } from 'src/app/services/address/address.service';
import { AmountService } from 'src/app/services/amount/amount.service';
import { ClientService } from 'src/app/services/clients/client.service';
import Swal from 'sweetalert2';

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
  errorOnDui: string = '';
  errorOnCellphone: string = '';
  invalidPolygon: [{ id: number; status: boolean; }] = [{id: 0, status: false}];
  invalidStreet: [{ id: number, status: boolean}] = [{id: 0, status: false}];
  invalidHouse: [{ id: number, status: boolean}] = [{id: 0, status: false}];
  amounts: listAmountSelected[] = [{amount: 0, name: '', id: 0}];
  selectedAmountId: number = 0; // Inicializa con null o cualquier valor predeterminado según tu necesidad

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
      dui: ['', [Validators.required, this.validateDuiFormat.bind(this)]],
      cellphone: [''],
      amountId: ['Seleccione...', Validators.required],
      streetName1: ['', Validators.required],
      houseNumber1: ['', Validators.required],
      polygonNumber1: ['', Validators.required]
    });

    this.getAllAmount();
  }

  addToAmounts() {
    const amountId = this.form.get('amountId')?.value;
    if (this.amounts.length > 0 && this.amounts[0].id === 0) {
      this.amounts = []
    }

    const selectedAmount = this.amount.find(amount =>{
      return amount.id == amountId
    });

    if (selectedAmount) {
        this.amounts.push({ id: selectedAmount.id, name: selectedAmount.name, amount: selectedAmount.amount });
    }
  }

  deleteAmount(id: number) {
    let amountIdForDelete = id;
    console.log(amountIdForDelete);

    this.amounts = this.amounts.filter((item)=>{
        return item.id != amountIdForDelete;
    })
  }

  validateDuiFormat(control: AbstractControl): {[key: string]: any} | null {
    const duiRegex = /^\d{8}-\d$/;
    const input = "XXXXXXXX-X";

    if (!duiRegex.test(input) && control.value.length >= 8) {
      console.log('estoy dentro del if');
      this.errorOnDui = 'El formato del DUI no es válido (debe ser 00000000-0).'
      return duiRegex.test(control.value) ? null : { 'formatoInvalido': true };
    }
    return duiRegex.test(control.value) ? null : { 'formatoInvalido': false };
  }

  validateCellphoneFormat(control: AbstractControl): {[key: string]: any} | null {
    const duiRegex = /^\d{4}-\d{4}$/;
    const input = "xxxx-xxxx";

    if (!duiRegex.test(input) && control.value.length >= 8) {
      console.log('estoy dentro del if');
      this.errorOnCellphone = 'El formato del telefono no es válido (debe ser 0000-0000).'
      return duiRegex.test(control.value) ? null : { 'formatoInvalido': true };
    }
    return duiRegex.test(control.value) ? null : { 'formatoInvalido': false };
  }

  onDuiKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!((event.key >= '0' && event.key <= '9') || event.key === '-' || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      return;
    }

    if (value.length === 10 && !(event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      return;
    }

    if (value.length === 8 && event.key !== '-' && event.key !== 'Backspace' && event.key !== 'Delete') {
      input.value = value + '-';
    }

    if (value.includes('-') && event.key === '-') {
      event.preventDefault();
    }
  }

  onCellphoneKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!((event.key >= '0' && event.key <= '9') || event.key === '-' || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      return;
    }

    if (value.length === 9 && !(event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      return;
    }

    if (value.length === 4 && event.key !== '-' && event.key !== 'Backspace' && event.key !== 'Delete') {
      input.value = value + '-';
    }

    if (value.includes('-') && event.key === '-') {
      event.preventDefault();
    }
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
      this.invalidAmountId = true;
    } else {
      this.invalidAmountId = false;
    }

    const streetName1 = this.form.get('streetName1')?.value;
    const houseNumber1 = this.form.get('houseNumber1')?.value;
    const polygonNumber1 = this.form.get('polygonNumber1')?.value;
    if (!streetName1 && !houseNumber1 && !polygonNumber1) {
      this.direction = true;
    } else {
      this.direction = false;
    }


    let dto: createClient = {
      name: name,
      email: email,
      dui: dui,
      amountId:  amountId,
      cellphone: cellphone,
      otherCellphone: 0
    };

    dto.amountId = [];

    for (let i = 0; i < this.amounts.length; i++) {
      const element = this.amounts[i].id;
      dto.amountId = [...dto.amountId, element];
    }

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
          console.log(dtoAddress);

          this.addressService.create(dtoAddress).subscribe({
            next: (response) => {
              console.log(response);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cliente registrado exitosamente",
                showConfirmButton: false,
                timer: 1500
              });

              this.router.navigate(['/clients']);
            },
            error: (error) => {
              console.error(error);
            }
          })
        }
      },
      error: (err) => {
        if (err.status == 409) {
          Swal.fire({
            icon: "error",
            title: "Correo y Dui deben ser unicos",
            showConfirmButton: false,
            timer: 1200
          });
        }
        if (err.status == 404) {
          Swal.fire({
            icon: "error",
            title: "Peticion erronea, verifica los datos",
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          });
        }
        if (err.status >= 500) {
          Swal.fire({
            icon: "info",
            title: "¡ups!, ocurrio un error en el servidor",
            showConfirmButton: false,
            timer: 1200
          });
        }
      }
    })

  }

}
