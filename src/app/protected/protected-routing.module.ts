import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingComponent } from './testing/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartaComponent } from './carta/carta.component';
import { LocalesComponent } from './locales/locales.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: TestingComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'carta', component:CartaComponent},
      { path: 'locales', component:LocalesComponent},
      { path: 'categoria', component:CategoriaComponent},
      {path: 'usuario', component:UsuarioComponent},
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
