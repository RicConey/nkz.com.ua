import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const full = searchParams.get('full') === 'true';

    if (!slug) {
        return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const logs = await prisma.redirectLog.findMany({
        where: { slug },
        orderBy: { createdAt: 'desc' },
        take: full ? undefined : 25,
    });

    // Приводим данные к plain object через JSON-сериализацию
    const plainLogs = JSON.parse(JSON.stringify(logs));
    return NextResponse.json(plainLogs);
}
