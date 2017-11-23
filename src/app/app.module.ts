import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CurrencyCalculatorComponent } from './currency-calculator/currency-calculator.component';

import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyCalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
