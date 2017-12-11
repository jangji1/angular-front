/*
* Network Service Observable Base
* @author : 시공교육 최광윤
*/

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';



import { config } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NetService{
    
    constructor (private http: Http){

    }

    appendAuthHeader(header?:Headers) : RequestOptions{
        let reqHeader = new Headers({ 'Content-Type': 'application/json'});
        
        if(header){            
            reqHeader = header;
        }

        if(localStorage.getItem(config.authKey)){
            reqHeader.append(config.authKey, localStorage.getItem(config.authKey));
        }

        return new RequestOptions({ headers: reqHeader });
    }

    //Get 요청
    reqGet(requrl: string): Observable<any>{
        console.log('request Get : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http
                    .get(config.endPoint.concat(requrl), reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    //Post 요청
    reqPost(requrl: string, params: any, header?:Headers): Observable<any>{
        console.log('request Post : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http.post(config.endPoint.concat(requrl), params, reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    //Put 요청
    reqPut(requrl: string, params: any, header?:Headers): Observable<any>{
        console.log('request Put: ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http.put(config.endPoint.concat(requrl), params, reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    private handleResponse(res: Response){
        let jsonData = res.json();

        try{
            let authHeader = res.headers.get(config.authKey);
            //인증정보를 매번 갱신한다.
            if(authHeader){
                localStorage.setItem(config.authKey, authHeader);
            }
            
        }catch(e){
        }

        return jsonData;
    }

    private handleError(err: any){
        // console.log('Error err.json() : ',err.json());
        // console.log('err.json().httpStatus',err.json().result.httpStatus)
        if(err.status == 403){
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            localStorage.removeItem(config.authKey);
            document.location.href="/login";
            return Observable.throw(null);
        }else if(err.status == 401){
            alert('해당 메뉴에 접근 권한이 없습니다.');
            window.history.back();
            return Observable.throw(null);
        }
        return Observable.throw(err.json() || 'Server error');
    }

    //promiseGet 요청
    reqGetPromise(requrl: string): Promise<any>{
        console.log('request PromiseGet : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http
                    .get(config.endPoint.concat(requrl), reqOptions)
                    .toPromise()
                    .then(this.handlePromiseResponse)
                    .catch(this.handlePromiseError);
    }

    //PromisePost 요청
    reqPostPromise(requrl: string, params: any, header?:Headers): Promise<any>{
        console.log('request PromisePost : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http.post(config.endPoint.concat(requrl), params, reqOptions)
                    .toPromise()
                    .then(this.handlePromiseResponse)
                    .catch(this.handlePromiseError);
        }


    private handlePromiseResponse(res: Response){
        let jsonData = res.json();

        let authHeader = res.headers.get(config.authKey);
        //인증정보를 매번 갱신한다.
        if(authHeader){
            localStorage.setItem(config.authKey, authHeader);
        }
        
        return jsonData;
    }

    private handlePromiseError(err: Response | any){
        // console.log('Error err.json() : ',err.json());
        // console.log('err.json().httpStatus',err.json().result.httpStatus)
        if(err.status == 403){
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            localStorage.removeItem(config.authKey);
            document.location.href="/login";
            return Promise.reject(null);
        }else if(err.status == 401){
            alert('해당 메뉴에 접근 권한이 없습니다.');
            window.history.back();
            return Promise.reject(null);
        }
        return Promise.reject(err.json().error || 'Server error');
    }

    
}