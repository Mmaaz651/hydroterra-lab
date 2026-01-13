# AIMMLab - AI for Sustainable Agriculture & Climate Resilience

## Overview

AIMMLab is a research laboratory website for the AI and Mathematical Modeling Lab at UPEI (University of Prince Edward Island). The platform showcases research in precision agriculture, soil moisture analytics, precipitation forecasting, and spatial data analysis. It serves as a public-facing site for displaying publications, team members, news updates, and research areas, with a contact form for prospective collaborators and students.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and reveals
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Development**: Hot module replacement via Vite middleware

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with Zod validation via drizzle-zod
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Migrations**: Drizzle Kit for schema migrations (`db:push` command)

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level page components
│   │   ├── hooks/        # Custom React hooks (data fetching)
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API endpoint definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Code shared between frontend and backend
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route definitions with Zod schemas
```

### Key Design Patterns
- **Shared Schema**: Database models and validation schemas shared between client and server
- **Type-Safe API**: Route definitions with Zod schemas for request/response validation
- **Storage Interface**: Abstract `IStorage` interface with `DatabaseStorage` implementation
- **Fallback Data**: Pages display hardcoded fallback content when database is empty

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connected via `pg` driver
- **Connection**: Requires `DATABASE_URL` environment variable

### UI/Styling
- **Google Fonts**: Inter (body) and Playfair Display (headings)
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Icon library

### Development Tools
- **Drizzle Kit**: Database migration and schema management
- **esbuild**: Production server bundling
- **Vite**: Frontend development and build

### External Assets
- **UPEI Logo**: Stored in `attached_assets/` directory
- **Placeholder Images**: Fallback to Unsplash URLs when database content is empty