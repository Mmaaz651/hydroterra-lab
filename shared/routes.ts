import { z } from 'zod';
import { 
  insertNewsSchema, 
  insertPublicationSchema, 
  insertTeamMemberSchema, 
  insertResearchAreaSchema, 
  insertContactMessageSchema,
  news,
  publications,
  teamMembers,
  researchAreas
} from './schema';

export const api = {
  news: {
    list: {
      method: 'GET' as const,
      path: '/api/news',
      responses: {
        200: z.array(z.custom<typeof news.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/news/:id',
      responses: {
        200: z.custom<typeof news.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  publications: {
    list: {
      method: 'GET' as const,
      path: '/api/publications',
      responses: {
        200: z.array(z.custom<typeof publications.$inferSelect>()),
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team',
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
  },
  research: {
    list: {
      method: 'GET' as const,
      path: '/api/research',
      responses: {
        200: z.array(z.custom<typeof researchAreas.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/research/:slug',
      responses: {
        200: z.custom<typeof researchAreas.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactMessageSchema,
      responses: {
        201: z.object({ message: z.string() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
