import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/throw';
import { QuoteBf } from '../common/quoteBf';
import { Utils } from './utils';
import { OrderbookBf } from '../common/orderbookBf';

@Injectable()
export class BitfinexService {
  private _reqOptionsArgs = { headers: new HttpHeaders().set( 'Content-Type', 'application/json' ) };
  private readonly _bitfinex = '/bitfinex';  
  BTCUSD = 'btcusd';
  ETHUSD = 'ethusd';
  LTCUSD = 'ltcusd';
  XRPUSD = 'xrpusd';
  
  private _utils = new Utils();
  
  constructor(private http: HttpClient, private pl: PlatformLocation ) { 
  }

  getCurrentQuote(currencypair: string): Observable<QuoteBf> {
      return this.http.get(this._bitfinex+'/'+currencypair+'/current', this._reqOptionsArgs).catch(this._utils.handleError);
  }
   
  getTodayQuotes(currencypair: string): Observable<QuoteBf[]> {
      return this.http.get(this._bitfinex+'/'+currencypair+'/today', this._reqOptionsArgs).catch(this._utils.handleError);
  }

  getOrderbook(currencypair: string): Observable<OrderbookBf> {
      return this.http.get(this._bitfinex+'/'+currencypair+'/orderbook/', this._reqOptionsArgs).catch(this._utils.handleError);
  }
}