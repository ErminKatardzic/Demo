/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.21.588 on 2022-03-13 17:11:03.

export interface ErrorMessage {
    message: string;
    details: string;
}

export interface FilterPage {
    page: number;
    size: number;
}

export interface FilterSort {
    fieldName: string;
    direction: Direction;
}

export interface PagedUserList {
    content: UserDTO[];
    totalElements: number;
    totalPages: number;
}

export interface UserFilter {
    userFilterCriteria: UserDTO;
    filterPage: FilterPage;
    filterSort: FilterSort;
}

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

export enum Direction {
    ASC = "ASC",
    DESC = "DESC",
}

export enum UserStatusDTO {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
