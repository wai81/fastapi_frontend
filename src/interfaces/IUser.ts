// import { IOrganization } from './IOrganization';

export interface IUser {
  id: string;
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  is_superuser: boolean;
  is_active: boolean;
  avatar?: string;
  organization_id?: number;
  // access_tors: [IOrganization];
  creator_id?: string;
  created_at: string;
}

export interface ICreateUser {
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  password: string;
  avatar?: string;
  organization_id?: number;
}

export interface IUpdateUser {
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  password: string;
  avatar?: string;
  organization_id: number | null;
  is_superuser: boolean;
  is_active: boolean;
}

export interface IUserFilterVariables{
  q?: string
  organization_id?: number;
  //is_active?: boolean;
}
