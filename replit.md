# HydroTerra Lab - Water & Food Systems Research

## Overview

HydroTerra Lab is a research laboratory website at UPEI (University of Prince Edward Island) that advances data-driven research on water and food systems using satellite remote sensing and geospatial analytics. The lab develops models of soil moisture, drought, food security, and agricultural water stress, translating Earth observations into actionable insights for governments, farmers, and communities. The platform showcases research areas, publications, team members, and news updates, with a contact form for prospective collaborators and students.

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