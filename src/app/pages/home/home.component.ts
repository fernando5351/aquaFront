import { Component, ViewChild, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { Payment, Report } from 'src/app/models/payment.model';
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
  report: Report = {
    totalAmountCollected: 0,
    summary: {
      mora: 0,
      paid: 0,
      pending: 0
    }
  }

  selectedStartDate!: string | null;
  selectedEndDate!: string | null;

  dataSerie: number[] = [];
  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.actualizarGraficos();

    let date = new Date();
    let nowDay = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let previusMonth;
    if (month === 1) {
        month = 12;
        year = year - 1;
    } else {
        previusMonth = month - 1;
    }

    const startDate = new Date(`${year}-${previusMonth}-${nowDay}`);
    const endDate = new Date(`${year}-${month}-${nowDay}`);
    this.getPayments(startDate, endDate);
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

  startDateChanged(event: MatDatepickerInputEvent<any>): void {
    this.selectedStartDate = this.formatDate(event.value);
    this.filterSales();
  }

  endDateChanged(event: MatDatepickerInputEvent<any>): void {
    this.selectedEndDate = this.formatDate(event.value);
    this.filterSales();
  }

  getPayments(from: Date, untill: Date) {
    this.paymentService.getReportPayment(from, untill).subscribe((response) => {
      this.report = response.data;
      this.dataSerie.push(this.report.summary.mora)
      this.actualizarGraficos();
    })
  }
}
