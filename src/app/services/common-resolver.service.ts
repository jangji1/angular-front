import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import {CommonCodeItem} from './common-code.item';
import {NetService} from './net.service';
import { config } from '../config/config';

@Injectable()
export class CommonCodeResolver implements Resolve<CommonCodeItem> {
  constructor(private netService: NetService, private router: Router) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CommonCodeItem> {
      let localCommonCode = localStorage.getItem(config.localStorageCommonCodeKey);

      if(undefined!== localCommonCode && null!==localCommonCode){
          let commonCode = new CommonCodeItem();
          commonCode.setCodeDataFromJson(JSON.parse(localCommonCode));

          return Promise.resolve(commonCode);
      }else{
          return this.netService.reqGetPromise('/code/allCodeList.ajax')
          .then(
            res => {
                
                let commonCode = new CommonCodeItem();
                
                localStorage.setItem(config.localStorageCommonCodeKey,JSON.stringify(commonCode));

                return Promise.resolve(commonCode);
            },
            err => {
                if (err){
                    alert("코드 가져오기를 실패 하였습니다.");
                }
                return null;
            }
            )
      }
      
    }
}