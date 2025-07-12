
'use client';

import { useState, useEffect } from 'react';
import type { User, Issue } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Shield, HardHat, Heart, Star, MapPin, Calendar, ThumbsUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IssueCard } from '@/components/issue-card';
import { Skeleton } from '@/components/ui/skeleton';

const badgeIcons = {
  'Top Citizen': Shield,
  'First Report': Award,
  'Pothole Pro': HardHat,
  'Community Hero': Star,
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [reportedIssues, setReportedIssues] = useState<Issue[]>([]);
  const [votedIssues, setVotedIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch data for the logged-in user.
    const fetchData = async () => {
        setLoading(true);
        // const { data: userData } = await supabase.auth.getUser();
        // const { data: profileData } = await supabase.from('users').select('*, badges(*)').eq('id', userData.user.id).single();
        // const { data: reportedData } = await supabase.from('issues').select('*').eq('reporter_id', userData.user.id);
        // set user, reportedIssues, etc.
        setTimeout(() => setLoading(false), 1000);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Skeleton className="h-32 w-full mb-8" />
            <Skeleton className="h-10 w-1/2 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
            </div>
        </div>
    )
  }

  if (!user) {
    return <div className="text-center py-16">Could not load user profile. Please try again.</div>;
  }

  return (
    <div className="bg-muted/40">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Card className="mb-8 shadow-lg overflow-hidden">
                <div className="bg-card p-6 md:p-8">
                     <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary shadow-md">
                            <AvatarImage src={user.avatarUrl} data-ai-hint="person avatar" />
                            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold font-headline">{user.name}</h1>
                            <p className="text-muted-foreground">Joined on {new Date().toLocaleDateString()}</p>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                               <div className="text-center">
                                    <p className="text-2xl font-bold">{user.reportedIssues}</p>
                                    <p className="text-sm text-muted-foreground">Reports</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{user.totalVotes}</p>
                                    <p className="text-sm text-muted-foreground">Votes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-muted/50 p-4">
                    <h3 className="font-semibold text-lg mb-3 px-2">Badges</h3>
                     <div className="flex flex-wrap gap-4">
                        {user.badges.length > 0 ? (
                            <TooltipProvider>
                                {user.badges.map(badge => (
                                <Tooltip key={badge.name}>
                                    <TooltipTrigger>
                                        <div className="p-3 bg-background rounded-full border shadow-sm hover:bg-accent transition-colors">
                                            <badge.icon className="h-8 w-8 text-accent-foreground" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-bold">{badge.name}</p>
                                        <p>{badge.description}</p>
                                    </TooltipContent>
                                </Tooltip>
                                ))}
                            </TooltipProvider>
                        ) : (
                            <p className="text-muted-foreground text-sm px-2">No badges earned yet. Keep contributing!</p>
                        )}
                    </div>
                </div>
            </Card>

            <Tabs defaultValue="reported">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="reported">Issues Reported</TabsTrigger>
                    <TabsTrigger value="voted">Issues Voted On</TabsTrigger>
                </TabsList>
                <TabsContent value="reported">
                    {reportedIssues.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {reportedIssues.map(issue => (
                                <IssueCard key={issue.id} issue={issue} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16 bg-card rounded-lg mt-6">
                            <h2 className="text-2xl font-semibold">No Issues Reported Yet</h2>
                            <p className="text-muted-foreground mt-2">Start making an impact by reporting your first issue!</p>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="voted">
                     {votedIssues.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {votedIssues.map(issue => (
                                <IssueCard key={issue.id} issue={issue} />
                            ))}
                        </div>
                     ) : (
                        <div className="text-center py-16 bg-card rounded-lg mt-6">
                            <h2 className="text-2xl font-semibold">No Voted Issues</h2>
                            <p className="text-muted-foreground mt-2">Upvote issues on the main page to help prioritize them.</p>
                        </div>
                     )}
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
