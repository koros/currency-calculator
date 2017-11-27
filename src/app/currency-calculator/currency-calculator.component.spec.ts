import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCalculatorComponent } from './currency-calculator.component';
import { DataService } from '../data.service';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatToolbarModule, MatCardModule, MatMenuModule, MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrencyCalculatorComponent', () => {
  let component: CurrencyCalculatorComponent;
  let fixture: ComponentFixture<CurrencyCalculatorComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ CurrencyCalculatorComponent ],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCalculatorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('.result'));
    htmlElement = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially display a blank result', () => {
    expect(htmlElement.textContent).toEqual('');
  });

  it('should calculate £12 correctly', () => {
    component.userInput = '£12';
    component.calculate();
    expect(component.result).toEqual('6 x £2');
  });

  it('should calculate £12.34 correctly', () => {
    component.userInput = '£12.34';
    component.calculate();
    expect(component.result).toEqual('6 x £2, 1 x 20p, 1 x 10p, 2 x 2p');
  });

  it('should calculate 123p correctly', () => {
    component.userInput = '123p';
    component.calculate();
    expect(component.result).toEqual('1 x £1, 1 x 20p, 1 x 2p, 1 x 1p');
  });
});
