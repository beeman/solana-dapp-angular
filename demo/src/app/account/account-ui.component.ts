import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import {
  Account,
  AccountService,
  Transaction,
} from './account-data-access.component';
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { AppModalComponent } from '../ui/ui-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { computedAsync } from 'ngxtension/computed-async';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

@Component({
  selector: 'dapp-balance-sol',
  standalone: true,
  imports: [CommonModule],
  template: `<span>{{ converted }}</span>`,
})
export class BalanceSolComponent {
  @Input() balance!: number | null | undefined;

  get converted() {
    return (
      Math.round(((this.balance ?? 0) / LAMPORTS_PER_SOL) * 100000) / 100000
    );
  }
}

@Component({
  selector: 'dapp-account-balance',
  standalone: true,
  imports: [CommonModule, BalanceSolComponent],
  template: `
    <div>
      <h1 class="text-5xl font-bold cursor-pointer">
        @if (balance()) {
        <dapp-balance-sol [balance]="balance()" />
        SOL }
      </h1>
    </div>
  `,
})
export class AccountBalanceComponent {
  @Input() address!: string;
  private readonly _accountService = inject(AccountService);

  readonly balance = computedAsync(
    () => this._accountService.getBalance(this.address),
    { requireSync: false }
  );
}

@Component({
  template: ` <p>ModalAirdropDialogComponent: {{ data.message }}</p> `,
  standalone: true,
  styles: [
    `
      :host {
        display: block;
        background: #fff;
        border-radius: 8px;
        padding: 8px 16px;
      }
    `,
  ],
})
export class ModalAirdropDialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: { message: string }) {}
}

@Component({
  selector: 'dapp-modal-airdrop',
  standalone: true,
  imports: [CommonModule, AppModalComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="doSubmit()">
      <dapp-app-modal
        [submitDisabled]="false"
        (doSubmit)="doSubmit()"
        title="Airdrop"
        submitLabel="Request Airdrop"
      >
        <input
          type="number"
          step="any"
          min="1"
          placeholder="Amount"
          class="input input-bordered w-full"
          formControlName="number"
        />
      </dapp-app-modal>
    </form>
  `,
})
export class ModalAirdropComponent {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      number: new FormControl(''),
    });
  }

  doSubmit() {
    console.log(this.form.value);
  }
}

@Component({
  selector: 'dapp-modal-send',
  standalone: true,
  imports: [CommonModule, AppModalComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="doSubmit()">
      <dapp-app-modal
        [submitDisabled]="false"
        (doSubmit)="doSubmit()"
        title="Send"
        submitLabel="Send"
      >
        <input
          type="text"
          placeholder="Destination"
          class="input input-bordered w-full"
          formControlName="destination"
        />
        <input
          type="number"
          step="any"
          min="1"
          placeholder="Amount"
          class="input input-bordered w-full"
          formControlName="amount"
        />
      </dapp-app-modal>
    </form>
  `,
  styles: ``,
})
export class ModalSendComponent {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      destination: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  doSubmit() {
    console.log(this.form.value);
  }
}

@Component({
  selector: 'dapp-modal-receive',
  standalone: true,
  imports: [CommonModule, AppModalComponent],
  template: `
    <dapp-app-modal
      [submitDisabled]="false"
      title="Receive"
      submitLabel="Receive"
    >
      <p>Receive assets by sending them to your public key:</p>
      <code> CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr</code>
    </dapp-app-modal>
  `,
  styles: ``,
})
export class ModalReceiveComponent {
  constructor(public dialog: Dialog) {}

  showModal() {
    this.dialog.open(AppModalComponent, {
      minWidth: '300px',
      data: {
        button: 'Close',
      },
    });
  }
}
@Component({
  selector: 'dapp-account-buttons',
  standalone: true,
  imports: [
    CommonModule,
    ModalAirdropComponent,
    ModalSendComponent,
    ModalReceiveComponent,
  ],
  template: `
    <div class="space-x-2">
      <button (click)="showAirdrop()" class="btn btn-xs lg:btn-md btn-outline">
        Airdrop
      </button>
      <button (click)="showSend()" class="btn btn-xs lg:btn-md btn-outline">
        Send</button
      ><button (click)="showReceive()" class="btn btn-xs lg:btn-md btn-outline">
        Receive
      </button>
    </div>
  `,
  styles: ``,
})
export class AccountButtonsComponent {
  private readonly dialog = inject(Dialog);
  showAirdrop() {
    this.dialog.open(ModalAirdropComponent);
  }
  showSend() {
    this.dialog.open(ModalSendComponent);
  }
  showReceive() {
    this.dialog.open(ModalReceiveComponent);
  }
}

@Component({
  selector: 'dapp-account-tokens',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-2">
      <div class="justify-between">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold">Token Accounts</h2>
          <div class="space-x-2">
            <!--            <span class="loading loading-spinner"></span>-->

            <button class="btn btn-sm btn-outline">
              <mat-icon
                aria-hidden="false"
                aria-label="refresh items"
                fontIcon="refresh"
              />
            </button>
          </div>
        </div>
      </div>
      <!--      <pre class="alert alert-error"></pre>-->

      <div>
        <!--        <div>No token accounts found.</div>-->
        <table
          class="table border-4 rounded-lg border-separate border-base-300"
        >
          <thead>
            <tr>
              <th>Public Key</th>
              <th>Mint</th>
              <th class="text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            @for(account of accounts; track account){
            <tr>
              <td>
                <div class="flex space-x-2">
                  <span class="font-mono">
                    <a>{{ account.publicKey }}</a>
                  </span>
                </div>
              </td>
              <td>
                <div class="flex space-x-2">
                  <span class="font-mono">
                    <a>{{ account.mint }}</a>
                  </span>
                </div>
              </td>
              <td class="text-right">
                <span class="font-mono">{{ account.amount }}</span>
              </td>
            </tr>

            <tr>
              <td class="text-center">
                <!--                <button class="btn btn-xs btn-outline"></button>-->
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class AccountTokensComponent {
  @Input() accounts: Account[] = [];
}

@Component({
  selector: 'dapp-account-transactions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: ` <div class="space-y-2">
    <div class="flex justify-between">
      <h2 class="text-2xl font-bold">Transaction History</h2>
      <div class="space-x-2">
        <!--        <span class="loading loading-spinner"></span>-->
        <button class="btn btn-sm btn-outline">
          <mat-icon
            aria-hidden="false"
            aria-label="refresh items"
            fontIcon="refresh"
          />
        </button>
      </div>
    </div>
    <!--    <pre class="alert alert-error">Error: </pre>-->

    <div>
      <!--      <div>No transactions found.</div>-->

      <table class="table border-4 rounded-lg border-separate border-base-300">
        <thead>
          <tr>
            <th>Signature</th>
            <th class="text-right">Slot</th>
            <th>Block Time</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          @for(transaction of transactions; track transaction){
          <tr>
            <th class="font-mono">
              <a>{{ transaction.signature }}</a>
            </th>
            <td class="font-mono text-right">
              <a>{{ transaction.slot }}</a>
            </td>
            <td>{{ transaction.blockTime }}</td>
            <td class="text-right">
              <!--              <div class="badge badge-error">Failed</div>-->

              <div class="badge badge-success">{{ transaction.status }}</div>
            </td>
          </tr>

          }
        </tbody>
        <tr>
          <td colSpan="{4}" class="text-center">
            <button class="btn btn-xs btn-outline">Show All</button>
          </td>
        </tr>
      </table>
    </div>
  </div>`,
  styles: ``,
})
export class AccountTransactionsComponent {
  @Input() transactions: Transaction[] = [];
}
