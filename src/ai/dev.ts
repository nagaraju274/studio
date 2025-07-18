import { config } from 'dotenv';
config();

import '@/ai/flows/detect-breed.ts';
import '@/ai/flows/behavior-analysis.ts';
import '@/ai/flows/pet-bot.ts';
import '@/ai/flows/estimate-age.ts';