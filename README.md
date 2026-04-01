# TechVision Website

A modern, minimalist landing page for a technology solutions company. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Responsive Design** - Fully responsive layout that works on all devices
- **Modern Tech Stack** - React 18, TypeScript, Vite, Tailwind CSS
- **Minimalist Aesthetic** - Clean, professional design with subtle animations
- **Sections Included**:
  - Hero with animated elements
  - Services showcase
  - Process workflow
  - Technology stack
  - Testimonials
  - Contact form
  - Footer

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the tech-website folder:
```bash
cd tech-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
tech-website/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/
│   │   └── LandingPage.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## Independent Setup

This website is completely independent from the edtech site. It has its own:
- package.json with separate dependencies
- Tailwind configuration
- TypeScript configuration
- Vite configuration

No shared files or dependencies with the parent edtech project.

## Design System

- **Colors**: Blue primary (#2563eb), neutral grays for backgrounds
- **Typography**: Inter font family with tight letter-spacing for headings
- **Spacing**: Generous whitespace with consistent 6-unit grid
- **Borders**: Subtle 1px borders using Tailwind's border-border color

## License

MIT
