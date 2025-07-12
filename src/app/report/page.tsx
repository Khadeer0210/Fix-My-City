
"use client";

import { ReportForm } from '@/components/report-form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { Megaphone, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function ReportIssuePage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Megaphone className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold font-headline">Report a New Issue</h1>
          <p className="text-muted-foreground mt-2">
            Your report helps improve our city. Please provide as much detail as possible.
          </p>
        </div>
        
        {isLoggedIn ? (
          <ReportForm />
        ) : (
          <div className="text-center py-16 bg-card rounded-lg border">
            <h2 className="text-2xl font-semibold">Please Login to Report an Issue</h2>
            <p className="text-muted-foreground mt-2 mb-6">You need to be logged in to contribute to our community.</p>
            <Button asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login or Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
