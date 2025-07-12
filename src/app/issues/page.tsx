import { IssueCard } from "@/components/issue-card";
import type { Issue } from "@/types";
import { List } from "lucide-react";

async function getIssues() {
    // In a real app, you would fetch this data from Supabase.
    // For now, this returns an empty array.
    // Example:
    // const supabase = createServerClient();
    // const { data } = await supabase.from('issues').select('*');
    // return data || [];
    return [] as Issue[];
}


export default async function AllIssuesPage() {
  const issues = await getIssues();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
             <List className="w-8 h-8" />
          </div>
          All Reported Issues
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse through all the issues reported by community members.
        </p>
      </div>
        
      {issues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/50 rounded-lg">
            <h2 className="text-2xl font-semibold">No Issues Found</h2>
            <p className="text-muted-foreground mt-2">There are currently no reported issues. Why not be the first to report one?</p>
        </div>
      )}

    </div>
  );
}
