// env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SECRET_KEY: z.string().min(16),
    SPORTS_DATA_API_KEY: z.string().min(1),
    ODDS_API_KEY: z.string().min(1),
    JWT_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["development", "preview", "production"]),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    SPORTS_DATA_API_KEY: process.env.SPORTS_DATA_API_KEY,
    ODDS_API_KEY: process.env.ODDS_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
});
