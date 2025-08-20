# AffiliateSite - Next.js Affiliate Marketing Platform

A full-stack affiliate marketing application built with Next.js 18+, TypeScript, Prisma, and NextAuth.

## Features

- **Blog System**: Create and manage blog posts with categories
- **Affiliate Links**: Track and manage affiliate links with click analytics
- **User Authentication**: Secure login/register with NextAuth
- **Admin Dashboard**: Full CRUD operations for posts and links
- **Analytics**: Track link clicks and view performance metrics
- **SEO Optimized**: Dynamic metadata, sitemap, and robots.txt
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 18+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Credentials + Google)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd affiliate-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   ```

4. **Set up the database**

   ```bash
   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32

   # Run database migrations
   npx prisma migrate dev --name init

   # Seed the database
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin login: admin@example.com / admin123

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Public marketing pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Admin dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
└── middleware.ts          # Next.js middleware
```

## Database Schema

### Models

- **User**: Authentication and user management
- **Category**: Blog post categories
- **BlogPost**: Blog posts with content and metadata
- **AffiliateLink**: Affiliate links with click tracking

### Relationships

- User → BlogPost (one-to-many)
- Category → BlogPost (one-to-many)
- BlogPost → AffiliateLink (one-to-many)

## API Routes

### Authentication

- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### Posts

- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Links

- `GET /api/links` - List all links
- `POST /api/links` - Create new link
- `PUT /api/links/[id]` - Update link
- `DELETE /api/links/[id]` - Delete link

### Categories

- `GET /api/categories` - List all categories

## Key Features

### Blog System

- Create, edit, and delete blog posts
- Category organization
- SEO-friendly URLs with automatic slug generation
- Rich content support with markdown

### Affiliate Link Management

- Create and manage affiliate links
- Track click analytics
- Associate links with blog posts
- Automatic slug generation

### Analytics Dashboard

- Total posts and clicks overview
- Top performing links
- Interactive charts with Recharts
- Performance metrics

### SEO Features

- Dynamic metadata for all pages
- Automatic sitemap generation
- Robots.txt configuration
- Open Graph support

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable               | Description                  | Required |
| ---------------------- | ---------------------------- | -------- |
| `DATABASE_URL`         | PostgreSQL connection string | Yes      |
| `NEXTAUTH_URL`         | Your application URL         | Yes      |
| `NEXTAUTH_SECRET`      | Secret for JWT encryption    | Yes      |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID       | No       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret   | No       |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.
