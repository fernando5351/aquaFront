import { Component, ViewChild, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment/payment.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  chartOptions!: ChartOptions;
  payments: Payment[] = [{
    id: 0,
    invoiceCod: '',
    clientId: 0,
    addressId: 0,
    month: '',
    year: 0,
    amountPayable: 0,
    latePaymentAmount: 0,
    totalAmount: 0,
    status: '',
    monthlyFeesId: 0,
    createdAt: '',
    canceledIn: ''
  }]

  dataSerie: number[] = [];
  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.actualizarGraficos();
    this.getPayments();
  }

  actualizarGraficos() {
    this.chartOptions = {
      series: this.dataSerie,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ['MORA', 'PAGADO', 'PENDIENTE'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getPayments() {
    this.paymentService.getAllPayment().subscribe((response) => {
      this.payments = response.data;

      const totalMora = this.payments.reduce(function(accumulator: number, currentValue: Payment) {
        console.log('status ' + currentValue.status + ' monto ' + currentValue.totalAmount);
        if (currentValue.status === 'mora') {
          return (Number(accumulator) + Number(currentValue.totalAmount));
        } else {
          return 0;
        }
      }, 0);

      const totalPaid = this.payments.reduce(function(accumulator: number, currentValue: Payment) {
        console.log('status ' + currentValue.status + ' monto ' + currentValue.totalAmount);
        if (currentValue.status === 'paid') {
          return (Number(accumulator) + Number(currentValue.totalAmount));
        } else {
          return 0;
        }
      }, 0);

      const totalPending = this.payments.reduce(function(accumulator: number, currentValue: Payment) {
        console.log('status ' + currentValue.status + ' monto ' + currentValue.totalAmount);
        if (currentValue.status === 'pending') {
          return (Number(accumulator) + Number(currentValue.totalAmount));
        } else {
          return 0;
        }
      }, 0);

      this.dataSerie.push(totalMora);
      this.dataSerie.push(totalPaid);
      this.dataSerie.push(totalPending);
      console.log('Total pagado: ', totalPaid);
      console.log('Total pendiente: ', totalPending);
      this.actualizarGraficos();
    })
  }
}
