import { AppLogo } from "./app-logo";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <AppLogo />
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Fix My City. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
