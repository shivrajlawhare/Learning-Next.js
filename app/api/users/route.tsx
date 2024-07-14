import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest){
    return NextResponse.json([
        {
            id: 1,
            name: 'shivraj',
        },
        {
            id: 1,
            name: 'shivraj',
        }
    ])
};

export async function POST(request: NextResponse){
    const body = await request.json();
    if(!body.name){
        return NextResponse.json({error: 'name is required'},{status: 400});
    }
    return NextResponse.json({"id": 1, "name": body.name}, {status: 201});
}

