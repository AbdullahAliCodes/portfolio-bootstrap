# Portfolio | Abdullah Ali

A single-page portfolio site built with **Bootstrap 5**. Showcases projects, skills, and contact info with a cover-style hero and responsive layout.

---

## Sections implemented

| Section           | Description                                                                                                                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero / Header** | Full-viewport banner with background image and overlay; name ("I am Abdullah Ali"), role ("Aspiring Fullstack AI Developer"); fixed top navbar with anchor links (Home, About me, Projects, Contact).                                                                                    |
| **About me**      | Card layout with profile image, name, profile title, email, phone; skill badges (HTML, CSS, JavaScript, Git, Firebase, OOP, ReactJS, Python, NodeJS); short bio.                                                                                                                         |
| **Projects**      | Grid of 6 project cards. Each card: image, title, tech stack, "View Website" button, and code/source link (Bootstrap Icons). Projects: Tesla Landing Page, Netflix Landing Page, YouTube Landing Page, RaceIQ \| F1 Stats Tracker, Hood Goods \| Artisan Marketplace, LinkedIn for Mice. |
| **Contact**       | "Let's Connect" heading and lead text; social links (LinkedIn, GitHub, Instagram) via Bootstrap Icons; contact form with Email, Name, Subject, Message and Submit.                                                                                                                       |
| **Footer**        | Single line: "Developed by Abdullah Ali using Bootstrap, for portfolio purposes."                                                                                                                                                                                                        |

---

## Tech stack

- **HTML5** – semantic structure (`header`, `main`, `section`, `footer`, `nav`).
- **Bootstrap 5.3** – grid, components (cards, nav, forms, buttons), utilities; `data-bs-theme="auto"` for light/dark.
- **Bootstrap Icons** (CDN) – social and code icons.
- **Custom CSS** – `cover.css` (layout, banner, overlay, nav, typography, project card layout); `print.css` (print-only styles).

---

## Bonus features

- **Print stylesheet (`print.css`)**  
  Full `@media print` setup: hides navbar, overlay, footer, and contact form; compacts hero to a short header; reduces padding and font sizes; reflows About and Projects for a clean printed page.

- **Custom typography**  
  **Nova Klasse** (local OTF, semibold + italic) for headings; **Nunito** (Google Fonts) for body and UI.

- **Responsive design**  
  Bootstrap grid and utilities (e.g. `col-md-*`, `d-flex`, `flex-wrap`) for mobile and desktop.

- **Accessibility**  
  `aria-current="page"` on active nav link; `aria-label` on message textarea; labeled form fields; `alt` on images.

- **Visual polish**  
  Section titles wrapped in `<mark>`; overlay on hero; shadow and rounded cards; pill badges for skills.

---

## Project structure

cover/ ├── index.html # Single-page markup ├── cover.css # Main styles (fonts, banner, nav, cards) ├── print.css # Print-only styles ├── assets/ │ ├── dist/css/ # Bootstrap CSS │ ├── dist/js/ # Bootstrap JS │ ├── fonts/ # Nova Klasse OTF │ └── images/ # Profile and project assets └── README.md

## License

For portfolio purposes. Bootstrap is MIT; Nova Klasse subject to its font license (`assets/fonts/nova-klasse-font/Befonts-License.txt`).
