
"use client";

import { useState, useTransition, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { suggestSimilarIssues } from "@/ai/flows/suggest-similar-issues";
import { Loader2, Lightbulb, Camera } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  category: z.enum(['Pothole', 'Graffiti', 'Streetlight Out', 'Trash', 'Water Logging', 'Other']),
  location: z.string().min(5, "Please provide a location or address."),
  photo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ReportForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  const description = form.watch('description');
  const location = form.watch('location');

  const fetchSuggestions = useCallback(async () => {
    if (description.length < 20 || location.length < 5) {
      setSuggestions([]);
      return;
    }
    
    setIsAiLoading(true);
    try {
      const result = await suggestSimilarIssues({ description, location });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("AI suggestion error:", error);
    } finally {
      setIsAiLoading(false);
    }
  }, [description, location]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 1000);

    return () => clearTimeout(handler);
  }, [description, location, fetchSuggestions]);

  function onSubmit(values: FormValues) {
    startTransition(() => {
      console.log(values);
      toast({
        title: "✅ Report Submitted!",
        description: "Thank you for helping improve your city. Your report has been received.",
      });
      form.reset();
      setSuggestions([]);
    });
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Water logging near City Market" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue in detail. The more information, the better."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <AnimatePresence>
              {(isAiLoading || suggestions.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="bg-muted/50">
                    <CardHeader className="flex-row items-center gap-2 pb-2 pt-4">
                      {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Lightbulb className="w-5 h-5 text-accent" />}
                      <CardTitle className="text-lg">Similar Issues Found?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isAiLoading ? (
                         <p className="text-sm text-muted-foreground">Checking for similar reports near you...</p>
                      ) : (
                        <ul className="space-y-2 list-disc pl-5 text-sm">
                          {suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      )}
                      <FormDescription className="mt-2">
                        To avoid duplicates, please check if one of these is the issue you're reporting.
                      </FormDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pothole">Pothole</SelectItem>
                        <SelectItem value="Graffiti">Graffiti</SelectItem>
                        <SelectItem value="Streetlight Out">Streetlight Out</SelectItem>
                        <SelectItem value="Trash">Garbage Dump</SelectItem>
                        <SelectItem value="Water Logging">Water Logging</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location / Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Near Majestic Bus Stand, Bengaluru" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo Evidence</FormLabel>
                   <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="file" accept="image/*" {...form.register('photo')} />
                    </FormControl>
                    <Button type="button" variant="outline" size="icon">
                      <Camera />
                      <span className="sr-only">Take a picture</span>
                    </Button>
                  </div>
                  <FormDescription>A picture helps a lot!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Report
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
