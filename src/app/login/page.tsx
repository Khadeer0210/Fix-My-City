
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-context";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Set login state globally
    
    // SUPER INSECURE: This is for demonstration purposes only.
    // In a real application, never hardcode credentials or handle auth client-side.
    if (email.toUpperCase() === "BATMAN" && password === "69") {
      toast({
        title: "Admin Login Successful",
        description: "Welcome, Batman. Redirecting to the admin dashboard...",
      });
      router.push("/admin");
    } else {
      // For now, any other login is considered a regular user.
      toast({
        title: "Login Successful",
        description: "Welcome back, Citizen!",
      });
      // Here you would typically handle a real user login.
      // For this prototype, we'll just redirect to the homepage.
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
            </div>
          <CardTitle className="text-2xl font-headline">Login or Create Account</CardTitle>
          <CardDescription>
            Enter your email to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Continue
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline" prefetch={true}>
              Terms of Service
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
