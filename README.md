# Frédérick Kranjec-Larose — Portfolio

Personal portfolio website built with React + Vite. Showcases work experience, projects, certifications, and a contact form connected to Supabase. Includes a hidden admin back office for managing messages.

**Live URL:** https://kranjec023.github.io

---

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Author](#author)

---

## Project Description

A fully responsive personal portfolio website for Frédérick Kranjec-Larose — a finance professional transitioning into full-stack development. The site includes:

- **Home** — Landing page with a personal introduction
- **Portfolio** — Work experience, education, certifications, and projects
- **Links** — Curated list of external profiles and resources
- **Contact** — Contact form with Supabase backend storage
- **Back Office** — Hidden admin dashboard to view and delete contact messages (requires login)
- **Light / Dark Mode** — Theme toggle with `localStorage` persistence
- **i18n** — English, French, and German language support

---

## Tech Stack

| Category        | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | React 18, Vite                      |
| Routing         | React Router DOM (HashRouter)       |
| Database / Auth | Supabase (PostgreSQL + Auth)        |
| Styling         | CSS custom properties (no framework)|
| i18n            | Custom JSON translation system      |
| Deployment      | GitHub Pages via GitHub Actions     |

---

## Project Structure

```
16_ProfessionalDevelopment/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/               # Images, resume PDF, logos
│   ├── components/           # Shared components (Header, Footer, etc.)
│   ├── context/              # React context providers
│   │   ├── ThemeContext.jsx   # Light/dark mode context
│   │   └── LanguageContext.jsx # i18n context
│   ├── hooks/                # Custom hooks
│   │   ├── useTheme.js
│   │   └── useLanguage.js
│   ├── i18n/                 # Translation files
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── de.json
│   ├── lib/
│   │   └── supabaseClient.js # Supabase client initialization
│   ├── pages/                # One file per route
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Links.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx         # Hidden admin login
│   │   └── BackOffice.jsx    # Protected admin dashboard
│   ├── styles/               # One CSS file per page/component
│   ├── App.jsx               # Route definitions
│   └── main.jsx              # App entry point
├── ai/
│   └── features/             # AI feature specification documents
├── .env                      # Local environment variables (not committed)
├── .env.example              # Example environment variables
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm 9+
- A [Supabase](https://supabase.com) account and project

### 1. Clone the repository

```bash
git clone https://github.com/Kranjec023/Kranjec023.github.io.git
cd 16_ProfessionalDevelopment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env` (see [Environment Variables](#environment-variables)).

### 4. Set up Supabase

Run the following SQL in your Supabase **SQL Editor**:

```sql
create table messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamp with time zone default now()
);
```

Enable **Row Level Security** and allow anonymous inserts:

```sql
alter table messages enable row level security;

create policy "Allow anon insert"
  on messages for insert
  to anon
  with check (true);

create policy "Allow admin select"
  on messages for select
  to authenticated
  using (true);

create policy "Allow admin delete"
  on messages for delete
  to authenticated
  using (true);
```

### 5. Create admin user

1. Go to your Supabase project → **Authentication → Users**
2. Click **Add user** and create an admin email/password
3. This account is used to log in to `/login` — it is never created via the app

### 6. Run locally

```bash
npm run dev
# http://localhost:5173
```

### 7. Build for production

```bash
npm run build
# Output: dist/
```

---

## Environment Variables

Create a `.env` file at the root of the project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

| Variable                 | Description                                      |
|--------------------------|--------------------------------------------------|
| `VITE_SUPABASE_URL`      | Your Supabase project URL                        |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase public anon key (safe for frontend)|

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

Both values are found in your Supabase project under **Settings → API**.

---

## API Documentation

This project does not expose a custom REST API. All backend operations go through the **Supabase client SDK** (`src/lib/supabaseClient.js`).

### Supabase Operations Used

| Operation | Table      | Trigger                              | Auth Required |
|-----------|------------|--------------------------------------|---------------|
| `INSERT`  | `messages` | Contact form submission              | No (anon)     |
| `SELECT`  | `messages` | Back Office page load                | Yes           |
| `DELETE`  | `messages` | Delete button in Back Office         | Yes           |
| `signInWithPassword` | Auth | Login form submission     | No            |
| `signOut` | Auth       | Logout button in Back Office         | Yes           |
| `getSession` | Auth    | Auth guard on `/backoffice` and `/login` | No         |

### Contact Form Payload

```json
{
  "name":    "John Smith",
  "email":   "john@example.com",
  "message": "Hello, I'd like to connect."
}
```

### `messages` Table Schema

| Column       | Type        | Notes                        |
|--------------|-------------|------------------------------|
| `id`         | uuid        | Auto-generated primary key   |
| `name`       | text        | Sender's name                |
| `email`      | text        | Sender's email               |
| `message`    | text        | Full message body            |
| `created_at` | timestamptz | Auto-set on insert           |

---

## Author

**Frédérick Kranjec-Larose**
Full-Stack Developer · Finance Professional
Montreal, QC, Canada

- 📧 fredkranjec@gmail.com
- 💼 [linkedin.com/in/frédérick-kranjec-larose-052835110](https://www.linkedin.com/in/frédérick-kranjec-larose-052835110)
- 🐙 [github.com/Kranjec023](https://github.com/Kranjec023)

### LinkedIn Profile — Recent Update

Updated my LinkedIn profile to reflect my transition from finance to full-stack development. Added the **CodeBoxx Full-Stack Web Development Bootcamp** to the Education section, updated the headline to **Full-Stack Developer · Finance Professional**, and added this portfolio project under the Featured section with a direct link to the live site.

---

## Deployment

Deployment is automated via **GitHub Actions** on every push to `main`. The workflow builds the project and pushes the `dist/` folder to GitHub Pages.

To enable:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**

The live site is available at: **https://kranjec023.github.io**