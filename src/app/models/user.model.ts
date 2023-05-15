export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;
  createAt: Date;
  updateAt: Date;
}

export type CreateUserDTO = Omit<User, 'id' | 'createAt' | 'updateAt'>;
