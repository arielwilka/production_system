"use client";
import { useState, SyntheticEvent } from "react";
import type { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import roleData from "../../role/contexts/DataProvider";
import { listRoles } from "../../role/data/RoleData";
import { listUser, User } from "../data/UserData";
import userData from "../contexts/DataProvider";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,} from "@/components/ui/select"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
const UserCreateComponent = () => {
    const roles = listRoles(roleData);
    const [newUser, setNewUser] = useState<User>({
        user_id: '',
        name: '',
        gender: '',
        username: '',
        password: '',
        role_id: '',
        is_enable: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
    })
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmitUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await listUser(userData);
        setIsLoading(false);
        setNewUser({
            user_id: '',
            name: '',
            gender: '',
            username: '',
            password: '',
            role_id: '',
            is_enable: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        });
        router.refresh();
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Role</DialogTitle>
                    <DialogDescription>
                        Create a new role here. Click submit when youre done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitUser}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                type="text"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right">
                                Gender
                            </Label>
                            <Input
                                type="text"
                                value={newUser.gender}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        gender: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                type="text"
                                value={newUser.username}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                type="password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role_id" className="text-right">
                                Role
                            </Label>
                            <Select value={newUser.role_id} onValueChange={(value) => setNewUser({...newUser, role_id: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Role</SelectLabel>
                                        {roles?.map((role, index) => (
                                            <SelectItem
                                                key={role.role_id}
                                                value={role.role_id}
                                            >
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>Cancel</DialogClose>
                        <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Loading..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserCreateComponent;