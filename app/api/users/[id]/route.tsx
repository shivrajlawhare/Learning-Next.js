import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";


export function GET(
    request: NextRequest, 
    {params} : { params: {id: number} }){
        if(params.id>10){
            return NextResponse.json({error: 'user not found'}, {status: 404});
        }
        return NextResponse.json({
            id: params.id,
            name: 'shivraj',
        })
}

export async function PUT(request: NextRequest, {params} : {params: {id: number}}){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }

    if(params.id > 10 ){
        return NextResponse.json({error: 'user not found'},{ status: 404});
    }

    return NextResponse.json({id: params.id, name: body.name});
}

export  function DELETE(request: NextRequest, {params}: {params: {id: number}}){
    if(params.id > 10){
        return NextResponse.json({error: 'user not found'}, {status: 404});
    }
    return NextResponse.json({message: 'user deleted'});
}