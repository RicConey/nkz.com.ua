// app/api/links/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Создаём один экземпляр PrismaClient, чтобы не создавать его при каждом запросе
const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { slug, url } = body;

        if (!slug || !url) {
            return NextResponse.json({ error: 'Поля slug и url обязательны' }, { status: 400 });
        }

        const newLink = await prisma.link.create({
            data: { slug, url },
        });

        return NextResponse.json({ data: newLink }, { status: 201 });
    } catch (error) {
        console.error('Ошибка при создании ссылки:', error);
        if (error.code === 'P2002') {
            // Код ошибки Prisma, если нарушено уникальное ограничение
            return NextResponse.json({ error: 'Slug уже существует' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
