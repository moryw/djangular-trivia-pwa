import { Component, OnInit } from '@angular/core'
import * as Highcharts from 'highcharts/highstock'
import { HighchartService } from '../services/highcharts/highchart.service'
import { IntradayArray } from '../interfaces/highcharts.interface'

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html'
})
export class HighchartsComponent {
  url = 'https://financialmodelingprep.com/api/v3/historical-chart/5min/AAPL?from=2023-08-10&to=2023-09-10&apikey=DX5yQyRK8966kc0AqRWDX7VEh9cvXpgQ'
  chartData: IntradayArray = []
  highData: Array<number> = []

  

  constructor(private highchartService: HighchartService) { }

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {
    rangeSelector: {
      selected: 2
    },

    title: {
      text: "AAPL Stock Price"
    },

    legend: {
      enabled: true
    },

    plotOptions: {
      series: {
        showInLegend: true
      }
    },
    series: [{
      name: 'AAPL',
      tooltip: {
        valueDecimals: 2
      },
      data: this.highData,
      type: 'line'
    }]
  }

  getChartData() {
    this.highchartService.getIntradayChartData(this.url).subscribe({
      next: (data) => {
        this.chartData = data
        console.log(this.chartData)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getHighData() {
    this.highData = this.chartData.map(item => item.high)
  }
}