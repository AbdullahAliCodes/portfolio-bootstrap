# Abdullah Ali Portfolio (Bootstrap)

A responsive, two-page personal portfolio built with Bootstrap 5, custom theme tokens, and lightweight vanilla JavaScript interactions.

## Live Scope

- **Home page:** hero, about, contact sections (`index.html`)
- **Projects page:** categorized portfolio cards with client-side filtering (`projects.html`)
- **Shared logic:** dark/light theme persistence, nav behavior, project thumbnail switching, typing effect (`script.js`)
- **Shared styling:** token-driven theme system + component styling (`cover.css`)

## Why This Project Exists

This portfolio is designed to showcase projects, communicate personal brand, and provide a fast, no-build static site that is easy to deploy and maintain.

## Core Features

- Persistent **light/dark mode** with `localStorage`
- Theme-aware UI updates:
  - Bootstrap theme attribute (`data-bs-theme`)
  - Browser UI color (`meta[name="theme-color"]`)
  - Project card thumbnails swapped per theme
- Responsive navbar:
  - Collapses on mobile
  - Auto-closes when a nav link is selected
  - Gains a docked/scrolled style after leaving hero section
- Hero typing effect with `typed.js`
- Project filtering (`All`, `Foundational`, `Capstone`) without reloading
- Consistent visual system powered by CSS custom properties

## Tech Stack

- **HTML5**
- **CSS3** (custom properties + Bootstrap overrides)
- **JavaScript (ES6+)**
- **Bootstrap 5.3**
- **Bootstrap Icons**
- **Typed.js** (CDN)

## Project Structure

```text
portfolio-bootstrap/
├── index.html               # Home page (hero/about/contact)
├── projects.html            # Projects listing + filters
├── cover.css                # Global styles + theme tokens + sections
├── script.js                # Theme, interactions, filtering, typed text
├── assets/
│   ├── dist/                # Local Bootstrap distribution
│   │   ├── css/
│   │   └── js/
│   ├── fonts/               # Custom fonts (Nova Klasse + others)
│   ├── images/              # Headshots + project thumbnails
│   └── brand/               # Bootstrap brand assets
└── .vscode/                 # Local editor settings
```
