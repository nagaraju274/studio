"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AppLogo } from "@/components/app-logo";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, Clock, LayoutDashboard } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/history", label: "History", icon: Clock },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-card/50 lg:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <AppLogo />
            <span>PetPal AI</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-card/50 px-4 md:px-6">
           {/* Mobile Nav could go here */}
           <div className="lg:hidden">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <AppLogo />
              </Link>
           </div>
           <div className="flex w-full items-center justify-end gap-4">
            <UserNav user={user} />
          </div>
        </header>
        <main className="flex-1 bg-background p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
