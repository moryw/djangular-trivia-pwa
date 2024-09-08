export interface Intraday {
  date: string,
  open: number,
  low: number,
  high: number,
  close: number,
  volume: number
}

export interface IntradayArray extends Array<Intraday> {}
