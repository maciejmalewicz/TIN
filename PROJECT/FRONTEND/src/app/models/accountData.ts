export interface AccountData {
  login: string,
  password: string
}

export interface RegisterData extends AccountData {
  firstName: string,
  lastName: string
}

export interface LoginModel {
  status: number,
  firstName: string,
  lastName: string
}
