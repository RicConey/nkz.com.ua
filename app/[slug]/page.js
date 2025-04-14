// app/[slug]/page.js
import { notFound, redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Page({ params }) {
    const { slug } = await params;
    const link = await prisma.link.findUnique({
        where: { slug },
    });

    if (!link) {
        notFound();
    }
    redirect(link.url);
}