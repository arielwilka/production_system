import { Role, RoleData } from "../data/RoleData";

const roleData: RoleData = {
    roles: undefined,
    createRole: function (role: Role): Promise<Role> {
        throw new Error("Function not implemented.");
    },
    updateRole: function (role: Role): Promise<Role> {
        throw new Error("Function not implemented.");
    },
    deleteRole: function (roleId: string): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    listRoles: function (): Promise<Role[]> {
        throw new Error("Function not implemented.");
    }
}
export default roleData