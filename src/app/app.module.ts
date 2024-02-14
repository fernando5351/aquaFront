import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {AuthInterceptor} from './interceptor/auth/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { GetUsersComponent } from './pages/user/get-users/get-users.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { GetRolesComponent } from './pages/role/get-roles/get-roles.component';
import { CreateRoleComponent } from './pages/role/create-role/create-role.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { GetClientsComponent } from './pages/clients/get-clients/get-clients.component';
import { CreateClientsComponent } from './pages/clients/create-clients/create-clients.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import {ClientsComponent} from'./components/clients/clients.component';
import { SearchComponent } from './components/search/search/search.component';
import { GetAmountComponent } from './pages/amount/get-amount/get-amount.component';
import { CreateAmountComponent } from './pages/amount/create-amount/create-amount.component';
import { AmountComponent } from './components/amount/amount/amount.component';
import { GetInfoClientComponent } from './pages/clients/get-info-client/get-info-client.component';
import { MonthComponent } from './pages/month/month/month.component';
import { GetmonthComponent } from './pages/month/getmonth/getmonth.component';
import { ClosemonthComponent } from './pages/month/closemonth/closemonth.component';
import {GetonemonthComponent} from './pages/month/getonemonth/getonemonth.component';
import { PaymentComponent } from './pages/pay/payment/payment.component';
import { RecoveryComponent } from './pages/recovery/recovery/recovery.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password/recovery-password.component'
import Swal from 'sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GetUsersComponent,
    CreateUserComponent,
    GetRolesComponent,
    CreateRoleComponent,
    NavbarComponent,
    GetClientsComponent,
    CreateClientsComponent,
    RoleComponent,
    UserComponent,
    ClientsComponent,
    SearchComponent,
    GetAmountComponent,
    CreateAmountComponent,
    AmountComponent,
    GetInfoClientComponent,
    MonthComponent,
    GetmonthComponent,
    ClosemonthComponent,
    GetonemonthComponent,
    PaymentComponent,
    RecoveryComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'Swal',
      useValue: Swal
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
