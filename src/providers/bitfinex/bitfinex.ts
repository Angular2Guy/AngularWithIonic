import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/throw';
import { QuoteBf } from '../common/quoteBf';
import { Utils } from '../utils';
import { OrderbookBf } from '../common/orderbookBf';
import { OrderBf } from '../common/orderBf';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class BitfinexProvider {
  private _reqOptionsArgs = { headers: new HttpHeaders().set( 'Content-Type', 'application/json' ) };
  private readonly _bitfinex = '/bitfinex';  
  private readonly _bitfinex2 = '/bitfinex2';
//  private readonly _bitfinex = 'https://svenloesekann.de:8443/bitfinex';
//  private readonly _bitfinex2 = 'https://api.bitfinex.com';
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
      return this.http.get(this._bitfinex2+'/v1/book/'+currencypair, this._reqOptionsArgs).catch(this._utils.handleError);
  }
  
  postOrder(key: string, secret: string, currpair: string, amount: number, limit: number, buysell: boolean, ordertype: string): Observable<OrderBf> {
          const nonce = Date.now().toString();
          const body = {
            request: '/v1/account_infos',
            nonce
          };
          const payload = btoa(JSON.stringify(body));              
          const signature = CryptoJS.HmacSHA384(payload, secret).toString(CryptoJS.enc.Hex);          
          let reqOptionsArgs = { headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
                                                      .set('X-BFX-APIKEY', key)
                                                      .set('X-BFX-PAYLOAD', payload)
                                                      .set('X-BFX-SIGNATURE', signature)};          
      
      
      return this.http.post(this._bitfinex2+'/v1/account_infos', body, reqOptionsArgs).catch(this._utils.handleError);
  }
}
