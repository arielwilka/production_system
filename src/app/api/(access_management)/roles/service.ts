import type { Role } from "@prisma/client";
import { roleRepositoryCreate, roleRepositoryLists, roleRepositoryUpdate, roleRepositoryFindByID, roleRepositoryDelete } from "../roles/repository";

export async function roleServiceCreate (requestRole: Role) {
    const newRole = await roleRepositoryCreate(requestRole);
    return newRole;
}

export async function roleServiceList () {
    const roleList = await roleRepositoryLists();
    return roleList;
}

export async function roleServiceFindByID (id: string) {
    const roleList = await roleRepositoryFindByID(id);
    return roleList;
}

export async function roleServiceUpdate (requestRole: Role, id: string) {
    const roleUpdate = await roleRepositoryUpdate(requestRole, id);
    return roleUpdate;
}

export async function roleServiceDelete (id: string) {
    const roleDelete = await roleRepositoryDelete(id);
    return roleDelete;
}