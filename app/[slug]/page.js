import { notFound, redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

async function logRedirect({ slug, linkUrl, title, ip, userAgent }) {
    try {
        await prisma.redirectLog.create({
            data: { slug, linkUrl, title, ip, userAgent },
        });
    } catch (error) {
        console.error('Error logging redirect', error);
    }
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const reqHeaders = await headers();
    const isPrefetch = reqHeaders.get('x-nextjs-prefetch') === '1';

    const link = await prisma.link.findUnique({
        where: { slug },
        select: { slug: true, url: true, title: true, paused: true },
    });

    if (!link) notFound();

    if (link.paused) {
        // Если ссылка приостановлена, возвращаем обычный JSX (plain object)
        return (
            <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
                <h1>This link is paused.</h1>
                <p>Please contact the administrator.</p>
            </div>
        );
    }

    if (!isPrefetch) {
        const ip = reqHeaders.get("x-forwarded-for") || "";
        const userAgent = reqHeaders.get("user-agent") || "";
        await logRedirect({
            slug: link.slug,
            linkUrl: link.url,
            title: link.title,
            ip,
            userAgent,
        });
    }

    redirect(link.url);
}
