'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseUserAgent } from '../../../lib/parseUserAgent'; // Импортируем функцию

export default function SlugLogs({ slug }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = () => {
        setLoading(true);
        fetch(`/api/admin/logs-by-slug?slug=${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setLogs(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLogs();
    }, [slug]);

    const handleDeleteAll = async () => {
        if (!confirm(`Are you sure you want to delete all logs for ${slug}?`))
            return;
        const res = await fetch(`/api/admin/logs/${slug}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            fetchLogs();
        }
    };

    return (
        <div>
            <h3>Logs for: {slug}</h3>
            <button onClick={handleDeleteAll}>Delete All Logs</button>
            {loading ? (
                <p>Loading...</p>
            ) : logs.length === 0 ? (
                <p>No logs available.</p>
            ) : (
                <>
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
                    {logs.length === 25 && (
                        <div style={{ marginTop: '10px' }}>
                            <Link href={`/admin/logs?slug=${encodeURIComponent(slug)}&full=true`}>
                                <button>View Full Logs</button>
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
