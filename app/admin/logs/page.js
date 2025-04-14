'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function parseUserAgent(agent) {
    if (!agent) return 'unknown';
    let browser = 'unknown';
    let os = 'unknown';

    if (agent.includes('SamsungBrowser')) browser = 'Samsung Internet';
    else if (agent.includes('Chrome')) browser = 'Chrome';
    else if (agent.includes('Firefox')) browser = 'Firefox';
    else if (agent.includes('Safari') && !agent.includes('Chrome')) browser = 'Safari';
    else if (agent.includes('Edge')) browser = 'Edge';

    if (agent.includes('Windows')) os = 'Windows';
    else if (agent.includes('Android')) os = 'Android';
    else if (agent.includes('iPhone') || agent.includes('iPad')) os = 'iOS';
    else if (agent.includes('Mac OS')) os = 'macOS';

    return `${browser}, ${os}`;
}

function FullLogsContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        fetch(`/api/admin/logs-by-slug?slug=${slug}&full=true`)
            .then((res) => res.json())
            .then((data) => {
                setLogs(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);

    if (!slug) return <p>No slug provided.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Full Logs for: {slug}</h2>
            <Link href="/admin">
                <button>Back to Admin</button>
            </Link>
            {loading ? (
                <p>Loading...</p>
            ) : logs.length === 0 ? (
                <p>No logs available.</p>
            ) : (
                <table border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>IP</th>
                        <th>Browser/OS</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{new Date(log.createdAt).toLocaleString()}</td>
                            <td>{log.ip}</td>
                            <td>{parseUserAgent(log.userAgent)}</td>
                            <td>{log.title || '—'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default function FullLogsPage() {
    return (
        <Suspense fallback={<div>Loading logs...</div>}>
            <FullLogsContent />
        </Suspense>
    );
}
