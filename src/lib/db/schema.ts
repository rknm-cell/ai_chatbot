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
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64}),
});
export type User = InferSelectModel<typeof user>;


export const chat = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  title: text('title').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable('Message_v2', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  content: varchar('content'),
  createdAt: timestamp('createdAt').notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

export const streamIds = pgTable('stream_ids', {
  id: uuid('id').primaryKey(),
  chatId: uuid('chat_id').notNull().references(() => chat.id),
  createdAt: timestamp('created_at').defaultNow()
})