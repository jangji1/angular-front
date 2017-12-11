import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NetService } from '../services/net.service';

@Injectable()
export class ChecktimeService extends NetService{
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});
  private formHeaders = new Headers({'Content-Type': 'x-www-form-urlencoded'});

  
  constructor(
    http: Http
  ){
    super(http);

  }

  public retrieveInduceTalkList(param : any){
    return super.reqPost('/api/induce/induceTalkList.djson', param, this.jsonHeaders);
  }
  
}