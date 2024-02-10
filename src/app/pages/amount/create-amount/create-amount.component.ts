import { Component } from '@angular/core';
import {CreateAmount} from '../../../models/amount.model'
import { AmountService } from '../../../services/amount/amount.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-amount',
  templateUrl: './create-amount.component.html',
  styleUrls: ['./create-amount.component.scss']
})
export class CreateAmountComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    private amountService: AmountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  sendRequest(event: Event) {
    event.preventDefault();

    const dto: CreateAmount = {
      name: this.form.get('name')?.value,
      amount: this.form.get('amount')?.value
    };

    this.amountService.createAmount(dto).subscribe({
      next: (response) => {
        if (response.statusCode == 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Monto creado exitosamente',
            confirmButtonText: 'Ok',
            timer: 3000
          }).then(() => {
            this.router.navigate(['/amounts']);
          });
        }
      },
      error: (error) => {
        if (error.status === 400) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Algo salió mal, verifica que envíes los datos correctamente',
            timer: 3000
          });
        } else if (error.status === 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'El monto ya existe en la base de datos'
          });
        } else if (error.status === 500) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ocurrió un error interno del servidor',
            timer: 3000
          });
        }
      }
    });
  }
}
