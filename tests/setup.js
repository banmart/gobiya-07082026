// Vitest runs outside Next, so .env.local is not loaded automatically.
import { config } from 'dotenv';

config({ path: '.env.local' });
