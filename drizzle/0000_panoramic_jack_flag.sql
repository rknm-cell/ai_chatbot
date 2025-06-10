CREATE TABLE "Chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Message_v2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"content" varchar,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stream_ids" (
	"id" uuid PRIMARY KEY NOT NULL,
	"chat_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64)
);
--> statement-breakpoint
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Message_v2" ADD CONSTRAINT "Message_v2_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stream_ids" ADD CONSTRAINT "stream_ids_chat_id_Chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;