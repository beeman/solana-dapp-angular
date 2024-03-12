import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Account {
  publicKey: string;
  mint: string;
  amount: string;
}

export const defaultAccounts: Account[] = [
  {
    publicKey: 'CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr',
    mint: 'KinD3xAzuqX3LJbxUG13peGnqjpV5dRcHV8tsdsrbeZ',
    amount: '2000',
  },
  {
    publicKey: '5R6mXMBARq5fS2utygVpYmBjE437y6v7oKj3MXj6gxkz',
    mint: 'KinD3xAzuqX3LJbxUG13peGnqjpV5dRcHV8tsdsrbeZ',
    amount: '4000',
  },
];

@Component({
  selector: 'dapp-account-data-access',
  standalone: true,
  imports: [CommonModule],
  template: `<p>account-data-access works!</p>`,
  styles: ``,
})
export class AccountDataAccessComponent {}
