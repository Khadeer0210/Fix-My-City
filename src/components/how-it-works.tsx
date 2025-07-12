
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera, Megaphone, ShieldCheck, Users, Wrench, CheckCircle } from "lucide-react";

export function HowItWorks() {
  return (
    <Card className="bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold font-headline">
          Make a Difference in 3 Simple Steps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-primary/10 text-primary rounded-full">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold">1. Spot & Snap</h3>
            <p className="text-muted-foreground">
              See a public issue? Take a photo with your phone. A picture is worth a thousand words.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-primary/10 text-primary rounded-full">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold">2. Report & Alert</h3>
            <p className="text-muted-foreground">
              Quickly fill out a simple form to report the issue. Your report alerts the community and local authorities.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-primary/10 text-primary rounded-full">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold">3. Track & Resolve</h3>
            <p className="text-muted-foreground">
              Community members vote on issues, and you can track the progress until it's resolved.
            </p>
          </div>
        </div>
        
        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
                <Wrench className="w-8 h-8 text-accent" />
                <p className="text-2xl font-bold">1,204</p>
                <p className="text-muted-foreground">Issues Resolved</p>
            </div>
             <div className="flex flex-col items-center gap-2">
                <Users className="w-8 h-8 text-accent" />
                <p className="text-2xl font-bold">852</p>
                <p className="text-muted-foreground">Active Citizens</p>
            </div>
             <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-accent" />
                <p className="text-2xl font-bold">15,000+</p>
                <p className="text-muted-foreground">Community Upvotes</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
