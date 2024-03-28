import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';

@Component({
  selector: 'dapp-ui-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HdWalletMultiButtonComponent,
  ],
  template: `
    <div class="h-full flex flex-col">
      <div
        class="navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0"
      >
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl" routerLink="/">
            <img
              class="h-4 md:h-6"
              alt="Solana Logo"
              src="/assets/solana-logo.png"
            />
          </a>
          @for (link of links; track link) {
          <a
            class="menu menu-horizontal px-1 space-x-2"
            [routerLink]="link.path"
            >{{ link.label }}</a
          >
          }
        </div>
        <div class="flex-none space-x-2">
          <hd-wallet-multi-button></hd-wallet-multi-button>
          <button>Devnet</button>
        </div>
      </div>
      <!--      <ClusterChecker>-->
      <!--        <AccountChecker />-->
      <!--      </ClusterChecker>-->

      <main class="flex-grow mx-4 lg:mx-auto">
        <router-outlet />
      </main>

      <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Generated by
            <a
              class="link hover:text-white"
              href="https://github.com/solana-developers/create-solana-dapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              create-solana-dapp
            </a>
          </p>
        </aside>
      </footer>
    </div>
  `,
  styles: ``,
})
export class UiLayoutComponent {
  @Input() links!: { label: string; path: string }[];
}

@Component({
  selector: 'dapp-app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog class="modal" open>
      <div class="modal-box space-y-5">
        <h3 class="font-bold text-lg">{{ title }}</h3>
        <ng-content />
        <div class="modal-action">
          <div class="join space-x-2">
            <button
              [disabled]="submitDisabled"
              class="btn btn-xs lg:btn-md btn-primary"
              (click)="doSubmit.emit()"
            >
              {{ submitLabel || 'Save' }}
            </button>
            <button (click)="close()" class="btn">Close</button>
          </div>
        </div>
      </div>
    </dialog>
  `,
})
export class AppModalComponent {
  @Input() title!: string;
  @Input() submitLabel!: string;
  @Input() submitDisabled?: boolean;
  @Output() doSubmit = new EventEmitter();

  private readonly dialog = inject(Dialog);
  close() {
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'dapp-app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero py-[64px]">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          @if (title) {
          <h1 class="text-5xl font-bold">{{ title }}</h1>
          } @if (subtitle) {
          <p class="py-6">{{ subtitle }}</p>
          }
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AppHeroComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
