import { listRoles } from "./data/RoleData";
import roleData from "./contexts/DataProvider";
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { EditRole } from "./components/RoleEditComponent";
  import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import RoleCreateComponent1 from "./components/RoleCreateComponent";
import { DialogDemo } from "./components/RoleCreateComponent1";
// import { AlertDialogDemo } from "./components/RoleDeleteComponent";
export default async function RolePage(){
    
    const roles = await listRoles(roleData);
    return (
        <div>
        <div className='flex justify-end mb-2 mt-2 mr-10' >
            <DialogDemo/>
        </div>
        <div>
            <Table className='w-full table-auto'>
            <TableCaption>List of Roles</TableCaption>
            <TableHeader className='text-center bg-muted'>
                <TableRow>
                    <TableHead className="text-center">#</TableHead>
                    <TableHead>Role Name</TableHead>
                    <TableHead>is_Enable</TableHead>
                    <TableHead>Updated_at</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {roleData.roles?.map((role, index) => (
                <TableRow key={role.role_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                        <Checkbox
                        checked={role.is_enable}
                        disabled
                        />
                    </TableCell>
                    <TableCell>{role.updated_at.toLocaleString()}</TableCell>
                    <TableCell className='text-center'>
                    <EditRole role={role}/>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
         
    </div>    
    );

};
