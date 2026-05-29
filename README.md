# Chandra Sekhar Yamparala — Portfolio

Modern personal portfolio site built with Next.js 15 (App Router) + TypeScript, Tailwind CSS, Framer Motion and small UI primitives.

Features
- Responsive single-page portfolio with hero, about, skills, projects, research, certifications, and contact sections
- Dark / light theme, animated UI, and simple visitor counter
- Serverless API routes for GitHub and LeetCode data (placeholders/fallbacks included)
- Resume download (replace `public/resume/Chandra_Sekhar_Yamparala_Resume.txt` with your PDF)

Quick start (developer)

```powershell
cd "D:\Chandra Portfolip"
npm install
npm run dev -- -p 3001
# Open http://localhost:3001
```

Build

```powershell
npm run build
npm start
```

Deploy
- Recommended: Deploy to Vercel (import the GitHub repo and set `NODE_ENV=production` if needed).

Replace / Customize
- Replace `public/images/profile.jpg` with your preferred photo
- Replace `public/resume/Chandra_Sekhar_Yamparala_Resume.txt` with a PDF and update links if needed

License
This project is licensed under the MIT License — see the `LICENSE` file.

Author: Chandra Sekhar Yamparala

Live Demo: [https://chandraportfolio-six.vercel.app/](https://chandraportfolio-six.vercel.app/)

Deploy: ![Vercel](https://img.shields.io/badge/deploy%20on-vercel-000?logo=vercel&logoColor=white)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
