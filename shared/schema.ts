import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  imageUrl: text("image_url"),
  sourceUrl: text("source_url"),
});

export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  venue: text("venue"),
  year: integer("year").notNull(),
  link: text("link"),
  abstract: text("abstract"),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  website: text("website"),
});

export const researchAreas = pgTable("research_areas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news).omit({ id: true });
export const insertPublicationSchema = createInsertSchema(publications).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertResearchAreaSchema = createInsertSchema(researchAreas).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

export type News = typeof news.$inferSelect;
export type Publication = typeof publications.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type ResearchArea = typeof researchAreas.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
