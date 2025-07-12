
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Award, TrendingUp, BarChart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this from Supabase.
    // For now, we use mock data.
    const fetchUsers = async () => {
      setLoading(true);
      // const { data } = await supabase.from('users').select('*').order('totalVotes', { ascending: false });
      // setUsers(data || []);
      // Simulate loading and set mock data
      setTimeout(() => {
          setLoading(false);
      }, 1000);
    };
    fetchUsers();
  }, []);

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-yellow-700';
    return 'text-muted-foreground';
  };

  const renderSkeleton = () => (
    Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={`skeleton-${i}`}>
        <TableCell><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
        <TableCell className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
        </TableCell>
        <TableCell><Skeleton className="h-5 w-12" /></TableCell>
        <TableCell><Skeleton className="h-5 w-12" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
             <Trophy className="w-8 h-8" />
          </div>
          Community Leaderboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Recognizing the most active and impactful citizens in our community.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Citizens</CardTitle>
          <CardDescription>Ranked by reports submitted and votes received.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Citizen</TableHead>
                <TableHead><BarChart className="inline-block mr-1 h-4 w-4" /> Reports</TableHead>
                <TableHead><TrendingUp className="inline-block mr-1 h-4 w-4" /> Total Votes</TableHead>
                <TableHead><Award className="inline-block mr-1 h-4 w-4" /> Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? renderSkeleton() : users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className={`text-xl font-bold ${getRankColor(index + 1)}`}>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} data-ai-hint="person avatar" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-center">{user.reportedIssues}</TableCell>
                  <TableCell className="font-medium text-center">{user.totalVotes}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {user.badges.slice(0, 3).map(badge => (
                         <Badge key={badge.name} variant="secondary" className="group relative border">
                            <badge.icon className="h-4 w-4" />
                            <span className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {badge.name}: {badge.description}
                            </span>
                        </Badge>
                    ))}
                    {user.badges.length > 3 && <span className="text-xs text-muted-foreground">+{user.badges.length - 3} more</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
