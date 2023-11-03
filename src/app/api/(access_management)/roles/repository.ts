import prisma from "../../../../lib/prisma";
import type { Role } from "@prisma/client";

export async function roleRepositoryCreate (requestRole: Role) {
    const newRole = await prisma.role.create({data: requestRole});
    return newRole;
}

export async function roleRepositoryFindByID(roleID: string) {
    const role = await prisma.role.findUnique({where: {role_id: roleID}});
    return role;
}

export async function roleRepositoryLists() {
    const roleLists = await prisma.role.findMany();
    return roleLists;
}

export async function roleRepositoryUpdate(requestRole: Role, roleID: string) {
    const roleUpdate = await prisma.role.update({
        where: { role_id: roleID },
        data: requestRole,
      });
    return roleUpdate;
}

export async function roleRepositoryDelete(roleID: string) {
    console.log(roleID);
    const roleDelete = await prisma.role.update({
        where: { role_id: roleID },
        data: { 
            is_enable: false,
            deleted_at: new Date()
        },
      });
    return roleDelete;
}