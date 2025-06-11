CREATE TABLE "Chat" (
	"id" varchar PRIMARY KEY NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Message_v2" (
	"id" varchar PRIMARY KEY NOT NULL,
	"chatId" varchar NOT NULL,
	"role" varchar NOT NULL,
	"content" varchar,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64)
);
--> statement-breakpoint
ALTER TABLE "Message_v2" ADD CONSTRAINT "Message_v2_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;