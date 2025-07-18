import { AuthForm } from '@/components/auth-components';
import { AppLogo } from '@/components/app-logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AppLogo />
            </Link>
          <h1 className="text-3xl font-bold font-headline text-foreground">Welcome to pet-guide</h1>
          <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
        </div>
        <AuthForm />
        <p className="text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-primary">
                Back to homepage
            </Link>
        </p>
      </div>
    </div>
  );
}
