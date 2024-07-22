import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

export async function POST(request: NextResponse){
    const body = await request.json();
    const validations = schema.safeParse(body);
    if(!validations.success){
        return NextResponse.json(validations.error.errors, {status: 400})
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if(existingUser){
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(body.password,10)

    const user = await prisma.user.create({
        data: {
            email: body.email,
            hashedPassword
        }
    })

    return NextResponse.json({email: user.email})
}