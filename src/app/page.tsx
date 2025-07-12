
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IssueCard } from "@/components/issue-card";
import type { Issue } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Award, Shield } from "lucide-react";
import Image from "next/image";
import { HowItWorks } from "@/components/how-it-works";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [trendingIssues, setTrendingIssues] = useState<Issue[]>([]);
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch data from Supabase here.
    // For now, we'll just simulate a loading state.
    const timer = setTimeout(() => {
      // For demonstration, we'll leave the arrays empty.
      // Replace this with your Supabase fetch logic.
      // e.g., const { data, error } = await supabase.from('issues').select('*');
      setLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div 
      className="flex flex-col gap-8 md:gap-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section className="bg-card border-b" variants={itemVariants}>
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">Found an issue? Let's fix it.</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Be a changemaker. Report garbage dumps, potholes, water logging, and other public issues to make your city better.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105 shadow-lg hover:shadow-accent/40">
              <Link href={isLoggedIn ? "/report" : "/login"} prefetch={true}>Report an Issue Now</Link>
            </Button>
             <Button asChild size="lg" variant="outline">
              <Link href="/login" prefetch={true} className="flex items-center gap-2">
                <Shield className="w-5 h-5"/> Admin Login
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <main className="container mx-auto px-4 space-y-12 pb-12">
        <motion.section variants={itemVariants}>
          <HowItWorks />
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-2">
            <Award className="w-8 h-8 text-accent" />
            Trending Issues
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64" />)}
            </div>
          ) : trendingIssues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingIssues.map(issue => (
                <Card key={issue.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300 group overflow-hidden">
                  <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">{issue.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video mb-2 overflow-hidden rounded-md">
                        <Image src={issue.imageUrl} alt={issue.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="issue image" />
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.category}</p>
                    </div>
                    <div className="flex items-center justify-end text-lg font-bold text-primary mt-2">
                      <ArrowUp className="w-5 h-5 mr-1" />
                      {issue.votes}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No trending issues at the moment.</p>
          )}
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold font-headline mb-6">Recent Reports</h2>
           {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-96" />)}
            </div>
           ) : recentIssues.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {recentIssues.map(issue => (
                <motion.div key={issue.id} variants={itemVariants}>
                  <IssueCard issue={issue} />
                </motion.div>
              ))}
            </motion.div>
           ) : (
            <p className="text-muted-foreground">No issues have been reported recently. Be the first!</p>
           )}
        </motion.section>
      </main>
    </motion.div>
  );
}
