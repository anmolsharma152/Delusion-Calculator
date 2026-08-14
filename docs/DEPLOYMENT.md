# Deployment Guide

The Delusion Calculator is optimized for deployment on Vercel, given its Next.js architecture.

## Vercel Deployment Instructions

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project**.
4. Import your repository.
5. Vercel will automatically detect the Next.js framework.
6. Click **Deploy**.

## Environment Variables

For Phase 1 (MVP), no environment variables are strictly required. 

For Phase 2 (AI Integration), add the following to your Vercel project settings:

```env
# Phase 2: Gemini AI Integration
GEMINI_API_KEY=your_gemini_api_key_here

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Build Commands

Vercel automatically configures these, but for reference or manual CI/CD:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Start Command**: `npm run start`

## Custom Domain Setup

1. In the Vercel Project dashboard, go to **Settings** > **Domains**.
2. Enter your custom domain (e.g., `delusioncalculator.com`).
3. Follow the instructions to configure your DNS settings (add the provided A Record or CNAME to your domain registrar).
4. Vercel will automatically provision a free SSL certificate.

## Performance Monitoring

- Utilize **Vercel Analytics** to track First Contentful Paint (FCP) and Cumulative Layout Shift (CLS) scores, crucial for the interactive calculator.
- Vercel Speed Insights can be enabled in the dashboard to monitor real-user metrics (RUM).

## CI/CD Pipeline Suggestion

If deploying outside of Vercel (e.g., AWS Amplify or GitHub Pages), ensure you have a GitHub Action configured:

```yaml
name: Next.js CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```
