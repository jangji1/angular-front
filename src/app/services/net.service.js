"use strict";
/*
* Network Service Observable Base
* @author : 시공교육 최광윤
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var config_1 = require("../config/config");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/toPromise");
var NetService = /** @class */ (function () {
    function NetService(http) {
        this.http = http;
    }
    NetService.prototype.appendAuthHeader = function (header) {
        var reqHeader = new http_1.Headers({ 'Content-Type': 'application/json' });
        if (header) {
            reqHeader = header;
        }
        if (localStorage.getItem(config_1.config.authKey)) {
            reqHeader.append(config_1.config.authKey, localStorage.getItem(config_1.config.authKey));
        }
        return new http_1.RequestOptions({ headers: reqHeader });
    };
    //Get 요청
    NetService.prototype.reqGet = function (requrl) {
        console.log('request Get : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http
            .get(config_1.config.endPoint.concat(requrl), reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    //Post 요청
    NetService.prototype.reqPost = function (requrl, params, header) {
        console.log('request Post : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http.post(config_1.config.endPoint.concat(requrl), params, reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    //Put 요청
    NetService.prototype.reqPut = function (requrl, params, header) {
        console.log('request Put: ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http.put(config_1.config.endPoint.concat(requrl), params, reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    NetService.prototype.handleResponse = function (res) {
        var jsonData = res.json();
        try {
            var authHeader = res.headers.get(config_1.config.authKey);
            //인증정보를 매번 갱신한다.
            if (authHeader) {
                localStorage.setItem(config_1.config.authKey, authHeader);
            }
        }
        catch (e) {
        }
        return jsonData;
    };
    NetService.prototype.handleError = function (err) {
        // console.log('Error err.json() : ',err.json());
        // console.log('err.json().httpStatus',err.json().result.httpStatus)
        if (err.status == 403) {
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            localStorage.removeItem(config_1.config.authKey);
            document.location.href = "/login";
            return Observable_1.Observable.throw(null);
        }
        else if (err.status == 401) {
            alert('해당 메뉴에 접근 권한이 없습니다.');
            window.history.back();
            return Observable_1.Observable.throw(null);
        }
        return Observable_1.Observable.throw(err.json() || 'Server error');
    };
    //promiseGet 요청
    NetService.prototype.reqGetPromise = function (requrl) {
        console.log('request PromiseGet : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http
            .get(config_1.config.endPoint.concat(requrl), reqOptions)
            .toPromise()
            .then(this.handlePromiseResponse)
            .catch(this.handlePromiseError);
    };
    //PromisePost 요청
    NetService.prototype.reqPostPromise = function (requrl, params, header) {
        console.log('request PromisePost : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http.post(config_1.config.endPoint.concat(requrl), params, reqOptions)
            .toPromise()
            .then(this.handlePromiseResponse)
            .catch(this.handlePromiseError);
    };
    NetService.prototype.handlePromiseResponse = function (res) {
        var jsonData = res.json();
        var authHeader = res.headers.get(config_1.config.authKey);
        //인증정보를 매번 갱신한다.
        if (authHeader) {
            localStorage.setItem(config_1.config.authKey, authHeader);
        }
        return jsonData;
    };
    NetService.prototype.handlePromiseError = function (err) {
        // console.log('Error err.json() : ',err.json());
        // console.log('err.json().httpStatus',err.json().result.httpStatus)
        if (err.status == 403) {
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            localStorage.removeItem(config_1.config.authKey);
            document.location.href = "/login";
            return Promise.reject(null);
        }
        else if (err.status == 401) {
            alert('해당 메뉴에 접근 권한이 없습니다.');
            window.history.back();
            return Promise.reject(null);
        }
        return Promise.reject(err.json().error || 'Server error');
    };
    NetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], NetService);
    return NetService;
}());
exports.NetService = NetService;
//# sourceMappingURL=net.service.js.map