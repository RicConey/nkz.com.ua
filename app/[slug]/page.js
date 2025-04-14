// app/[slug]/page.js
import { notFound, redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { staticLinks } from "../../lib/staticLinks";

const prisma = new PrismaClient();

// Функция логирования перехода
async function logRedirect({ slug, linkUrl, title, ip, userAgent }) {
    try {
        await prisma.redirectLog.create({
            data: { slug, linkUrl, title, ip, userAgent },
        });
    } catch (error) {
        console.error("Error logging redirect", error);
    }
}

export default async function Page({ params }) {
    // Получаем slug из параметров (ожидаем, что params – промис)
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    let link;
    let dbAvailable = true;

    // Пытаемся получить запись из базы
    try {
        link = await prisma.link.findUnique({
            where: { slug },
            select: { slug: true, url: true, title: true, paused: true, readOnly: true },
        });
    } catch (error) {
        console.error("DB error: ", error);
        dbAvailable = false;
    }

    // Если запись не найдена в БД, ищем в статических ссылках
    if (!link) {
        const staticLink = staticLinks.find((item) => item.slug === slug);
        if (staticLink) {
            link = staticLink;
            // Если БД доступна, вставляем запись в базу через upsert.
            // Поскольку update: {} оставляет запись неизменной, запись созданная один раз (readOnly) не будет перезаписана.
            if (dbAvailable) {
                try {
                    await prisma.link.upsert({
                        where: { slug },
                        update: {},
                        create: { ...staticLink, createdAt: new Date() },
                    });
                } catch (upsertError) {
                    console.error("Error upserting static link: ", upsertError);
                }
            }
        }
    }

    // Если запись так и не найдена - возвращаем 404
    if (!link) {
        notFound();
    }

    // Если ссылка приостановлена - возвращаем сообщение, что ссылка приостановлена
    if (link.paused) {
        return (
            <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
                <h1>This link is paused.</h1>
                <p>Please contact the administrator.</p>
            </div>
        );
    }

    const reqHeaders = await headers();
    const isPrefetch = reqHeaders.get("x-nextjs-prefetch") === "1";

    // Если БД доступна и запрос не является prefetch, логируем переход
    if (dbAvailable && !isPrefetch) {
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

    // Переадресация по URL ссылки
    redirect(link.url);
}
