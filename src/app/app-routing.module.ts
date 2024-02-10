import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticateGuard} from './guards/authenticate.guard';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from  './pages/home/home.component';
import {GetUsersComponent} from './pages/user/get-users/get-users.component';
import {CreateRoleComponent} from './pages/role/create-role/create-role.component';
import {GetClientsComponent} from './pages/clients/get-clients/get-clients.component';
import {CreateClientsComponent} from './pages/clients/create-clients/create-clients.component';
import {CreateUserComponent} from './pages/user/create-user/create-user.component';
import {GetRolesComponent} from './pages/role/get-roles/get-roles.component';
import {GetAmountComponent} from './pages/amount/get-amount/get-amount.component';
import {CreateAmountComponent} from './pages/amount/create-amount/create-amount.component';
import {GetInfoClientComponent} from './pages/clients/get-info-client/get-info-client.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: localStorage.getItem('token') ? '/home': '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component:  HomeComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path:'user',
    component: GetUsersComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'roles',
    component: GetRolesComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'createRole',
    component: CreateRoleComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path:'clients',
    component: GetClientsComponent,
    canActivate:[AuthenticateGuard]
  },
  {
    path:'infoclient/:id',
    component: GetInfoClientComponent,
    canActivate:[AuthenticateGuard]
  },
  {
    path: 'createClients',
    component: CreateClientsComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'createUsers',
    component: CreateUserComponent,
    canActivate:[AuthenticateGuard]
  },
  {
    path: 'amounts',
    component: GetAmountComponent,
    canActivate:[AuthenticateGuard]
  },
  {
    path: 'createAmount',
    component: CreateAmountComponent,
    canActivate: [AuthenticateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
