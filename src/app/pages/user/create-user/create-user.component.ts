import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUser } from  '../../../models/user.model';
import {GetRoles} from '../../../models/role.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService } from '../../../services/role/role.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  form: FormGroup = new FormGroup({});
  roles: GetRoles = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '' ,
        status: ''
      }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private roleService: RoleService // Agrega tu servicio de roles
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['Estado', [Validators.required]],
      password: ['', [Validators.required]],
      idRole: ['', [Validators.required]] // Nuevo campo para el id del rol
    });

    // Obtén la lista de roles
    this.roleService.getRoles().subscribe((response)=>{
      this.roles = response;
    })
  }

  sendRequest(event: Event) {
    event.preventDefault();

    const dto: CreateUser = {
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      status: this.form.get('status')?.value,
      password: this.form.get('password')?.value,
      idRole: this.form.get('idRole')?.value,
    };

    this.userService.createUser(dto).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusCode == 201) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: true,
          });
        }
        this.router.navigate(['/user']);
      },
      error: (error) => {
        console.log('error', error);
        if (error.status === 400) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Algo salió mal, verifica que estás enviando los datos correctamente',
            timer: 2000
          });
        } else if (error.status === 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El usuario ya existe en la base de datos',
            timer: 2000
          });
        }
      }
    });
  }
}
