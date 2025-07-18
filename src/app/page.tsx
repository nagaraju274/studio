"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/app-logo";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <AppLogo />
          <h1 className="text-2xl font-bold text-foreground">pet-guide</h1>
        </div>
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-20 text-center md:grid-cols-2 md:text-left">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl font-headline">
              Understand Your Pet Like Never Before
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Leverage AI to identify your pet's breed, estimate their age, analyze behavior, and get personalized care advice. All with a simple photo or video.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/login">
                Upload & Analyze <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative h-80 w-full md:h-96">
            <Image
              src="https://placehold.co/600x400.png"
              alt="A happy dog and cat sitting together"
              data-ai-hint="happy pet"
              fill
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
        </section>
      </main>
      <footer className="container mx-auto border-t py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} pet-guide. All rights reserved.</p>
      </footer>
    </div>
  );
}
