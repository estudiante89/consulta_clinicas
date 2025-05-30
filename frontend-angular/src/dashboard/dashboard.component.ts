import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Bienvenido, {{ user?.email }}</h2>
    <p>Rol: {{ user?.role }}</p>

    <a *ngIf="user?.role === 'patient'" routerLink="/appointments">Agendar cita</a>
    <a *ngIf="user?.role === 'doctor'" routerLink="/history">Ver historial</a>
    <a *ngIf="user?.role === 'admin'" routerLink="/analytics">Ver reportes</a>
  `
})
export class DashboardComponent {
  user = this.auth.currentUser$.value;
  constructor(private auth: AuthService) {}
}
