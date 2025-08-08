# FlavorAI – Test Assessment

This is a test assessment project built with Next.js App Router, showcasing a basic implementation of authentication, recipe management, and rating logic. The main goal was to explore server-centric features and provide a clean, minimal user experience.

## Tech Stack

- Next.js (App Router)
- React (Server Components focused)
- Prisma + PostgreSQL
- Tailwind CSS
- JWT Authentication
- Server Actions for all mutations

## Key Implementation Notes

### Server Components First

The application is built primarily using Server Components, leveraging the capabilities of the App Router. All pages and actions are handled server-side to maximize performance and security.

### Token Management

Authentication is handled via JWT, with the token being securely stored in HTTP-only cookies.  
This token is only used on the server side, ensuring that sensitive logic and data remain protected from client access.

### Ratings

Users can rate recipes. Then user can check their rate.

### Learning Challenges

Since this was my first time working deeply with some of the newer Next.js features (like server actions and full server component architecture), I encountered some difficulties, particularly around caching behavior and how it interacts with mutations and revalidation.

Despite these challenges, I gained valuable insights into how to structure server-first applications using modern Next.js practices.

## Features

- User registration and login
- Token-based auth using HTTP-only cookies
- Create and view recipes
- Rate recipes with a 1–5 star system
- Auth-only protected pages
- Responsive UI using Tailwind

### Bonus Tasks

Unfortunately, I haven't completed the bonus tasks due to a lack of time. I focused on implementing the core functionality as clearly and correctly as possible.

## Demo Video

[Watch the demo video](https://youtu.be/HkmF6bShxrA)
