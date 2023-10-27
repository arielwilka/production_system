import { NextRequest,NextResponse } from "next/server";
import type { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { userServiceCreate, userServiceList } from "../user/service";
import {v4 as uuidv4} from "uuid";

export async function POST (request: NextRequest) {
    const body: User = await request.json();
    const {name, gender, username, password, role_id, is_enable} = body;
    let id = uuidv4()
    let password_crypt = bcrypt.hashSync(password, 10);
    const requestUser = {
        user_id: String(id),
        name: name,
        gender: gender,
        username: username,
        password: password_crypt,
        role_id: role_id,
        is_enable: Boolean(is_enable),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    };
    try {
        const newUser = await userServiceCreate(requestUser);
        return NextResponse.json({status:200, message:"success", data:newUser})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function GET () {
    try {
        const userList = await userServiceList();
        return NextResponse.json({status:200, message:"success", data:userList})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}