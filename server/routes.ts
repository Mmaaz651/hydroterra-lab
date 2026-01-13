import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // News Routes
  app.get(api.news.list.path, async (req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  app.get(api.news.get.path, async (req, res) => {
    const item = await storage.getNewsItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    res.json(item);
  });

  // Publications Routes
  app.get(api.publications.list.path, async (req, res) => {
    const pubs = await storage.getPublications();
    res.json(pubs);
  });

  // Team Routes
  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  // Research Routes
  app.get(api.research.list.path, async (req, res) => {
    const areas = await storage.getResearchAreas();
    res.json(areas);
  });

  app.get(api.research.get.path, async (req, res) => {
    const area = await storage.getResearchAreaBySlug(req.params.slug);
    if (!area) {
      return res.status(404).json({ message: 'Research area not found' });
    }
    res.json(area);
  });

  // Contact Routes
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingResearch = await storage.getResearchAreas();
  if (existingResearch.length === 0) {
    // Research Areas
    await storage.createResearchArea({
      title: "Precision Agriculture",
      description: "We design and deploy AI and mathematical methodologies to optimize crop yields and resource usage in modern farming.",
      slug: "precision-agriculture",
      imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Soil Moisture Analytics",
      description: "Investigating spatial soil moisture patterns using remote sensing and sensor networks to improve irrigation efficiency.",
      slug: "soil-moisture-analytics",
      imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Precipitation Forecasting",
      description: "Developing high-resolution spatial models to forecast precipitation patterns and their impact on agricultural water management.",
      slug: "precipitation-forecasting",
      imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Spatial Data Portals",
      description: "Open-access spatial data platforms providing real-time agricultural and environmental monitoring data, including soil moisture and precipitation maps.",
      slug: "spatial-data",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
    });

    // Team
    await storage.createTeamMember({
      name: "Jude Kong",
      role: "Executive Director",
      bio: "Expert in AI-driven sustainable agriculture and mathematical modelling of environmental systems. Leading initiatives in spatial data analytics.",
      imageUrl: "https://images.sociablekit.com/icons/sk-linkedin-profile-user.png",
      linkedin: "https://www.linkedin.com/in/dzevela/"
    });

    // News
    await storage.createNews({
      title: "New Spatial Data Portal Launched",
      content: "We are excited to announce the launch of our new open-access portal for agricultural spatial data, including real-time soil moisture and precipitation maps.",
      date: new Date("2025-06-01"),
      sourceUrl: "https://aimmlab.org"
    });

    // Publications
    await storage.createPublication({
      title: "Integrating Spatial Sensor Networks for Precision Soil Moisture Mapping",
      authors: "Jude Kong, et al.",
      year: 2025,
      venue: "Sustainable Agriculture Journal",
      abstract: "This paper explores the use of multimodal data fusion for high-resolution soil moisture estimation."
    });
  }
}
