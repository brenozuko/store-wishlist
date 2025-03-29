# Store Wishlist

A modern React application for managing your store wishlist, built with TypeScript, Vite, and Shadcn UI.

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

## Technologies

- React
- TypeScript
- Vite
- Shadcn UI
- Tailwind CSS
- Zustand
- Apollo Client
- GraphQL

## API Credits

This project uses the [Platzi Fake Store API](https://fakeapi.platzi.com/) for product data. This is a free, public API that provides mock data for an e-commerce store, including products, categories, and user data.

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd store-wishlist
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

The following environment variables are required:

- `VITE_GRAPHQL_URL`: The GraphQL API endpoint URL

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
