import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { IntradayArray } from 'src/app/interfaces/highcharts.interface'

@Injectable({
  providedIn: 'root'
})
export class HighchartService {

  constructor(private http: HttpClient) { }

  getIntradayChartData(url: string): Observable<IntradayArray> {
    return this.http.get<IntradayArray>(url)
  }
}
