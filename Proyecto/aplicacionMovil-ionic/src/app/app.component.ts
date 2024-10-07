import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mis Compras', url: '/mis-compras', icon: 'cart' },
    { title: 'Centro de Ayuda', url: '/centro-ayuda', icon: 'paper-plane' },
    { title: 'Favoritos', url: '/favoritos', icon: 'heart' },
    { title: 'Producto', url: '/producto', icon: 'archive' },
    { title: 'Ofertas', url: '/ofertas', icon: 'money' },
    { title: 'Login', url: './auth', icon: 'door' }
  ];

  constructor() {}
}
