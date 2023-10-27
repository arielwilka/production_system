import { NextRequest,NextResponse } from "next/server";
import type { Role } from "@prisma/client";
import { roleServiceUpdate, roleServiceFindByID, roleServiceDelete } from "../service";

export async function PUT (request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body: Role = await request.json();
    const {name, is_enable, created_at, deleted_at} = body;
    const requestRole = {
        role_id: String(id),
        name: name,
        is_enable: Boolean(is_enable),
        created_at: created_at,
        updated_at: new Date(),
        deleted_at: deleted_at
    };
    try {
        const roleUpdate = await roleServiceUpdate(requestRole, id);
        return NextResponse.json({status:200, message:"success", data:roleUpdate})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function DELETE ({ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const roleUpdate = await roleServiceDelete(id);
        return NextResponse.json({status:200, message:"success", data:roleUpdate})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}

export async function GET ({ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const roleList = await roleServiceFindByID(id);
        return NextResponse.json({status:200, message:"success", data:roleList})
    } catch (error) {
        return NextResponse.json({status:500, message:"error", data:error})
    }
}