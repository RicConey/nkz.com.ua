// app/api/links/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const { slug, title, url } = body;

    if (!slug || !url) {
        return NextResponse.json({ error: 'Slug и URL обязательны' }, { status: 400 });
    }

    const link = await prisma.link.create({
        data: {
            slug,
            title,
            url
        }
    });

    return NextResponse.json({ data: link });
}
