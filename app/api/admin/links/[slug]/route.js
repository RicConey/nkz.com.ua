// app/api/admin/links/[slug]/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
    // Если params асинхронны, можно добавить await
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const body = await request.json();
    try {
        const updated = await prisma.link.update({
            where: { slug },
            data: body,
        });
        return NextResponse.json({ data: updated });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    try {
        await prisma.link.delete({ where: { slug } });
        return NextResponse.json({ message: 'Link deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
