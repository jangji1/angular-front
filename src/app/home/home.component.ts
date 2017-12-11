import { Component,OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit{
  private isLogin = true;

  public menu = {
    category : '홈',
    menu : '홈',
  };
  
  ngOnInit(): void {
  }
}