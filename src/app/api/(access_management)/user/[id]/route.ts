import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { userServiceUpdate, userServiceFindByID, userServiceDelete } from "../service";
import prisma from "@/lib/prisma";
export interface User {
    user_id: string;
    name: string;
    gender: string;
    username: string;
    password: string;
    is_enable: boolean;
    role_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
export async function PUT (request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body: User = await request.json();
    const {name, gender, username, password, role_id, is_enable, created_at, deleted_at} = body;
    let password_crypt = bcrypt.hashSync(password, 10);
    const requestUser = {
        user_id: String(id),
        name: name,
        gender: gender,
        username: username,
        password: password_crypt,
        role_id: role_id,
        is_enable: Boolean(is_enable),
        created_at: created_at,
        updated_at: new Date(),
        deleted_at: deleted_at,
        role: {
            name: role_id
        }
    };
    try {
        const userUpdate = await userServiceUpdate(requestUser, id);
        return NextResponse.json({status:200, message:"success", data:userUpdate})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function DELETE ({ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const userUpdate = await userServiceDelete(id);
        return NextResponse.json({status:200, message:"success", data:userUpdate})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function GET ({ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const userList = await userServiceFindByID(id);
        return NextResponse.json({status:200, message:"success", data:userList})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}
