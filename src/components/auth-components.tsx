"use client";

import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Success!',
        description: 'You have successfully signed in.',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with Google Sign-In.',
      });
    } finally {
      setLoading(false);
    }
  };

  const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.62-4.88 1.62-4.27 0-7.75-3.5-7.75-7.75s3.48-7.75 7.75-7.75c2.13 0 3.66.84 4.79 1.84l2.48-2.38C18.47 2.44 15.79 1.5 12.48 1.5c-6.47 0-11.48 5.08-11.48 11.48s5.01 11.48 11.48 11.48c3.54 0 6.33-1.22 8.41-3.35 2.17-2.13 2.85-5.22 2.85-8.22 0-.76-.07-1.42-.2-2.04h-11.z"
      ></path>
    </svg>
  );

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
        ) : (
          <>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </>
        )}
      </Button>
    </div>
  );
}
