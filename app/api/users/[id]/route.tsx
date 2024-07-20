import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient()

function isValidObjectId(id: string) {
    return ObjectId.isValid(id)
}


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const { id } = params;
    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { id }
    });
    if (!user) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }

    return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: {id}
    })

    if(!existingUser){
        return NextResponse.json({error: 'user not found'},{
            status: 404
        })
    }

    const user = await prisma.user.update({
        where: {id},
        data: {
            name: body.name,
            email: body.email
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { id }
    })

    if (!existingUser) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }

    const user = await prisma.user.delete({
        where: { id }
    })
    return NextResponse.json(user);
}