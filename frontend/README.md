# Newton School of Technology Repository
git
A modern, scalable, and maintainable web application for the Newton School of Technology at Rishihood University. This repository is built with a focus on performance, accessibility, and developer experience, leveraging the latest in the React ecosystem.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Styling & Theming](#styling--theming)
- [Routing](#routing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project serves as the digital hub for Newton School of Technology, providing information on academics, campus life, clubs, events, internships, startups, and more. The codebase is designed for extensibility and ease of collaboration, with a modular component structure and best-in-class tooling.

---

## Features

- **Modern UI/UX**: Built with React, shadcn/ui, and Tailwind CSS for a responsive, accessible, and visually appealing interface.
- **Comprehensive Navigation**: Multi-level navigation with desktop and mobile support.
- **Dynamic Routing**: Code-split routes for all major sections (Home, Academics, Campus, Clubs, Events, Mentors, Startups, Internships, Support, Admissions).
- **State Management**: Uses React Query for efficient server state and caching.
- **Reusable Components**: Extensive use of composable UI primitives and custom hooks.
- **Dark Mode**: Fully themeable with dark mode support.
- **Performance Optimizations**: Lazy loading, suspense boundaries, and optimized asset delivery.
- **Accessibility**: Semantic HTML, keyboard navigation, and ARIA best practices.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **State/Data**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **Routing**: [react-router-dom](https://reactrouter.com/)
- **Form Handling**: [react-hook-form](https://react-hook-form.com/)
- **Icons**: [Lucide](https://lucide.dev/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)

---

## Project Structure

```
src/
  components/         # Reusable UI and layout components
    ui/               # shadcn/ui and Radix-based primitives
  pages/              # Top-level route components (one per major section)
  hooks/              # Custom React hooks
  assets/             # Static assets (images, etc.)
  lib/                # Utility functions
  index.css           # Tailwind and design system definitions
  App.tsx             # App shell and route definitions
  main.tsx            # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### Development

```sh
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080) by default.

### Linting

```sh
npm run lint
```

### Production Build

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

---

## Styling & Theming

- **Tailwind CSS** is configured with a custom design system (see `src/index.css` and `tailwind.config.ts`).
- **Dark mode** is supported via the `class` strategy.
- **Design tokens** (colors, gradients, shadows, etc.) are defined as CSS variables for easy theming.

---

## Routing

All major sections are routed via `react-router-dom` and code-split for performance. The main routes include:

- `/` (Home)
- `/academics`
- `/campus`
- `/clubs`
- `/events`
- `/mentors`
- `/startups`
- `/internships`
- `/support`
- `/admissions`
- `*` (404 Not Found)

---

## Deployment

This project is platform-agnostic and can be deployed to any modern static hosting provider (e.g., Vercel, Netlify, GitHub Pages).  
To build for production:

```sh
npm run build
```

Then deploy the contents of the `dist/` directory.

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.
