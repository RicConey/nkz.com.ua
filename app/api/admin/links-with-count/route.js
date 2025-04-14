import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const links = await prisma.link.findMany({
        include: {
            _count: { select: { redirectLogs: true } }
        },
        orderBy: { slug: 'asc' }
    });
    // Преобразуем объект в plain object через JSON‑сериализацию
    const plainLinks = JSON.parse(JSON.stringify(links));
    return NextResponse.json(plainLinks);
}
