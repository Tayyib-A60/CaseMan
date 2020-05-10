export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface UserToLogin {
    email: string;
    password: string;
}

export enum Role
{
    Customer = 'Customer',
    Admin = 'Admin'
}