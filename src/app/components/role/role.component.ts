import { Component,Input } from '@angular/core';
import {Role,GetRoles, DeleteRole,GetRole,UpdateRole} from '../../models/role.model';
import {RoleService} from  '../../services/role/role.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  searchTerm = ''

  @Input() roles: GetRoles = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      status: ''
    }]

  }

  deleteRole: DeleteRole = {
    statusCode: 0,
    message:'',
    data: 0
  }

  selectedRole: GetRole ={
    statusCode: 0,
    message: '',
    data:{
      id: 0,
      name: '',
      status: ''
    }
  }

  refrescarPagina() {
    window.location.reload();
  }

  constructor(
    private roleService: RoleService,
    private router: Router
  ) {};

  getRoles(){
    this.roleService.getRoles().subscribe(
      (data)=>{
        this.roles = data
        console.log(this.roles.data);

      },
      (error)=>{
        console.error('error al obtener los roles', error);
        if (error.status == 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'el rol ya existe',
            timer: 2000
          })
        }
      }
    )
  }


  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este rol?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(id).subscribe(
          (response: DeleteRole) => {
            // Manejar la respuesta del servicio
            console.log(response);
            if (response.statusCode == 200) {
              Swal.fire(
                'Eliminado',
                'El rol ha sido eliminado correctamente.',
                'success'
              );
              // Aquí puedes actualizar la lista de roles si es necesario
            } else {
              Swal.fire(
                'Error',
                'No se pudo eliminar el rol.',
                'error'
              );
            }
          },
          (error) => {
            console.error('Error al eliminar el rol', error);
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar el rol.',
              'error'
            );
          }
        );
      }
    });
  }



  update(id: number) {
    this.roleService.getRoleById(id).subscribe((rol) => {
      this.selectedRole = rol;
      // console.log(rol);

      const roleEditable = { ...this.selectedRole };
      // console.log(roleEditable);

      Swal.fire({
        title: 'Editar Rol',
        html: `
          <form>
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" id="name" class="swal2-input" value="${roleEditable.data.name}">
            </div>
            <div class="form-group">
              <label for="status">Estado:</label>
              <select id="status" class="swal2-input">
                <option value="Activo" ${
                  roleEditable.data.status === 'Activo' ? 'selected' : ''
                }>Activo</option>
                <option value="Inactivo" ${
                  roleEditable.data.status === 'Inactivo' ? 'selected' : ''
                }>Inactivo</option>
              </select>
            </div>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        preConfirm: () => {
          // Captura los valores de los campos en el formulario antes de confirmar
          const updatedRole: UpdateRole = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            status: (document.getElementById('status') as HTMLSelectElement).value
          };

          return updatedRole;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar una solicitud HTTP PATCH para actualizar el rol en el servidor
          this.roleService.pathcRole(result.value, id).subscribe(
            (response) => {
              // console.log(roleEditable.data);

              if (response = 200) {
                Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success').then(() => {
                  this.refrescarPagina(); // Redirige a la página después de la actualización.
                });
              } else {
                Swal.fire('Error', 'No se pudo actualizar el rol.', 'error');
              }
            },
            (error) => {
              if (error.status === 409) {
                Swal.fire('Error', 'El rol que quieres actualizar ya existe.', 'error');
              } else if (error.status === 400) {
                Swal.fire('Error', 'Ocurrió un error, verifica que envías los datos correctamente.', 'error');
              }
            }
          );
        }
      });
    });
  }
}


