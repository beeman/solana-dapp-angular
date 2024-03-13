import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Counter {
  count: number;
  increment: string;
  set: string;
  decrement: string;
  account: string;
  close: string;
}

export const defaultCounters: Counter[] = [
  {
    count: 46,
    increment: 'Increment',
    set: 'Set',
    decrement: 'decrement',
    account: '5R6mXMBARq5fS2utygVpYmBjE437y6v7oKj3MXj6gxkz',
    close: 'Close',
  },
  {
    count: 76,
    increment: 'Increment',
    set: 'Set',
    decrement: 'decrement',
    account: '5R6mXMBARq5fS2utygVpYmBjE437y6v7oKj3MXj6gxkz',
    close: 'Close',
  },
];

@Component({
  selector: 'dapp-counter-data-access',
  standalone: true,
  imports: [CommonModule],
  template: `<p>counter-data-access works!</p>`,
})
export class CounterDataAccessComponent {}
