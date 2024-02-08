import { Component ,Input} from '@angular/core';
import { User, GetUser,UpdateUser, getUsers,Delete } from '../../models/user.model';
import {GetRoles,GetRole} from '../../models/role.model';
import { RoleService } from '../../services/role/role.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {


  apiUrl = '/user';
  idUser: number = 0;

 @Input() users: getUsers = {
    statusCode: 0,
    message: '',
    data: [{
      id:0,
      name: '',
      lastname: '',
      idRole: 0,
      email: '',
      status: '',
      createdAt: '',
      password: '',
      Role: {
        id: 0,
        name: '',
        status: '',
      }
    }]
  }


  @Input() user: User = {
    id: 0,
    idRole: 0,
    name: '',
    lastname: '',
    email: '',
    status: '',
    password: '',
    createdAt: '',
    Role: {
      id: 0,
      name: '',
      status: ''
    }
  };

  deleteUser: Delete = {
    statusCode: 0,
    message: '',
    data: 0
  }

  roles: GetRoles = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '',
        status: ''
      }
    ]
  };

  selectedRole: GetRole = {
    statusCode: 0,
    message: '',
    data: {
      id: 0,
      name: '',
      status: ''
    }
  };

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) { }

  refrescarPagina() {
    window.location.reload();
  }
  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (response) => {
            // Manejar la respuesta del servicio
            console.log(response);
            if (response == 200) {
              Swal.fire(
                'Eliminado',
                'El usuario ha sido eliminado correctamente.',
                'success'
              );
              // Aquí puedes actualizar la lista de usuarios si es necesario
            } else {
              Swal.fire(
                'Error',
                'No se pudo eliminar el usuario.',
                'error'
              );
            }
          },
          (error) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }




 update(id: number) {
  this.idUser = this.user.id;

  // Obtener la información del usuario por su ID
  this.userService.getUserById(id).subscribe((userData: GetUser) => {
    this.user = userData.data;

    // Obtener la lista de roles para el select
    this.roleService.getRoles().subscribe((rolesData: GetRoles) => {
      this.roles = rolesData;

      // Crear el HTML para el formulario en el modal
      const modalHtml = `
        <form>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" class="swal2-input" value="${this.user.name}">
          </div>
          <div class="form-group">
            <label for="lastname">Apellido:</label>
            <input type="text" id="lastname" class="swal2-input" value="${this.user.lastname}">
          </div>
          <div class="form-group">
            <label for="status">Estado:</label>
            <select id="status" class="swal2-input">
              <option value="Activo" ${this.user.status === 'Activo' ? 'selected' : ''}>Activo</option>
              <option value="Inactivo" ${this.user.status === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="role">Rol:</label>
            <select id="role" class="swal2-input">
              ${this.roles.data.map(role => `<option value="${role.id}" ${this.user.idRole === role.id ? 'selected' : ''}>${role.name}</option>`).join('')}
            </select>
          </div>
        </form>
      `;

      Swal.fire({
        title: 'Editar Usuario',
        html: modalHtml,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        preConfirm: () => {
          // Capturar los valores de los campos en el formulario antes de confirmar
          const updatedUser: UpdateUser = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            lastname: (document.getElementById('lastname') as HTMLInputElement).value,
            status: (document.getElementById('status') as HTMLSelectElement).value,
            idRole: parseInt((document.getElementById('role') as HTMLSelectElement).value, 10)
          };

          return updatedUser;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar una solicitud HTTP PATCH para actualizar el usuario en el servidor
          this.userService.patchUser(result.value, id).subscribe(
            (response) => {
              if (response = 200) {
                Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success').then(() => {
                 this.refrescarPagina()
                });
              } else {
                Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
              }
            },
            (error) => {
              // Manejar los errores según sea necesario
            }
          );
        }
      });
    });
  });
}
}



