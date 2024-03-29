import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule,FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//FORMS
import { FormsModule } from '@angular/forms';


import { ProtectedRoutingModule } from './protected-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestingComponent } from './testing/dashboard.component';
import { CartaComponent } from './carta/carta.component';
import { CartaNuevaComponent } from './carta/carta-nueva/carta-nueva.component';
import { CartaEditComponent } from './carta/carta-edit/carta-edit.component';
import { UsuarioAddEditComponent } from './testing/usuario-add-edit/usuario-add-edit.component';
import { LocalesComponent } from './locales/locales.component';
import { LocalAddEditComponent } from './locales/local-add-edit/local-add-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaNuevaComponent } from './categoria/categoria-nueva/categoria-nueva.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallePedidoComponent } from './pedidos/detalle-pedido/detalle-pedido.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UserAddEditComponent } from './usuario/user-add-edit/user-add-edit.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RecibosComponent } from './recibos/recibos.component';
import { DetalleReciboComponent } from './recibos/detalle-recibo/detalle-recibo.component';





@NgModule({
  declarations: [
    TestingComponent,
    NavigationComponent,
    DashboardComponent,
    CartaComponent,
    CartaNuevaComponent,
    CartaEditComponent,
    UsuarioAddEditComponent,
    LocalesComponent,
    LocalAddEditComponent,
    CategoriaComponent,
    CategoriaNuevaComponent,
    CategoriaEditComponent,
    PedidosComponent,
    DetallePedidoComponent,
    UsuarioComponent,
    UserAddEditComponent,
    RecibosComponent,
    DetalleReciboComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,

    FormsModule,

    MatInputModule,

    MatProgressSpinnerModule,

    /* se agrego */
    NgxChartsModule,
    MatAutocompleteModule
  ]
})
export class ProtectedModule { }
