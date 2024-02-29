import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'dapp-ui-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div>
      <div class="space-x-2 px-2">
        <a routerLink="/">LOGO</a>

        @for (link of links; track link) {
        <a [routerLink]="link.path">{{ link.label }}</a>
        }
      </div>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: ``,
})
export class UiLayoutComponent {
  @Input() links!: { label: string; path: string }[];
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
