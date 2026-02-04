# The Chosen Generation - Children's Bible School

A comprehensive web-based management system for children's Bible school ministry. Features child portals with assignments, weekly awards, tasks, prayer check-ins, attendance tracking, and joyful, premium micro-interactions.

## Features

### Public Website
- **Homepage** - Hero banner, programs overview, testimonials
- **About Us** - Mission, vision, leadership team, milestones
- **Programs** - Detailed curriculum for FS1, FS2, Leadership Training
- **Safeguarding** - Child protection policies and reporting procedures
- **Contact** - Contact form, location, social links

### Child Portal
- Weekly task dashboard with progress tracking
- Daily prayer and attendance check-ins
- Trophy room with animated badge displays
- "This Week's Journey" progress path visualization
- Reaction stickers (Amen, Clap, Heart, Praise, Star)
- Calm Mode toggle for reduced animations

### Parent Portal (Coming Soon)
- View child progress and awards
- Approve certain task submissions
- Manage child profile

### Teacher Dashboard (Coming Soon)
- Class roster management
- Create and assign weekly tasks
- Review submissions and award badges
- Export progress reports

### Admin Dashboard (Coming Soon)
- User management
- Class and enrollment management
- System settings

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Thechosengeneration.com
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Set up the database:
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the migration file: `supabase/migrations/001_initial_schema.sql`

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (portal)/         # Protected portal pages
│   │   ├── child/
│   │   ├── parent/
│   │   ├── teacher/
│   │   └── admin/
│   ├── (public)/         # Public website pages
│   │   ├── about/
│   │   ├── programs/
│   │   ├── contact/
│   │   ├── safeguarding/
│   │   └── gallery/
│   ├── api/              # API routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer, Navigation
│   ├── animations/       # Sparkles, Confetti, Bubbles
│   ├── forms/            # Form components
│   └── dashboard/        # Dashboard widgets
├── lib/
│   ├── supabase/         # Supabase client configuration
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
└── config/               # App configuration
```

## Database Schema

### Core Tables
- **users** - Parent, teacher, admin accounts
- **children** - Child profiles with PIN authentication
- **classes** - Class/group definitions
- **tasks** - Weekly assignments
- **submissions** - Task submissions
- **checkins** - Daily prayer/attendance check-ins
- **awards** - Earned badges and achievements
- **attendance** - Session attendance records
- **incidents** - Safeguarding incident reports
- **audit_logs** - Activity tracking

### Row Level Security (RLS)
All tables have RLS policies ensuring:
- Children can only view their own data
- Parents can view their children's data
- Teachers can view their class's data
- Admins have full access

## Animation System

The app features a "magical" UI with:
- **Bubbles**: Floating background bubbles, tap-burst effects
- **Sparkles**: Hover trails, celebration bursts
- **Confetti**: Milestone celebrations
- **Sticker Reactions**: Emoji reactions with particle effects

### Calm Mode
Users can enable "Calm Mode" to:
- Reduce particle count
- Disable confetti
- Slower transitions
- Respects `prefers-reduced-motion`

## Child Safety Features

- No public child profiles
- Display names show first name + initial only
- Parental consent workflow
- PIN-based child authentication
- No direct messaging between children
- Comprehensive safeguarding documentation
- Incident reporting system
- Audit logging

## Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Supabase types (requires Supabase CLI)
npm run db:generate

# Run seed script
npm run seed
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only) | No |

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted with Node.js

## License

Private - All rights reserved.

## Support

For questions or support, contact: info@thechosengeneration.org
