import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.css']
})
export class CurrencyCalculatorComponent implements OnInit {

  result: string;
  userInput: string;
  inputIsInvalid: boolean;
  availableCurrencyDenominations: any;

  currencyFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/(^[£]+\d*\.?\d+(?:[Ee][\+\-]?\d+)?$)|(^\d*(?:[Ee][\+\-]?\d+)?p$)/),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private dataService: DataService) {
    this.availableCurrencyDenominations = dataService.currencyDenominations;
    this.result = '';
    this.userInput = '';
    this.inputIsInvalid = false;

  }

  ngOnInit() {
  }

  calculate() {
    this.inputIsInvalid = this.userInput === '' || this.inputIsInvalid ;
    if (this.inputIsInvalid ) {
      return;
    }
    const sanitizedInput = this.removeCurrencySymbol(this.userInput);
    let input = parseFloat(sanitizedInput);
    if ( this.isPounds(this.userInput)) {
      input = this.truncateDecimals(input * 100);
    }
    this.result = this.getMinimumDenominations(input, '');
  }

  removeCurrencySymbol(str) {
    return this.isPounds(str) ? str.substring(1) : str.substring(0, str.length - 1);
  }

  onKey(event: any) {
    this.userInput = event.target.value;
    this.inputIsInvalid = !this.isValidInput(this.userInput);
    if ( event.which === 13 ) {
      this.calculate();
    }
  }

  isValidInput(str) {
    return this.isPounds(str) || this.isPence(str);
  }

  isPounds(val) {
    const poundsRegex = /^[£]+\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;
    return poundsRegex.test(val);
  }

  isPence(val) {
    const penceRegex = /^\d*(?:[Ee][\+\-]?\d+)?p$/;
    return penceRegex.test(val);
  }

  truncateDecimals(number) {
    return Math[number < 0 ? 'ceil' : 'floor'](number);
  }

  getTheLargestCurrencyNeededToRepresent(x) {
    let index = 0;
    while (this.availableCurrencyDenominations[index] > x) {
      index++;
    }
    return this.availableCurrencyDenominations[index];
  }

  getMinimumDenominations(value, str) {
    console.log(str);
    const largestDenomination = this.getTheLargestCurrencyNeededToRepresent(value);
    const n = Math.floor( value / largestDenomination);
    const remainder = value % largestDenomination;

    let result = n + ' x ' + (largestDenomination >= 100 ? ('£' + (largestDenomination / 100)) : (largestDenomination + 'p'));
    // add the coma delimiter
    if (remainder > 0) {
      result = result + ', ';
      return this.getMinimumDenominations(remainder, str ? (str + result) : result);
    } else {
      return str + result;
    }
  }
}
