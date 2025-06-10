# Ai chat app
Chat Interface
    Real-time message streaming using Vercel AI SDK
    Local message storage using DrizzleORM + SQLite
    1 Main Chat Page:
        Chat Sessions List in left sidebar
        Active Chat Thread in the Main Window (or New Chat thread if you're at /new)
        Model Selection & Other Settings in some dropdown or modal
Chat Sessions List
    Create new chat sessions
    View existing sessions
    Components:
        Session Card
        New Session Button
        Session List
Active Chat Thread
    Real-time message streaming
    Message persistence
    Components:
        Message Bubble
        Chat Input
        Loading States
        Error States
Settings
    AI model selection
    Theme settings (lightmode / darkmode)