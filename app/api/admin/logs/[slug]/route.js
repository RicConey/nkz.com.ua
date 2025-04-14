// app/api/admin/logs/[slug]/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    try {
        const result = await prisma.redirectLog.deleteMany({
            where: { slug },
        });

        return NextResponse.json({ message: `All logs deleted for slug ${slug}`, result });
    } catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
