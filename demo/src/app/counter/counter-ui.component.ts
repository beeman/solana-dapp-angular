import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Counter } from './counter-data-access.component';

@Component({
  selector: 'dapp-counter-ui',
  standalone: true,
  imports: [CommonModule],
  template: `<p>counter-ui works!</p>`,
})
export class CounterUiComponent {}

@Component({
  selector: 'dapp-counter-create',
  standalone: true,
  imports: [CommonModule],
  template: `<button class="btn btn-xs lg:btn-md btn-primary">Create</button>`,
})
export class CounterCreateComponent {}

@Component({
  selector: 'dapp-counter-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for(counter of counters; track counter){
    <div
      class="card card-bordered border-base-300 border-4 text-neutral-content"
    >
      <div class="card-body items-center text-center">
        <div class="space-y-6">
          <h2 class="card-title justify-center text-3xl cursor-pointer">
            {{ counter.count }}
          </h2>
          <div class="card-actions justify-around">
            <button class="btn btn-xs lg:btn-md btn-outline">
              {{ counter.increment }}
            </button>
            <button class="btn btn-xs lg:btn-md btn-outline">Set</button>
            <button class="btn btn-xs lg:btn-md btn-outline">Decrement</button>
          </div>
          <div class="text-center space-y-4">
            <p>
              <a>Account</a>
            </p>
            <button class="btn btn-xs btn-secondary btn-outline">Close</button>
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class CounterCardComponent {
  @Input() counters: Counter[] = [];
}
