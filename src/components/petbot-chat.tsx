"use client";

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { petBot, type PetBotInput } from '@/ai/flows/pet-bot';
import type { AnalyzeBehaviorOutput } from '@/ai/flows/behavior-analysis';
import type { DetectBreedOutput } from '@/ai/flows/detect-breed';
import type { EstimateAgeOutput } from '@/ai/flows/estimate-age';
import { Send, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface PetBotChatProps {
  breedAndAgeResult: { breed: DetectBreedOutput; age: EstimateAgeOutput; } | null;
  behaviorResult: AnalyzeBehaviorOutput | null;
}

export default function PetBotChat({ breedAndAgeResult, behaviorResult }: PetBotChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const petBotInput: PetBotInput = {
        question: input,
        breed: breedAndAgeResult?.breed.breed,
        age: breedAndAgeResult?.age.ageRange,
        behavior: behaviorResult?.behaviorAnalysis.likelyClassifications,
        history: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
      };

      const response = await petBot(petBotInput);
      const botMessage: Message = { role: 'bot', content: response.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Chat Error',
        description: 'Failed to get a response from PetGuide.',
      });
      // remove the user's message if the bot fails to respond
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>PetGuide Assistant</CardTitle>
        <CardDescription>Ask me anything about your pet's care!</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground p-8">No messages yet. Start the conversation!</div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg px-4 py-2 text-sm md:max-w-md',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-xs rounded-lg px-4 py-2 text-sm md:max-w-md bg-muted flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500 delay-150"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500 delay-300"></span>
                  </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
