
"use client";

import type { Issue } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MapPin, Calendar, Award } from "lucide-react";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { useAuth } from "@/context/auth-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { isLoggedIn } = useAuth();
  const [votes, setVotes] = useState(issue.votes);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted) {
      setFormattedDate(new Date(issue.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    }
  }, [issue.createdAt, isMounted]);


  const handleVote = (amount: number) => {
    if (!isLoggedIn) return;
    setVotes(currentVotes => currentVotes + amount);
  };

  const getCategoryIcon = (category: Issue['category']) => {
    switch (category) {
      case 'Pothole': return '🚧';
      case 'Graffiti': return '🎨';
      case 'Streetlight Out': return '💡';
      case 'Trash': return '🗑️';
      case 'Water Logging': return '💧';
      default: return '❓';
    }
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'New':
        return 'border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'In Progress':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'Resolved':
        return 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return 'border-gray-500/50 bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 duration-300 group">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={issue.imageUrl} 
            alt={issue.title} 
            fill
            className="rounded-t-lg group-hover:scale-105 transition-transform duration-300 object-cover"
            data-ai-hint="issue report"
          />
           <Badge className={`absolute top-2 right-2 ${getStatusColor(issue.status)}`}>{issue.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-bold font-headline">{issue.title}</CardTitle>
            <Badge variant="secondary" className="whitespace-nowrap flex-shrink-0">{getCategoryIcon(issue.category)} {issue.category}</Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{issue.description}</p>
        <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0"/>
                <span>{issue.location.address}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0"/>
                {isMounted && formattedDate ? (
                  <span>Reported on {formattedDate}</span>
                ) : (
                  <Skeleton className="h-4 w-40" />
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 p-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 relative">
            <AvatarImage src={issue.reporter.avatarUrl} data-ai-hint="person avatar" />
            <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
            {issue.reporter.isTopCitizen && <Award className="absolute -bottom-1 -right-1 w-5 h-5 text-yellow-500 fill-yellow-400" />}
          </Avatar>
          <span className="text-sm font-medium">{issue.reporter.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" onClick={() => handleVote(1)} disabled={!isLoggedIn}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              {!isLoggedIn && (
                <TooltipContent>
                  <p>Please login to vote</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <span className="font-bold text-lg text-primary w-10 text-center">{votes}</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" onClick={() => handleVote(-1)} disabled={!isLoggedIn}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              {!isLoggedIn && (
                <TooltipContent>
                  <p>Please login to vote</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}
