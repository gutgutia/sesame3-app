# Sesame3 — College Prep, Reimagined

One platform. Everything you need—programs, deadlines, strategy—personalized to you.

## Project Structure

This monorepo contains all Sesame3 projects:

```
sesame3/
├── 01_website/       # Marketing website (Next.js 15)
├── 02_app/           # Main application (Next.js 15)
├── marketing/        # Brand voice, design system docs
├── sample-student-profiles/  # Test student profiles
└── docs/             # Documentation (coming soon)
```

## Tech Stack

### Marketing Website (`/01_website`)
- Next.js 15
- Tailwind CSS v4
- TypeScript
- Fonts: Bebas Neue, DM Sans, JetBrains Mono

### Application (`/02_app`)
- Next.js 15
- Tailwind CSS v4
- TypeScript
- Fonts: Bebas Neue, DM Sans, JetBrains Mono
- Database: PostgreSQL (planned)
- Auth: TBD

## Getting Started

### Marketing Website

```bash
cd 01_website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Application

```bash
cd 02_app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (use different port with `npm run dev -- -p 3001` if running both)

## Design System

- **Primary Accent:** Cyan (`#00E5FF`)
- **Typography:** Bebas Neue (display), DM Sans (body), JetBrains Mono (data)
- **Theme:** Dark mode

## Deployment

- **Marketing site:** DigitalOcean App Platform (planned: `sesame3.com`)
- **Application:** DigitalOcean App Platform (planned: `sesame3.com/app`)

## License

Private — All rights reserved.

