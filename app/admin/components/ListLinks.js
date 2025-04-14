'use client';
import { useEffect, useState } from 'react';
import SlugLogs from './SlugLogs';

export default function ListLinks() {
    const [links, setLinks] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState(null);
    const [editingSlug, setEditingSlug] = useState(null);
    const [editData, setEditData] = useState({ title: '', url: '' });

    const fetchLinks = () => {
        fetch('/api/admin/links-with-count')
            .then((res) => res.json())
            .then(setLinks);
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleDelete = async (slug) => {
        if (!confirm(`Are you sure you want to delete link ${slug}?`)) return;
        const res = await fetch(`/api/admin/links/${slug}`, { method: 'DELETE' });
        if (res.ok) fetchLinks();
    };

    const handlePauseToggle = async (link) => {
        const res = await fetch(`/api/admin/links/${link.slug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paused: !link.paused }),
        });
        if (res.ok) fetchLinks();
    };

    const handleEditStart = (link) => {
        setEditingSlug(link.slug);
        setEditData({ title: link.title || '', url: link.url });
    };

    const handleEditCancel = () => {
        setEditingSlug(null);
        setEditData({ title: '', url: '' });
    };

    const handleEditSubmit = async (slug) => {
        const res = await fetch(`/api/admin/links/${slug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });
        if (res.ok) {
            setEditingSlug(null);
            fetchLinks();
        }
    };

    return (
        <div>
            <h2>Existing Links</h2>
            {links.length === 0 ? (
                <p>No links available.</p>
            ) : (
                <table border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Slug</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Date Created</th>
                        <th>Redirects</th>
                        <th>Paused</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {links.map((link) => (
                        <tr key={link.slug}>
                            <td>{link.slug}</td>
                            <td>
                                {editingSlug === link.slug ? (
                                    <input
                                        type="text"
                                        value={editData.title}
                                        onChange={(e) =>
                                            setEditData({ ...editData, title: e.target.value })
                                        }
                                    />
                                ) : (
                                    link.title || '—'
                                )}
                            </td>
                            <td>
                                {editingSlug === link.slug ? (
                                    <input
                                        type="text"
                                        value={editData.url}
                                        onChange={(e) =>
                                            setEditData({ ...editData, url: e.target.value })
                                        }
                                    />
                                ) : (
                                    link.url
                                )}
                            </td>
                            <td>{new Date(link.createdAt).toLocaleString()}</td>
                            <td>{link._count.redirectLogs}</td>
                            <td>{link.paused ? 'Yes' : 'No'}</td>
                            <td>
                                {editingSlug === link.slug ? (
                                    <>
                                        <button onClick={() => handleEditSubmit(link.slug)}>
                                            Save
                                        </button>
                                        <button onClick={handleEditCancel}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditStart(link)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handlePauseToggle(link)}>
                                            {link.paused ? 'Resume' : 'Pause'}
                                        </button>
                                        <button onClick={() => handleDelete(link.slug)}>
                                            Delete
                                        </button>
                                        <button onClick={() => setSelectedSlug(link.slug)}>
                                            Details
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedSlug && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Logs for: {selectedSlug}</h3>
                    <button onClick={() => setSelectedSlug(null)}>Close</button>
                    <SlugLogs slug={selectedSlug} />
                </div>
            )}
        </div>
    );
}
