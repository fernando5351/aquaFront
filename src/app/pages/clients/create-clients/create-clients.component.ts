import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.scss']
})
export class CreateClientsComponent implements OnInit {
  addresses: [{ id: number}] = [{ id: 1 }];
  form: FormGroup = new  FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      streetName1: ['', Validators.required],
      houseNumber1: ['', Validators.required],
      polygonNumber1: ['', Validators.required]
    });
  }

  addAddress() {
    const streetName = this.form.get(`streetName${this.addresses.length}`)?.value;
    const houseNumber = this.form.get(`houseNumber${this.addresses.length}`)?.value;
    const polygonNumber = this.form.get(`polygonNumber${this.addresses.length}`)?.value;

    if (streetName && houseNumber && polygonNumber) {
      this.addresses.push({ id: this.addresses.length + 1 });
      this.form.addControl(`streetName${this.addresses.length}`, this.formBuilder.control('', Validators.required));
      this.form.addControl(`houseNumber${this.addresses.length}`, this.formBuilder.control('', Validators.required));
      this.form.addControl(`polygonNumber${this.addresses.length}`, this.formBuilder.control('', Validators.required));
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

}
