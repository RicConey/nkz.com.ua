'use client';
import { useState } from 'react';

export default function CreateLink() {
    const [slug, setSlug] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug, url })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(`Ссылка создана: https://nkz.com.ua/${data.data.slug}`);
            } else {
                setMessage(`Ошибка: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Ошибка запроса: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Создать короткую ссылку</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Slug (например, 1a): </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>URL: </label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Создать</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
