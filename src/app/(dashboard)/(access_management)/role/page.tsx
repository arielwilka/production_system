import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RoleData,listRoles } from './data/RoleData'  


const rolePage = async(roleData: RoleData) => {

  return (
    <div>
        <div className='flex justify-end mb-2 mt-2 mr-10' >
            <Button variant='default'>Create</Button>
        </div>
        <div className='overflow-x-scroll'>
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
                <TableRow>
                    <TableCell>Admin</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </div>
         
    </div>
  )
}

export default rolePage