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
  interface RoleDeleteComponentProps {
    role: Role;
    onDelete: () => void;
  }
