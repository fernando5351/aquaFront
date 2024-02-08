export interface User {
  id: number;
  idRole: number;
  email: string;
  name: string;
  Role: {
    id: number;
    name: string;
    status: string;
  };
  lastname: string;
  status: string;
  createdAt: string;
  password: string;
}

export interface CreateUser {
  name: string;
  lastname: string;
  email: string;
  status: string;
  password: string;
  idRole: number;
}



export interface UpdateUser {
  name: string;
  lastname: string;
  status: string;
  idRole: number;
}

export interface AuthUser {
  statusCode: number;
  message: string;
  data: User;
  token: string;
}

export interface GetUser{
  statusCode: number,
  message: string,
  data: User
}

export interface Delete {
  statusCode: number,
  message: string,
  data: number
}



export interface getUsers extends Omit<GetUser, 'data'>{
  data:Array<User>
}

export interface getUser extends Omit<AuthUser, 'token'>{}

