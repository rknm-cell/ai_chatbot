import type { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  primaryKey,
  uuid,
  text,
  varchar,
  json,
} from "drizzle-orm/pg-core";

export const user = pgTable('User', {
  id: varchar('id').primaryKey().notNull(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64}),
});
export type User = InferSelectModel<typeof user>;


export const chat = pgTable('Chat', {
  id: varchar('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt').notNull(),
  title: text('title').notNull(),
  // userId: uuid('userId')
  //   .notNull()
  //   .references(() => user.id),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable('Message_v2', {
  id: varchar('id').primaryKey().notNull(),
  chatId: varchar('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  content: varchar('content'),
  createdAt: timestamp('createdAt').notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

