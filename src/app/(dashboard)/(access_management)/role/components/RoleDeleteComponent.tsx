"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Role, deleteRole } from '../data/RoleData';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

  interface RoleDeleteComponentProps {
    role: Role;
  }
export default function RoleDeleteComponent({ role }: RoleDeleteComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        setIsLoading(true);
        await deleteRole(role.role_id);
        console.log(role.role_id);
        setIsLoading(false);
        router.refresh();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
            <AlertDialogHeader>
                <AlertDialogTitle>
                Delete Role
                </AlertDialogTitle>
                <AlertDialogDescription>
                Are you sure you want to delete this role?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}