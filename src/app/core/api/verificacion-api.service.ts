import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';

export type VerificacionResponse = {
  Ok: boolean;
  Result: {
    ConRazsoc: string;
    Concuit: string;
    DomElectronico: string;
    email: string;
    estado: string;
  };
  error: string;
};

@Injectable({ providedIn: 'root' })
export class VerificacionApiService {
  private readonly http = inject(HttpClient);

  verificarToken(token: string): Observable<VerificacionResponse> {
    return this.http.post<VerificacionResponse>(`${API_BASE_URL}/rest/MD_Verificar`, {
      Token: token
    });
  }
}

