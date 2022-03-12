/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.21.588 on 2022-03-12 11:35:35.

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    status: UserStatusDTO;
}

export enum UserStatusDTO {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
