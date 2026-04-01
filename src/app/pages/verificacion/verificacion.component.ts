import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { VerificacionApiService, VerificacionResponse } from '../../core/api/verificacion-api.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { API_BASE_URL } from '../../core/config/api.config';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [CardComponent, InputComponent, ButtonComponent, JsonPipe],
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(VerificacionApiService);

  readonly token = signal<string>('');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly data = signal<VerificacionResponse | null>(null);

  readonly canVerify = computed(() => this.token().trim().length > 0 && !this.loading());

  constructor() {
    const tokenFromUrl = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.token.set(tokenFromUrl);

    if (tokenFromUrl) {
      this.verificar();
    }
  }

  verificar(): void {
    const t = this.token().trim();
    if (!t) return;

    this.loading.set(true);
    this.error.set(null);
    this.data.set(null);

    console.log('[Verificacion] URL:', `${API_BASE_URL}/rest/MD_Verificar`, 'Body:', { Token: t });

    this.api
      .verificarToken(t)
      .pipe(
        catchError((err) => {
          let msg = 'Error consultando RD_Verificar';
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              msg =
                'No se pudo conectar al backend (CORS/red/servidor caído). Verificá proxy y conectividad a atp-pruebas.ecom.com.ar.';
            } else if (err.status === 404) {
              msg = `Endpoint no encontrado (404): ${err.url ?? 'sin URL'}. Revisá si es /rest/RD_Verificar.`;
            } else if (typeof err.error?.message === 'string') {
              msg = err.error.message;
            } else if (typeof err.message === 'string') {
              msg = err.message;
            }
          } else if (typeof err?.message === 'string') {
            msg = err.message;
          }
          this.error.set(msg);
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res) => {
        if (!res) return;
        this.data.set(res);
        if (res.Ok === false && typeof res.error === 'string' && res.error.trim()) {
          this.error.set(res.error);
        }
      });
  }
}

