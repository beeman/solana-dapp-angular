import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dapp-account-list-feature',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class=" py-64">
      <div class="text-center">Wallet</div>
    </div>
  `,
})
export class AccountListFeatureComponent {}
