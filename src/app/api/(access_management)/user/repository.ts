import prisma from "../../../../lib/prisma";
import type { User } from "@prisma/client";

export async function userRepositoryCreate (requestUser: User) {
    const newUser = await prisma.user.create({data: requestUser});
    return newUser;
}

export async function userRepositoryFindByID(userID: string) {
    const user = await prisma.user.findUnique({where: {user_id: userID}});
    return user;
}

export async function userRepositoryLists() {
    const userLists = await prisma.user.findMany({
        include: {
            role:{
                select:{
                    name: true
                }
            }
        }
    });
    return userLists;
}

export async function userRepositoryUpdate(requestUser: User, userID: string) {
    console.log(userID);
    console.log(requestUser);
    const userUpdate = await prisma.user.update({
        where: { user_id: userID },
        data: requestUser,
      });
    return userUpdate;
}

export async function userRepositoryDelete(userID: string) {
    console.log(userID);
    const userDelete = await prisma.user.update({
        where: { user_id: userID },
        data: { 
            is_enable: false,
            deleted_at: new Date()
        },
      });
    return userDelete;
}