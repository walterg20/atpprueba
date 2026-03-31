import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input({ required: true }) label!: string;
  @Input() value = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() hint?: string;
}

