import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="bg-destructive/10 text-destructive w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-bold font-display text-foreground">404 Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="pt-6">
          <Link href="/">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg active:scale-95">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
