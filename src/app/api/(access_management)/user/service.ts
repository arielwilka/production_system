import type { User } from "@prisma/client";
import { userRepositoryCreate, userRepositoryLists, userRepositoryUpdate, userRepositoryFindByID, userRepositoryDelete } from "../user/repository";

export async function userServiceCreate (requestUser: User) {
    const newUser = await userRepositoryCreate(requestUser);
    return newUser;
}

export async function userServiceList () {
    const userList = await userRepositoryLists();
    return userList;
}

export async function userServiceFindByID (id: string) {
    const userList = await userRepositoryFindByID(id);
    return userList;
}

export async function userServiceUpdate (requestUser: User, id: string) {
    const userUpdate = await userRepositoryUpdate(requestUser, id);
    return userUpdate;
}

export async function userServiceDelete (id: string) {
    const userDelete = await userRepositoryDelete(id);
    return userDelete;
}