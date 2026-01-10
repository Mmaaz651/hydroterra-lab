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
      title: "Disease Modeling",
      description: "We design and deploy AI and mathematical methodologies to enhance public health preparedness and response to emerging and re-emerging infectious disease outbreaks.",
      slug: "disease-modeling",
      imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Aquatic Ecosystem Dynamics",
      description: "Investigating and mitigating the impact of environmental parameters on aquatic ecosystems using AI and mathematical methodologies.",
      slug: "aquatic-ecosystem-dynamics",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80"
    });
    await storage.createResearchArea({
      title: "Oil Sands GHG Emissions",
      description: "Developing methodologies to estimate and forecast greenhouse gas emissions from Oil sands tailings ponds and End Pit Lakes.",
      slug: "oil-sands-ghg-emissions",
      imageUrl: "https://images.unsplash.com/photo-1611273426761-53c8577a3c97?auto=format&fit=crop&q=80"
    });

    // Team
    await storage.createTeamMember({
      name: "Jude Kong",
      role: "Executive Director",
      bio: "Executive Director: Africa-Canada AI & Data Innovation Consortium; Artificial Intelligence & Math Modelling lab (AIMM lab). Expert in AI, data science, Math Modelling & Math Education.",
      imageUrl: "https://images.sociablekit.com/icons/sk-linkedin-profile-user.png",
      linkedin: "https://www.linkedin.com/in/dzevela/"
    });

    // News
    await storage.createNews({
      title: "Exciting Opportunity for Aspiring Postdocs!",
      content: "The Canada Postdoctoral Research Award Program is now open—a fantastic opportunity to join AIMMLab for a 2-year fully funded postdoctoral position. Award Amount: $70,000/year.",
      date: new Date("2025-06-01"),
      sourceUrl: "https://aimmlab.org"
    });
    await storage.createNews({
      title: "New Publication on COVID-19 Impact",
      content: "Disproportionate impact of the COVID-19 pandemic on socially vulnerable communities: The case of Jane and Finch in Toronto, Ontario.",
      date: new Date("2025-06-15"),
      sourceUrl: "https://aimmlab.org"
    });

    // Publications
    await storage.createPublication({
      title: "Disproportionate impact of the COVID-19 pandemic on socially vulnerable communities",
      authors: "Jude Kong, Zahra Movahedi Nia, Cheryl Prescod, et al.",
      year: 2025,
      venue: "Journal of Public Health",
      abstract: "Analyzing trends in COVID-19 cases, hospitalizations, and mortality in Jane and Finch community."
    });
    await storage.createPublication({
      title: "Environmental Semantic Clustering-Guided Multimodal Fusion for Enhanced Interpretability in Methane Emission Prediction",
      authors: "AIMMLab Team",
      year: 2025,
      venue: "Preprint",
      link: "https://lnkd.in/gmCj2rvu"
    });
  }
}
