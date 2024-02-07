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
import {ClientsComponent} from'./components/clients/clients.component'


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
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
