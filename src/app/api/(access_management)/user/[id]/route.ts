import { NextRequest,NextResponse } from "next/server";
import type { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { userServiceUpdate, userServiceFindByID, userServiceDelete } from "../service";

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
        deleted_at: deleted_at
    };
    try {
        const userUpdate = await userServiceUpdate(requestUser, id);
        return NextResponse.json({status:200, message:"success", data:userUpdate})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function DELETE (request: NextRequest,{ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const userUpdate = await userServiceDelete(id);
        return NextResponse.json({status:200, message:"success", data:userUpdate})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function GET (request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const userList = await userServiceFindByID(id);
        return NextResponse.json({status:200, message:"success", data:userList})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}