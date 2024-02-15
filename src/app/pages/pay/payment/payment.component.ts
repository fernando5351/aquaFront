import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Pay, Payment } from 'src/app/models/payment.model';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/clients.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  payments: Payment[] | undefined;
  invoiceCod: number | undefined;
  totalPay: number = 0;
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
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
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
        this.calculateTotalPay();
      },
      error: (error) => {
        console.error('Error al obtener la información de los pagos del cliente', error);
      }
    });
  }

  calculateTotalPay(): void {
    if (this.payments) {
      this.totalPay = this.payments.reduce((total, payment) => total + payment.totalAmount, 0);
    }
  }

  removeRow(payment: Payment): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Omitirás este pago",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, omitir'
    }).then((result) => {
      if (result.isConfirmed && this.payments) {
        this.payments = this.payments.filter(p => p !== payment);
        this.calculateTotalPay();
      }
    });
  };

  pay(): void {
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
      const paymentToUpdate: Pay = { status, totalAmount: payment.totalAmount };
      this.paymentService.pay(paymentToUpdate, payment.id).subscribe({
        next: (response) => {
          console.log('Pago realizado exitosamente:', response);
          this.generateReceipt(payment);
          const id = this.clientId; // Asegúrate de obtener el ID del cliente correctamente
          this.router.navigate([`/infoclient/${id}`]);
        },
        error: (error) => {
          console.error('Error al realizar el pago:', error);
        }
      });
    }
  }


  generateReceipt(payment: Payment): void {
    const doc = document.createElement('div');
    doc.innerHTML = `
    <style>
    /* Estilos CSS */
    .receipt {
      font-family: Arial, sans-serif;
      width: 100%;
      text-align: left;
      padding: 5px;
    }
    .receipt-header {
      font-size: 14px;
      font-weight: bold;
    }
    .receipt-content {
      font-size: 12px;
      margin-top: 5px;
    }
  </style>
  <div class="receipt">
    <div class="receipt-header">
      Recibo de Pago
    </div>
    <div class="receipt-content">
      <p><strong>Cliente:</strong> ${this.client.name}</p>
      <p><strong>Email:</strong> ${this.client.email}</p>
      <p><strong>Mes:</strong> ${payment.month}</p>
      <p><strong>Año:</strong> ${payment.year}</p>
      <p><strong>Cuota:</strong> ${payment.amountPayable}</p>
      <p><strong>Mora:</strong> ${payment.latePaymentAmount || 0}</p>
      <p><strong>Total a Pagar:</strong> ${payment.amountPayable + (payment.latePaymentAmount || 0)}</p>
    </div>
  </div>
`;

    const body = this.el.nativeElement.ownerDocument.body;
    this.renderer.appendChild(body, doc);

    const popupWindow = window.open('', 'popupWindow', 'width=800,height=600');
    popupWindow?.document.write(doc.innerHTML.trimEnd());

    setTimeout(() => {
      popupWindow?.print();
      popupWindow?.close();
    }, 1000);
  }

}
