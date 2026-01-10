import { 
  users, news, publications, teamMembers, researchAreas, contactMessages,
  type News, type Publication, type TeamMember, type ResearchArea, type ContactMessage,
  type InsertNews, type InsertPublication, type InsertTeamMember, type InsertResearchArea, type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // News
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNews(item: InsertNews): Promise<News>;

  // Publications
  getPublications(): Promise<Publication[]>;
  createPublication(item: InsertPublication): Promise<Publication>;

  // Team
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(item: InsertTeamMember): Promise<TeamMember>;

  // Research
  getResearchAreas(): Promise<ResearchArea[]>;
  getResearchAreaBySlug(slug: string): Promise<ResearchArea | undefined>;
  createResearchArea(item: InsertResearchArea): Promise<ResearchArea>;

  // Contact
  createContactMessage(item: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  // News
  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(news.date);
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }

  async createNews(item: InsertNews): Promise<News> {
    const [newItem] = await db.insert(news).values(item).returning();
    return newItem;
  }

  // Publications
  async getPublications(): Promise<Publication[]> {
    return await db.select().from(publications).orderBy(publications.year);
  }

  async createPublication(item: InsertPublication): Promise<Publication> {
    const [newItem] = await db.insert(publications).values(item).returning();
    return newItem;
  }

  // Team
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async createTeamMember(item: InsertTeamMember): Promise<TeamMember> {
    const [newItem] = await db.insert(teamMembers).values(item).returning();
    return newItem;
  }

  // Research
  async getResearchAreas(): Promise<ResearchArea[]> {
    return await db.select().from(researchAreas);
  }

  async getResearchAreaBySlug(slug: string): Promise<ResearchArea | undefined> {
    const [area] = await db.select().from(researchAreas).where(eq(researchAreas.slug, slug));
    return area;
  }

  async createResearchArea(item: InsertResearchArea): Promise<ResearchArea> {
    const [newItem] = await db.insert(researchAreas).values(item).returning();
    return newItem;
  }

  // Contact
  async createContactMessage(item: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(item).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
