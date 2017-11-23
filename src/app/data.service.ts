import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  currencyDenominations = [
    200, 100, 50, 20, 10, 2, 1
  ];
}
