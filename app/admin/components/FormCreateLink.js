'use client';
import { useState } from 'react';

export default function FormCreateLink() {
    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        const res = await fetch('/api/links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, title, url }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage(`Link created: https://nkz.com.ua/${data.data.slug}`);
            setSlug('');
            setTitle('');
            setUrl('');
        } else {
            setMessage(`Error: ${data.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Link</h2>
            <div>
                <label>Slug: </label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div>
                <label>Title: </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>URL: </label>
                <input value={url} onChange={(e) => setUrl(e.target.value)} required />
            </div>
            <button type="submit">Create</button>
            {message && <p>{message}</p>}
        </form>
    );
}
