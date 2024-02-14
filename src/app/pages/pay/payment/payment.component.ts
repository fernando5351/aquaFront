import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Pay, Payment} from 'src/app/models/payment.model';
import { Client } from 'src/app/models/clients.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payments: Payment[] | undefined = undefined;
  invoiceCod: number | undefined = undefined;
  totalPay: number | undefined = 0;
  client: Client = {
    id: 0,
    name: '',
    email: '',
    dui: '',
    cellphone: '',
    createdAt: new Date(),
    amountId: 1,
    Adress: [],
    Payment: []
  };
  clientId: number = 0;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.clientId = id;
      this.getPaymentsByClientId(id);
    });
  }

  getPaymentsByClientId(clientId: number): void {
    this.paymentService.getPaymentsByClientId(clientId).subscribe({
      next: (response) => {
        this.payments = response.data.Payment?.filter(p => p.status !== "paid");
        this.client = response.data;
        this.totalPay = this.payments?.reduce(function(total: number, payment: Payment) {
          return total + payment.totalAmount;
        }, 0);
      },
      error: (error) => {
        console.error('Error al obtener la información de los pagos del cliente', error);
      }
    });
  }

  removeRow(payment: Payment){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Omitiras este pago",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, omitir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.payments = this.payments?.filter(p => p !== payment);
      }
    })
  };

  pay() {
    if (this.payments) {
      this.payments.forEach(payment => {
        if (payment.status !== 'paid') {
          this.updatePaymentStatus(payment);
        }
      });
    }
  }


  updatePaymentStatus(payment: Payment): void {
    if (payment) {
      const status = 'paid';
      const paymentToUpdate: Pay = { status , totalAmount: payment.totalAmount };
      this.paymentService.pay(paymentToUpdate, payment.id).subscribe({
        next: (response) => {
          console.log('Pago realizado exitosamente:', response);
        },
        error: (error) => {
          console.error('Error al realizar el pago:', error);
        }
      });
    }
  }

}
