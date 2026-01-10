import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Research from "@/pages/Research";
import ResearchDetail from "@/pages/ResearchDetail";
import Publications from "@/pages/Publications";
import Team from "@/pages/Team";
import News from "@/pages/News";
import JoinUs from "@/pages/JoinUs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/research" component={Research} />
          <Route path="/research/:slug" component={ResearchDetail} />
          <Route path="/publications" component={Publications} />
          <Route path="/team" component={Team} />
          <Route path="/news" component={News} />
          <Route path="/join-us" component={JoinUs} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
