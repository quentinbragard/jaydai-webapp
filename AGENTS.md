Codex Agent for JayDAI Webapp Frontend

This document provides a comprehensive overview of the JayDAI webapp frontend codebase, designed to be used by Codex for understanding and interacting with the repository.

1. Repository Overview

The JayDAI webapp frontend is a modern, responsive web application built with Next.js 18, TypeScript, and Tailwind CSS. It provides a user-friendly interface for interacting with the JayDAI platform, including managing prompt templates, viewing AI usage data, and reading AI news and tips. The webapp is designed to be a comprehensive dashboard for users to manage their JayDAI account and access all the platform's features.

1.1. Core Technologies

•
Framework: Next.js 18

•
Language: TypeScript

•
Styling: Tailwind CSS

•
UI Components: shadcn/ui

1.2. Key Features

•
Template management (create, read, update, delete)

•
Data visualization and analytics

•
Content access control based on user roles and permissions

•
AI news and tips section

•
User authentication and profile management

•
Responsive design for desktop and mobile devices

2. Project Structure

The repository follows the standard Next.js project structure, with a clear separation of concerns. The key directories are:

•
/src/app: Contains the application's routes and pages, using the Next.js App Router.

•
/src/components: Houses the reusable UI components, organized by feature.

•
/src/contexts: Provides React context providers for state management.

•
/src/hooks: Contains custom React hooks for reusable logic.

•
/src/lib: Includes utility functions and helper classes.

•
/public: Stores static assets like images and fonts.

3. Architecture

The webapp is built with a modern, component-based architecture that promotes reusability and maintainability.

3.1. Routing

The application uses the Next.js App Router for routing, with route groups for organizing related pages. The main route groups are:

•
(dashboard): The main application dashboard, which is a protected route.

•
login: The user authentication and login page.

3.2. State Management

State management is handled using a combination of React's built-in state management features (e.g., useState, useReducer) and the Context API for sharing global state. Custom hooks are used to encapsulate and reuse stateful logic.

3.3. UI Components

The UI is built with a combination of custom components and the shadcn/ui component library. This provides a consistent and visually appealing user interface.

4. Key Features Implemented

The webapp implements a wide range of features to provide a comprehensive user experience.

•
Authentication: Google OAuth integration for secure user authentication.

•
Template Management: Full CRUD functionality for managing prompt templates.

•
Block and Folder System: UI for interacting with the block and folder system.

•
Theme Support: Dark and light mode toggle for user preference.

•
Protected Routes: Authentication-based access control to protect sensitive data.

5. How to Contribute

To contribute to the JayDAI webapp frontend, please follow these steps:

1.
Fork the repository.

2.
Create a new branch for your feature or bug fix.

3.
Make your changes and ensure the application runs correctly.

4.
Follow the existing coding style and conventions.

5.
Submit a pull request with a clear description of your changes.

