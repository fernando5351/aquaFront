import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Payment,Client,  Address} from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];
  clientId: number = 0;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.clientId = id; // Obtener el ID del cliente desde la ruta
      this.getPaymentsByClientId(id);
    });
  }

  getPaymentsByClientId(clientId: number): void {
    this.paymentService.getPaymentsByClientId(clientId).subscribe(
      (paymentsData: Payment[]) => {
        this.payments = paymentsData;
        console.log(this.payments);

      },
      (error) => {
        console.error('Error al obtener la información de los pagos del cliente', error);
      }
    );
  }


  updatePaymentStatus(payment: Payment): void {
    if (payment) {
      payment.status = 'paid';
      this.paymentService.pay(payment, payment.id).subscribe(
        (response) => {
          console.log('Pago realizado exitosamente:', response);
          // Aquí puedes manejar la respuesta del servicio después de actualizar el estado del pago
        },
        (error) => {
          console.error('Error al realizar el pago:', error);
          // Aquí puedes manejar el error al intentar actualizar el estado del pago
        }
      );
    }
  }
}
