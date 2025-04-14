// app/admin/components/RedirectLogs.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Упрощённый парсер user-agent
function parseUserAgent(agent) {
    if (!agent) return 'неизвестно';

    let browser = 'неизвестно';
    let os = 'неизвестно';

    // Браузер
    if (agent.includes('SamsungBrowser')) {
        browser = 'Samsung Internet';
    } else if (agent.includes('Chrome')) {
        browser = 'Chrome';
    } else if (agent.includes('Firefox')) {
        browser = 'Firefox';
    } else if (agent.includes('Safari') && !agent.includes('Chrome')) {
        browser = 'Safari';
    } else if (agent.includes('Edge')) {
        browser = 'Edge';
    }

    // ОС
    if (agent.includes('Windows')) {
        os = 'Windows';
    } else if (agent.includes('Android')) {
        os = 'Android';
    } else if (agent.includes('iPhone') || agent.includes('iPad')) {
        os = 'iOS';
    } else if (agent.includes('Mac OS')) {
        os = 'macOS';
    }

    return `${browser}, ${os}`;
}

export default async function RedirectLogs() {
    const logs = await prisma.redirectLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return (
        <div>
            <h2>Логи переходов</h2>
            {logs.length === 0 ? (
                <p>Переходов пока нет.</p>
            ) : (
                <table border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Slug</th>
                        <th>Дата</th>
                        <th>Название</th>
                        <th>URL</th>
                        <th>IP</th>
                        <th>Браузер / ОС</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.slug}</td>
                            <td>{new Date(log.createdAt).toLocaleString()}</td>
                            <td>{log.title || '—'}</td>
                            <td>{log.linkUrl}</td>
                            <td>{log.ip}</td>
                            <td>{parseUserAgent(log.userAgent)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
