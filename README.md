# NKZ QR Redirect Platform / Система QR-редиректів NKZ

A simple and effective short link and QR redirect platform with logging and admin interface.  
Система коротких посилань із редиректом, базовою аналітикою та панеллю керування.

---

## 🔍 Overview / Огляд

**EN:**  
This platform allows creating short links (e.g., `https://nkz.com.ua/mylink`) that redirect to any target URL. It also logs all visits and provides a minimalistic admin panel to manage slugs.

**UA:**  
Цей сайт дозволяє створювати короткі посилання (наприклад, `https://nkz.com.ua/mylink`), які переадресовують на будь-який інший сайт. Ведеться облік переходів, а також є проста адмінка для керування посиланнями.

- **Live**: [nkz.com.ua](https://nkz.com.ua)
- **Frontend**: Next.js 14+, React, Tailwind CSS
- **Backend**: Next.js API routes, PostgreSQL (Neon)
- **Language**: Ukrainian 🇺🇦

---

## 🧩 Features / Можливості

- 🔗 Створення коротких посилань з власним `slug`
- 📝 Збереження `title` і цільового URL
- 📈 Логування переходів (час, IP, user-agent)
- 🛠️ Панель адміністратора `/admin`
- 📦 Підключення до бази даних Neon (PostgreSQL)
- 📄 Підготовка до генерації QR-кодів (не реалізовано)

---

## 🧠 Use Case / Приклади використання

- QR на листівках, банерах, упаковці
- Керування зовнішніми/внутрішніми редиректами
- Збір статистики переходів по різних кампаніях

---

## 📦 Tech Stack / Технології

| Technology  | Purpose                          |
|-------------|----------------------------------|
| Next.js     | SSR + API routes                 |
| React       | UI framework                     |
| TailwindCSS | Styling                          |
| PostgreSQL  | Persistent database              |
| Neon        | Serverless PostgreSQL hosting    |
| Vercel      | Hosting & CI/CD                  |

---

## 🛠 Local Development / Локальний запуск

```bash
git clone https://github.com/RicConey/nkz.com.ua.git
cd nkz.com.ua
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure / Структура проєкту

```
/app
  /admin             → Admin interface
  /api/links         → API endpoint to create short links
  /[slug]/page.tsx   → Dynamic route that handles redirection
/components          → UI Components
/public              → Статичні ресурси (QR буде додано тут)
```

---

## 📡 API Overview / API Огляд

### POST /api/links

Create a new short link.

```json
{
  "slug": "my-link",
  "title": "Landing Page",
  "url": "https://example.com"
}
```

---

## 🚫 QR-коди

QR code generation is not yet implemented, but planned.  
Генерація QR-кодів ще не реалізована, але запланована.

---

## 🙋‍♂️ Author / Автор

**Andrii Liakh** — [github.com/RicConey](https://github.com/RicConey)

---

## 🌍 License / Ліцензія

MIT License — вільне використання з зазначенням авторства.