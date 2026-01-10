import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type News, type Publication, type TeamMember, type ResearchArea } from "@shared/routes";
import { z } from "zod";

// --- NEWS ---
export function useNewsList() {
  return useQuery({
    queryKey: [api.news.list.path],
    queryFn: async () => {
      const res = await fetch(api.news.list.path);
      if (!res.ok) throw new Error("Failed to fetch news");
      return api.news.list.responses[200].parse(await res.json());
    },
  });
}

export function useNewsItem(id: number) {
  return useQuery({
    queryKey: [api.news.get.path, id],
    queryFn: async () => {
      const url = api.news.get.path.replace(':id', String(id));
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch news item");
      return api.news.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// --- PUBLICATIONS ---
export function usePublications() {
  return useQuery({
    queryKey: [api.publications.list.path],
    queryFn: async () => {
      const res = await fetch(api.publications.list.path);
      if (!res.ok) throw new Error("Failed to fetch publications");
      return api.publications.list.responses[200].parse(await res.json());
    },
  });
}

// --- TEAM ---
export function useTeam() {
  return useQuery({
    queryKey: [api.team.list.path],
    queryFn: async () => {
      const res = await fetch(api.team.list.path);
      if (!res.ok) throw new Error("Failed to fetch team members");
      return api.team.list.responses[200].parse(await res.json());
    },
  });
}

// --- RESEARCH ---
export function useResearchAreas() {
  return useQuery({
    queryKey: [api.research.list.path],
    queryFn: async () => {
      const res = await fetch(api.research.list.path);
      if (!res.ok) throw new Error("Failed to fetch research areas");
      return api.research.list.responses[200].parse(await res.json());
    },
  });
}

export function useResearchArea(slug: string) {
  return useQuery({
    queryKey: [api.research.get.path, slug],
    queryFn: async () => {
      const url = api.research.get.path.replace(':slug', slug);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch research area");
      return api.research.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// --- CONTACT ---
export function useContact() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.contact.create.input>) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
  });
}
