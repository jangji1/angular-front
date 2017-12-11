
import {enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

enableProdMode();
console.debug('Running JIT compiled');
platformBrowserDynamic().bootstrapModule(AppModule);