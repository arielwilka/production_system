'use client';
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {createRole, Role } from "../data/RoleData";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export function DialogDemo() {
    const [newRole, setNewRole] = useState<Role>({
        role_id: '',
        name: '',
        is_enable: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleEnableChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewRole({ ...newRole, is_enable: e.target.checked });
      };
    const handleSubmitRole = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await createRole(newRole);
        setIsLoading(false);
        setNewRole({
            role_id: '',
            name: '',
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
        <form onSubmit={handleSubmitRole}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
                type="text"
                placeholder="Enter Role Name"
                className="col-span-3"
                value={newRole.name}
                onChange={(e) =>
                    setNewRole({
                        ...newRole,
                        name: e.target.value,
                    })
                }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_enable" className="text-right">
              Enable:
            </Label>
            <Input
                type="checkbox"
                checked={newRole.is_enable}
                onChange={handleEnableChange}
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
}