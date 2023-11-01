'use client';
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {updateRole, Role } from "../data/RoleData";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog";
interface RoleEditComponentProps {
    role: Role;
  }
export function EditRole({ role }: RoleEditComponentProps) {
    const [editedRole, setEditedRole] = useState(role);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleEnableChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedRole({ ...editedRole, is_enable: e.target.checked });
    };
    const handleSubmitRole = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await updateRole(editedRole);
        setIsLoading(false);
        router.refresh();
    };
    return(
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {editedRole.name}</DialogTitle>
            <DialogDescription>
              Create a role here. Click submit when youre done.
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
                  value={editedRole.name}
                  onChange={(e) =>
                      setEditedRole({ ...editedRole, name: e.target.value })
                  }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_enable" className="text-right">
                Enable:
              </Label>
              <Input
                  type="checkbox"
                  checked={editedRole.is_enable}
                  onChange={handleEnableChange}
              />
              
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Edit"}
            </Button>
            </DialogClose>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> 
    )
}