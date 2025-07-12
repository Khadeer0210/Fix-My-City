
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppLogo } from "@/components/app-logo";
import { AuthButton } from "@/components/auth-button";
import { Bell, Home, Menu, Megaphone, List, Trophy } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { NotificationPanel } from "./notification-panel";
import { useState, useEffect } from "react";
import type { Notification } from "@/types";
import { useAuth } from "@/context/auth-context";

export function AppHeader() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // In a real app, you would fetch notifications from Supabase
    // and subscribe to real-time updates.
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" prefetch={true}>
            <AppLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" prefetch={true} className="text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/issues" prefetch={true} className="text-muted-foreground transition-colors hover:text-foreground">
              All Issues
            </Link>
             <Link href="/leaderboard" prefetch={true} className="text-muted-foreground transition-colors hover:text-foreground">
              Leaderboard
            </Link>
            <Link href={isLoggedIn ? "/report" : "/login"} prefetch={true} className="text-muted-foreground transition-colors hover:text-foreground">
              Report Issue
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:inline-flex relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                     <span className="absolute top-0 right-0 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-screen max-w-md p-0">
                 <NotificationPanel notifications={notifications} onNotificationsChange={setNotifications} />
              </PopoverContent>
            </Popover>

            <div className="hidden md:block">
              <AuthButton />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm p-0">
                 <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <AppLogo />
                  </div>
                  <nav className="flex flex-col gap-4 p-4 text-lg font-medium">
                    <Link href="/" prefetch={true} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                      <Home className="w-5 h-5" /> Home
                    </Link>
                    <Link href="/issues" prefetch={true} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                      <List className="w-5 h-5" /> All Issues
                    </Link>
                    <Link href="/leaderboard" prefetch={true} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                      <Trophy className="w-5 h-5" /> Leaderboard
                    </Link>
                    <Link href={isLoggedIn ? "/report" : "/login"} prefetch={true} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                      <Megaphone className="w-5 h-5" /> Report Issue
                    </Link>
                  </nav>
                  <div className="p-4 border-b flex-grow">
                     <NotificationPanel notifications={notifications} onNotificationsChange={setNotifications} />
                  </div>
                  <div className="mt-auto p-4 border-t">
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
