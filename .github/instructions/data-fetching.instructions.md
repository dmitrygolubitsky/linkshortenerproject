---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Instructions
This document outlines the best practices for fetching data in out next.js application. Adhereing to these guidelines will help maintain consistency,  performance and maintainability of the application.

## 1. User Server Components for Data Fetching

In our Next.js application, ALWAYS use server components for data fetching. NEVER use client components for fetching data.

## 2. Data Fetching Methods
ALWAYS use helper functions in the /data directory to fetch data. NEVER fetch data directly within your server components.

ALL helper functions in the /data directory must use Drizzle ORM for our database interactions. 