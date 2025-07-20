
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/app-logo";
import Image from "next/image";
import { ArrowRight, PawPrint, Clapperboard, BrainCircuit, Scan, FileQuestion, MessageCircle } from "lucide-react";

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

  const features = [
    {
      icon: <PawPrint className="h-8 w-8 text-primary" />,
      title: "Breed & Age Detection",
      description: "Upload a photo to discover your pet's breed and estimated age with remarkable accuracy.",
    },
    {
      icon: <Clapperboard className="h-8 w-8 text-primary" />,
      title: "Behavior Analysis",
      description: "Analyze a video to understand your pet's behaviors, from playful pounces to anxious tail tucks.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "PetGuide Chat",
      description: "Get personalized pet care advice from our AI assistant, tailored to your pet's specific profile.",
    },
  ];

  const howItWorks = [
    {
      icon: <Scan className="h-10 w-10 text-primary" />,
      title: "1. Upload",
      description: "Choose a clear photo or a short video of your pet.",
    },
    {
      icon: <FileQuestion className="h-10 w-10 text-primary" />,
      title: "2. Analyze",
      description: "Our AI gets to work, analyzing the media you provided.",
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      title: "3. Get Insights",
      description: "Receive a detailed report and chat with our AI for more info.",
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo />
            <h1 className="text-2xl font-bold text-foreground">pet-guide</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 text-center md:grid-cols-2 md:text-left sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
                Understand Your Pet Like Never Before
              </h1>
              <p className="text-lg text-muted-foreground">
                Leverage AI to identify your pet's breed, estimate their age, analyze behavior, and get personalized care advice. All with a simple photo or video.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Analyze Your Pet Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 w-full md:h-96">
              <Image
                src="https://placehold.co/800x600.png"
                alt="A happy rottweiler dog lying on the ground"
                data-ai-hint="rottweiler dog"
                fill
                className="rounded-xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-card/50 py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A New Level of Pet Care</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Everything you need to be the best pet parent you can be.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                            {feature.icon}
                            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Simple &amp; Fast</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Get started in three easy steps.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
                    {howItWorks.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                           {step.icon}
                           <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                           <p className="mt-2 text-muted-foreground max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary/10 py-20 sm:py-24">
             <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ready to Decode Your Pet?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Join thousands of happy pet owners and start your journey to deeper understanding.
                </p>
                <Button size="lg" className="mt-8" asChild>
                  <Link href="/login">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </div>
        </section>

      </main>
      
      <footer className="bg-card">
        <div className="container mx-auto border-t py-6 text-center text-muted-foreground px-4 sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} pet-guide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

    
