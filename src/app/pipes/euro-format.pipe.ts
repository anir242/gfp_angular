
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro_currency_format' })
export class EuroCurrencyFormatPipe implements PipeTransform {
  transform(value) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
  }
} 

@Pipe({ name: 'euro_number_format' })
export class EuroNumberFormatPipe implements PipeTransform {
  transform(value) {
    return new Intl.NumberFormat('it-IT', { style: 'decimal' }).format(value);
  }
} 