# ELI10 - Explain Like I'm 10

A Next.js 14 application that provides explanations for any concept at different levels of understanding: ELI10 (Explain Like I'm 10), ELI18, and Expert. The app features a beautiful glassmorphism UI, mindmap visualization, and analytics tracking.

## Features

- **Multi-level Explanations**: Get explanations tailored to different knowledge levels
- **Mindmap Visualization**: View concepts as interactive mindmaps
- **Glassmorphism UI**: Modern, sleek interface with glassmorphism design
- **Analytics Dashboard**: Track user queries and engagement
- **Fully Serverless**: Deployable on Vercel without additional backend

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- OpenAI API key
- Supabase account and project

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
ADMIN_PASSWORD=your_admin_password_here
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL commands in `supabase_schema.sql` in the Supabase SQL editor to create the required tables

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

This project is ready to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add the environment variables in the Vercel project settings
4. Deploy

## Usage

- Enter any concept or topic in the search box
- Select your preferred explanation level (ELI10, ELI18, or Expert)
- Toggle between text explanation and mindmap visualization
- Access the admin panel at `/admin` using your admin password

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- OpenAI API
- Supabase
- React Flow (for mindmap visualization)