import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeroComponent } from '../ui/ui-layout.component';

@Component({
  selector: 'dapp-dashboard-feature',
  standalone: true,
  imports: [CommonModule, AppHeroComponent],
  template: `
    <div>
      <dapp-app-hero title="GM" subtitle="Say hi to your new Solana dApp." />
      <div class="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div class="space-y-2">
          <p>Here are some helpful links to get you started.</p>
          @for (link of links; track link) {
          <div>
            <a
              [href]="link.href"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class DashboardFeatureComponent {
  links: { label: string; href: string }[] = [
    { label: 'Solana Docs', href: 'https://docs.solana.com/' },
    { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
    { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
    {
      label: 'Solana Stack Overflow',
      href: 'https://solana.stackexchange.com/',
    },
    {
      label: 'Solana Developers GitHub',
      href: 'https://github.com/solana-developers/',
    },
  ];
}
