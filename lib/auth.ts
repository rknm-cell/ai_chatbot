import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db";
import { schema } from "~/lib/db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [nextCookies()],
});
