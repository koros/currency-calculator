import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCalculatorComponent } from './currency-calculator.component';
import { DataService } from '../data.service';

describe('CurrencyCalculatorComponent', () => {
  let component: CurrencyCalculatorComponent;
  let fixture: ComponentFixture<CurrencyCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyCalculatorComponent ],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
