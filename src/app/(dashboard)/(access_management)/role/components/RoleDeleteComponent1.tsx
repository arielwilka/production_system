'use client';
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {deleteRole, Role } from "../data/RoleData";
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

export function RoleDeleteComponent({ role }: RoleEditComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        setIsLoading(true);
        await deleteRole(role.role_id);
        // console.log(role.name)
          setIsLoading(false);
        router.refresh();
    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Delete</Button>
            </DialogTrigger>
            <DialogTitle id="delete-role">Delete Role</DialogTitle>
            <DialogContent>
                <DialogDescription>
                    Are you sure you want to delete this role?
                </DialogDescription>
            </DialogContent>
            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        onClick={() => setIsLoading(false)}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogClose>
            </DialogFooter>
        </Dialog>
    )
}

