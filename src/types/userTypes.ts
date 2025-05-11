export type UserLevel = 
  | 'admin-pusat' 
  | 'admin-provinsi' 
  | 'admin-kabupaten' 
  | 'admin-kecamatan' 
  | 'admin-kelurahan';

export interface User {
  id: string;
  username: string;
  password: string;
  level: UserLevel;
  wilayah: string;
  createdAt: Date;
}

export interface UserFormData {
  username: string;
  password?: string;
  level: string;
  wilayah: string;
}

