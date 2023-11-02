import {User, UserData, UserRead } from "../data/UserData";

const userData: UserData = {
    user: undefined,
    createUser: function (user: User): Promise<User> {
        throw new Error("Function not implemented.");
    },
    updateUser: function (user: User): Promise<User> {
        throw new Error("Function not implemented.");
    },
    deleteUser: function (userId: string): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    listUser: function (): Promise<UserRead[]> {
        throw new Error("Function not implemented.");
    },
}
export default userData