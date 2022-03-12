/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.21.588 on 2022-03-12 19:14:47.

export interface PermissionDTO {
    id: number;
    name: string;
    description: string;
}

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    status: UserStatusDTO;
    permissions: PermissionDTO[];
}

export enum UserStatusDTO {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
