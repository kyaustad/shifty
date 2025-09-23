import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        required: true,
        type: "string",
        input: true,
      },
      lastName: {
        required: true,
        type: "string",
        input: true,
      },
      role: {
        required: true,
        type: "string",
        input: true,
      },
    },
  },
});

export type authType = typeof auth;
