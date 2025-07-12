
'use client';

import { useState, useEffect } from 'react';
import type { Issue, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Award, ChevronDown, Send, ShieldCheck, UserCheck, Users, ClipboardList, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeIssuesForOfficial } from '@/ai/flows/summarize-issues';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch data from Supabase here.
    const fetchData = async () => {
        setLoading(true);
        // const supabase = createClient(); // client-side
        // const { data: issuesData } = await supabase.from('issues').select('*, reporter:users(*)');
        // const { data: usersData } = await supabase.from('users').select('*');
        // setIssues(issuesData || []);
        // setUsers(usersData || []);
        setTimeout(() => setLoading(false), 1000); // Simulate loading
    };
    fetchData();
  }, []);

  const handleStatusChange = (issueId: string, status: Issue['status']) => {
    // This would now be a call to Supabase to update the issue.
    // e.g., await supabase.from('issues').update({ status }).eq('id', issueId)
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status } : issue
      )
    );
    toast({
      title: 'Status Updated',
      description: `Issue #${issueId} has been marked as ${status}.`,
    });
  };

  const handleAwardToggle = (userId: string) => {
    // This would be a call to Supabase to update the user.
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isTopCitizen: !user.isTopCitizen } : user
      )
    );
     toast({
      title: 'Citizen Status Updated!',
      description: `User status has been updated.`,
    });
  };
  
  const handleGenerateSummary = async () => {
    if (selectedIssues.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Issues Selected',
        description: 'Please select issues to include in the summary.',
      });
      return;
    }
    
    setIsSummarizing(true);
    setSummary('');
    try {
        const issuesToSummarize = issues.filter(issue => selectedIssues.includes(issue.id));
        const result = await summarizeIssuesForOfficial({ issues: issuesToSummarize.map(i => i.title) });
        setSummary(result.summary);
    } catch (error) {
        console.error('Failed to generate summary:', error);
        toast({
            variant: 'destructive',
            title: 'Summarization Failed',
            description: 'Could not generate summary. Please try again.',
        });
    } finally {
        setIsSummarizing(false);
    }
  };
  
  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500';
      case 'In Progress':
        return 'bg-yellow-500';
      case 'Resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderSkeleton = (rows: number, cells: number) => (
    Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: cells }).map((_, cellIndex) => (
          <TableCell key={cellIndex}><Skeleton className="h-6 w-full" /></TableCell>
        ))}
      </TableRow>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage issues, users, and communications.
        </p>
      </div>

      <Tabs defaultValue="issues">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="issues"><ClipboardList className="mr-2" /> Issue Management</TabsTrigger>
          <TabsTrigger value="users"><Users className="mr-2" /> User Management</TabsTrigger>
          <TabsTrigger value="contact"><Send className="mr-2" /> Contact Officials</TabsTrigger>
        </TabsList>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>All Reported Issues</CardTitle>
              <CardDescription>View and update the status of all reported issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? renderSkeleton(5, 6) : issues.map(issue => (
                    <TableRow key={issue.id}>
                      <TableCell>{issue.id}</TableCell>
                      <TableCell className="font-medium">{issue.title}</TableCell>
                      <TableCell>{issue.reporter.name}</TableCell>
                      <TableCell>{issue.votes}</TableCell>
                      <TableCell>
                        <Badge className={`text-white ${getStatusColor(issue.status)}`}>
                            <span className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(issue.status)}`}></span>
                            {issue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Update Status <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(issue.id, 'New')}>New</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(issue.id, 'In Progress')}>In Progress</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(issue.id, 'Resolved')}>Resolved</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View users and recognize outstanding citizens.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Top Citizen Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? renderSkeleton(5, 4) : users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        {user.isTopCitizen && <Badge variant="secondary" className="border-yellow-400"><Award className="mr-2 h-4 w-4 text-yellow-500" /> Top Citizen</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleAwardToggle(user.id)}>
                           <UserCheck className="mr-2 h-4 w-4" />
                           {user.isTopCitizen ? 'Remove Award' : 'Award Top Citizen'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Government Officials</CardTitle>
              <CardDescription>Generate and send a summary of high-priority issues to the relevant authorities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Select issues to include in the report:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {issues.filter(i => i.status !== 'Resolved').map(issue => (
                    <Button
                      key={issue.id}
                      variant={selectedIssues.includes(issue.id) ? 'default' : 'outline'}
                      onClick={() => {
                        setSelectedIssues(prev =>
                          prev.includes(issue.id)
                            ? prev.filter(id => id !== issue.id)
                            : [...prev, issue.id]
                        );
                      }}
                      className="justify-start text-left h-auto py-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">{issue.title}</span>
                        <span className="text-xs text-muted-foreground">{issue.location.address}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

               <Button onClick={handleGenerateSummary} disabled={isSummarizing || selectedIssues.length === 0}>
                {isSummarizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate AI Summary
              </Button>
              
              {summary && (
                <div className="space-y-2">
                    <Label htmlFor="summary">Generated Summary for Officials:</Label>
                    <Textarea id="summary" value={summary} readOnly className="min-h-48 bg-muted" />
                </div>
              )}

            </CardContent>
            <CardFooter>
               <Button disabled={!summary}>
                <Send className="mr-2 h-4 w-4" /> Send to PWD
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
