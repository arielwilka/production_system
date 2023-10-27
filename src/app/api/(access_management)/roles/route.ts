import { NextRequest,NextResponse } from "next/server";
import type { Role } from "@prisma/client";
import { roleServiceCreate, roleServiceList } from "../roles/service";
import {v4 as uuidv4} from "uuid";

export async function POST (request: NextRequest) {
    const body: Role = await request.json();
    console.log(body);
    const {name, is_enable} = body;
    let id = uuidv4();

    const requestRole = {
        role_id: String(id),
        name: name,
        is_enable: Boolean(is_enable),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    };
    console.log(requestRole);
    try {
        const newUser = await roleServiceCreate(requestRole);
        return NextResponse.json({status:200, message:"success", data:newUser})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function GET () {
    try {
        const userList = await roleServiceList();
        return NextResponse.json({status:200, message:"success", data:userList})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}