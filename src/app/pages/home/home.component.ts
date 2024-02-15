import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { Report } from 'src/app/models/payment.model';
import { MonthService } from 'src/app/services/month/month.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import Swal from 'sweetalert2';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

interface status {
  value: string | undefined;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  chartOptions!: ChartOptions;
  status: status[] = [
    {value: undefined, viewValue: 'Omitir'},
    {value: 'paid', viewValue: 'Pagado'},
    {value: 'pending', viewValue: 'Pendiente'},
    {value: 'mora', viewValue: 'Mora'},
  ];
  report: Report = {
    totalAmountCollected: 0,
    summary: {
      mora: 0,
      paid: 0,
      pending: 0
    },
    payments: [{
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
      canceledIn: '',
      paymentMonthlyFee: {
        id: 0,
        from: '',
        untill: '',
        status: '',
        createdAt: '',
      },
      Clients: {
        id: 0,
        name: '',
        email: '',
        dui: '',
        cellphone: '',
        amountId: 0,
        createdAt: new Date()
      }
    }]
  }

  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  selectedStatus: 'paid'|'pending'|'mora'|undefined = undefined

  // maxDate: Date = new Date();
  maxDate = '2024-10-10';
  minDate = '2024-01-01';

  dataSerie: number[] = [];
  constructor(
    private paymentService: PaymentService,
    private monthlyFee: MonthService
  ) {}

  ngOnInit(): void {
    this.actualizarGraficos();

    this.monthActive();
  }

  monthActive(){
    this.monthlyFee.getMonths().subscribe({
      next: (response) => {
        response.data.forEach(month => {
          if(month.status === 'active'){
            const from = month.from;
            const untill = month.untill;
            this.reportSale(from, untill);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: 'Ocurrio un error',
          text: error.message || "Verifique su conexión a internet",
          timer: 1200
        })
      }
    })
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

  private formatDate(date: Date): string | null {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  }

  startDateChanged(event: MatDatepickerInputEvent<any>): void {
    this.selectedStartDate = this.formatDate(event.value);
    this.filterSales();
  }

  endDateChanged(event: MatDatepickerInputEvent<any>): void {
    this.selectedEndDate = this.formatDate(event.value);
    this.filterSales();
  }

  reportSale(from: Date, untill: Date, status?: 'paid'|'pending'|'mora') {
    this.paymentService.getReportPayment(from, untill, status).subscribe((response) => {
      this.report = response.data;
      console.log(response);

      this.dataSerie = [];
      this.dataSerie.push(this.report.summary.mora);
      this.dataSerie.push(this.report.summary.paid);
      this.dataSerie.push(this.report.summary.pending);
      this.actualizarGraficos();
    })
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.value;
    this.filterSales();
  }

  private filterSales(): void {
    if (this.selectedStartDate !== null && this.selectedEndDate !== null && this.selectedStatus !== undefined) {
      let from  = new Date(this.selectedStartDate);
      let until = new Date(this.selectedEndDate);
      console.log('status: '+ this.selectedStatus);

      this.reportSale(from, until, this.selectedStatus);
      return;
    }
    if (this.selectedStartDate !== null && this.selectedEndDate !== null) {
      let from  = new Date(this.selectedStartDate);
      let until = new Date(this.selectedEndDate);
      this.reportSale(from, until);
      return;
    }
  }
}
