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
      title: "Soil Moisture Modeling",
      description: "Advanced remote sensing models for mapping and predicting soil moisture across agricultural landscapes using satellite observations and machine learning.",
      slug: "soil-moisture",
      imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Drought Monitoring",
      description: "Real-time drought detection and forecasting using satellite observations, climate data, and geospatial analytics to support early warning systems.",
      slug: "drought-monitoring",
      imageUrl: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Food Security",
      description: "Geospatial analysis of crop health, yield prediction, and food system resilience to support governments and communities in food security planning.",
      slug: "food-security",
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Agricultural Water Stress",
      description: "Satellite-based monitoring of water stress indicators for irrigation management and agricultural water resource optimization.",
      slug: "water-stress",
      imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?auto=format&fit=crop&q=80"
    });

    // Team
    await storage.createTeamMember({
      name: "Sara Sadri, Ph.D., P.Eng., C.R.C.",
      role: "Canada Research Chair in Remote Sensing and Water Security",
      bio: "Associate Professor of Climate Change and Adaptation. Expert in remote sensing hydrology, statistical data science, climate change impacts, and water and food security, with extensive experience in AI-driven analysis of large-scale environmental and socio-economic data.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/in/sara-sadri-ab5370164/"
    });

    // News
    await storage.createNews({
      title: "New Satellite-Based Soil Moisture Dataset Released",
      content: "We are excited to announce the release of our high-resolution soil moisture dataset covering agricultural regions, derived from satellite remote sensing observations.",
      date: new Date("2025-06-01"),
      sourceUrl: "https://hydroterra.org"
    });

    // Publications
    await storage.createPublication({
      title: "Satellite Remote Sensing for Agricultural Drought Monitoring: A Multi-Sensor Approach",
      authors: "Jude Kong, et al.",
      year: 2025,
      venue: "Remote Sensing of Environment",
      abstract: "This paper explores the integration of multiple satellite sensors for improved drought detection and agricultural water stress assessment."
    });
  }
}
