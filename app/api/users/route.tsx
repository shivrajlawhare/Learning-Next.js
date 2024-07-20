import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import schema from "./schema";

const prisma = new PrismaClient()

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
};

export async function POST(request: NextResponse){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if(existingUser){
        return NextResponse.json({error: 'user already exists'}, {
            status: 400
        })
    }

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })

    return NextResponse.json(user);
}

