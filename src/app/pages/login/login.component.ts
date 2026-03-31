import { Component } from '@angular/core';

import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly loginUrl = 'http://localhost:8081/ATPWebDesarrollo/servlet/mrlogin';
}

