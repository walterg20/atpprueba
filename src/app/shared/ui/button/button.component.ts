import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

type ButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;

  // Links
  @Input() href?: string;
  @Input() routerLink?: string | any[];
  @Input() queryParams?: Record<string, any>;

  // Button
  @Input() type: 'button' | 'submit' = 'button';

  get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ' +
      'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
    const variant =
      this.variant === 'secondary'
        ? 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
        : 'bg-slate-900 text-white hover:bg-slate-800';
    return `${base} ${variant}`;
  }
}

