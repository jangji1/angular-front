import { ModuleWithProviders }    from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { LearnMainComponent } from './learn/learn-main.component';

const FocusRoutes: Routes = [
  { path: 'learn', children:[
      { path: '', redirectTo: "main", },
      { path: "main", component: LearnMainComponent, }
    ]
  },
]

export const FocusRouting: ModuleWithProviders = RouterModule.forChild(FocusRoutes);