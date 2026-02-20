# Resume Builder

An AI-powered resume builder web application that lets users create, customize, and share professional resumes with ease.

## Features

- **Authentication** — Secure sign-in via [Clerk](https://clerk.com/)
- **Resume Management** — Create, edit, delete, and view resumes from a personal dashboard
- **Step-by-step Form** — Guided form sections for Personal Details, Summary, Experience, Education, and Skills
- **AI-Powered Content** — Generate professional summaries and work experience descriptions using Google Gemini AI
- **Live Preview** — Real-time resume preview as you fill in the form
- **Theme Customization** — Pick from 20 color themes to personalize your resume
- **Download & Share** — Print/download your resume as a PDF or share via a unique link
- **Rich Text Editor** — WYSIWYG editor for experience work summaries

## Tech Stack

**Frontend**
- React 19 + Vite 7
- Tailwind CSS v4
- shadcn/ui (Radix UI primitives)
- React Router DOM v7
- Clerk (authentication)
- Google Gemini AI (`@google/genai`)
- Sonner (toast notifications)
- `react-simple-wysiwyg` (rich text editor)
- `@smastrom/react-rating` (skill rating)
- `react-web-share` (share functionality)

**Backend**
- [Strapi](https://strapi.io/) v5 (headless CMS / REST API)
- PostgreSQL database

## Project Structure

```
├── Resume Builder/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── auth/            # Clerk sign-in page
│   │   ├── components/      # Shared UI components
│   │   ├── context/         # Resume context provider
│   │   ├── pages/
│   │   │   ├── dashboard/   # Dashboard, resume card, forms, preview
│   │   │   └── home/        # Landing page
│   │   └── services/        # API client (Axios) & Gemini AI
│   └── ...
└── strapi-server/           # Backend (Strapi + PostgreSQL)
    └── src/
        ├── api/user-resume/ # Resume collection type
        └── components/      # Experience, Education, Skill components
```

## Getting Started

### Prerequisites

- Node.js >= 20
- PostgreSQL database

### Environment Variables

**Frontend** — create `Resume Builder/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRAPI_API_KEY=your_strapi_api_token
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_BASE_URL=http://localhost:5173
```

**Backend** — create `strapi-server/.env` (see `.env.example`):
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_db
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_password
```

### Installation & Running

**Backend (Strapi):**
```bash
cd strapi-server
npm install
npm run develop
```

**Frontend (React):**
```bash
cd "Resume Builder"
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the Strapi admin panel at `http://localhost:1337/admin`.

## Usage

1. Sign in with your account (powered by Clerk)
2. From the dashboard, click **+** to create a new resume
3. Fill in each section using the step-by-step form — use **Generate from AI** buttons for suggestions
4. Preview updates in real time on the right side
5. On the final step, download your resume as a PDF or share the unique link
