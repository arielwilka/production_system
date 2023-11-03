"use client";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import type { Role} from "@prisma/client";
import { useRouter } from "next/navigation";
import { createUser,User} from "../data/userData";
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

type CreateUserProps = {
    roles: Role[];
  };
  
  const CreateUser: React.FunctionComponent<CreateUserProps> = ({ roles }: {roles: Role[]}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
        role: {
          name: '',
        }
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  
    const router = useRouter();
    const handleSelectChange = (value: string) => {
      setNewUser({ ...newUser, role_id: value });
  }
    const handleEnableChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, is_enable: e.target.checked });
    }
    const handleSubmitUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await createUser(newUser);
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
            role: {
              name: '',
            }
        });
        router.refresh();
    };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create a new user to access your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitUser}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                value={newUser.gender}
                onChange={(e) =>
                  setNewUser({ ...newUser, gender: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className="col-span-3"
                required={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="col-span-3"
                required={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={handleSelectChange}
                required={true}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent >
                  <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {roles.map((role) => (
                <SelectItem key={role.role_id} value={role.role_id}>
                  {role.name}
                </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_enable">Enable</Label>
              <Input
                id="is_enable"
                type="checkbox"
                checked={newUser.is_enable}
                onChange={handleEnableChange}
                className="col-span-3"
                required={true}
              />
            </div>
          </div>
          <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Create"}
            </Button>
          </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
};

export default CreateUser;