import { listUser } from "./data/UserData";
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
  import { Checkbox } from "@/components/ui/checkbox";
import userData from "./contexts/DataProvider";
// import { CreateUser } from "./components/UserCreateComponent";
import UserCreateComponent from "./components/UserCreateComponent";

  export default async function UserPage(){
    
    const user = await listUser(userData);
    return (
        <div>
        <div className='flex justify-end mb-2 mt-2 mr-10' >
            {/* <CreateUser roles={[]}/> */}
            {/* <SelectDemo/> */}
            <UserCreateComponent/>
        </div>
        <div>
            <Table className='w-full table-auto'>
            <TableCaption>List of User</TableCaption>
            <TableHeader className='text-center bg-muted'>
                <TableRow>
                    <TableHead className="text-center">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>is_Enable</TableHead>
                    <TableHead>Updated_at</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {userData.user?.map((user, index) => (
                <TableRow key={user.user_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role.name}</TableCell>
                    <TableCell>
                        <Checkbox
                        checked={user.is_enable}
                        disabled
                        />
                    </TableCell>
                    <TableCell>{user.updated_at.toLocaleString()}</TableCell>
                    <TableCell className='text-center'>
                    {/* <EditRole role={user}/> */}
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
         
    </div>    
    );

};