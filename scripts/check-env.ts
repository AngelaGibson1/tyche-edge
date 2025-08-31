// scripts/check-env.ts
import { env } from '../env.mjs';

// Accessing `env` here will trigger the validation
console.log(`✅ Environment validated for ${env.NEXT_PUBLIC_APP_ENV}`);
console.log(`📊 Using API URL: ${env.NEXT_PUBLIC_API_URL}`);
console.log(`🔐 Database connection configured`);
console.log(`⚡ Sports data API key configured`);
console.log(`🎲 Odds API key configured`);
