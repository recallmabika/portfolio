# Recall Tawanda Mabika — Portfolio & Security Dossier

[![Live Demo](https://img.shields.io/badge/Live_Site-recallmabika.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://recallmabika.vercel.app)
[![React](https://img.shields.io/badge/React_19-000000?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_8-000000?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-000000?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A high-performance, tactical cybersecurity and information systems engineering portfolio built for **Recall Tawanda Mabika**. Designed with a strict pitch-black (`#000000`) and pure-white (`#ffffff`) monochrome aesthetic, terminal-inspired HUD components, kinetic orbital ring navigation, and direct authenticated email dispatch.

---

## ⚡ Key Highlights

- **Ultra-Minimalist Monochrome Aesthetic**: Purposefully engineered in pure black and white with high-contrast typography, zero distraction, and crisp technical data visualization.
- **Kinetic Orbital Navigation**: Dynamic angular orbital ring (`KineticRing.tsx`) that tracks section state with fluid transitions, mouse wheel gesture interpolation, and keyboard navigation.
- **Interactive Verified Credentials**: Live certification ledger featuring accreditations from CyberEd, arcX, Deep Learning IndabaX, Cisco Networking Academy, and Microsoft. Includes full-screen modal previews on card click and direct verified PDF document access.
- **Zero-Watermark Direct SMTP Transmission**: Vercel Serverless Function (`/api/contact`) leveraging Node.js and Nodemailer for authenticated Gmail SMTP delivery without third-party email service branding or rate-limit watermarks.
- **Tailored CV Distribution**: Built-in curriculum vitae export with inline SVG vectors, synced directly with the production build pipeline.
- **Strictly Authentic Data**: 100% verified operational history, credentials, network telemetry, and competencies with zero mock/filler data.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) |
| **Build & Tooling** | [Vite 8](https://vite.dev/) + [Oxlint](https://oxc.rs/) |
| **Styling & Motion** | [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion 13](https://www.framer.com/motion/) |
| **Icons & Media** | [Lucide React](https://lucide.dev/) + Optimized SVGs |
| **Serverless API** | [Vercel Serverless Functions](https://vercel.com/docs/functions) (Node.js runtime) + [Nodemailer](https://nodemailer.com/) |
| **Local SMTP Engine** | Optional Python [Flask](https://flask.palletsprojects.com/) microservice (`backend/`) |
| **Deployment & Hosting** | [Vercel](https://vercel.com/) with automated continuous integration |

---

## 📁 Repository Structure

```plaintext
recallmabika.com/
├── api/
│   └── contact.js                # Vercel serverless Gmail SMTP handler
├── backend/                      # Optional standalone Python Flask mail microservice
│   ├── app.py
│   └── requirements.txt
├── public/
│   ├── certs/                   # Verified certification PNG previews & PDF documents
│   │   ├── COSE.png
│   │   ├── COSE_Certificate_Cyberus.pdf
│   │   ├── Cyber Threat Intelligence.jpg
│   │   ├── Cyber_Threat_Intelligence.pdf
│   │   ├── Cybersecurity for Business.png
│   │   ├── Deep Learning IndabaX Zim_2026.png
│   │   ├── Ethical Hacking 101 - SimpleLearn.pdf
│   │   ├── IndabaX.pdf
│   │   ├── Introduction to Cybersecurity - Cisco.pdf
│   │   ├── Introduction to Cybersecurity - Cisco.png
│   │   └── Student SOC Program Foundations training - Microsoft.pdf
│   ├── Recall_Tawanda_Mabika_CV.pdf
│   ├── favicon.svg              # Circular high-contrast profile avatar favicon
│   └── profile.jpg
├── src/
│   ├── components/
│   │   ├── sections/            # Section views
│   │   │   ├── HomeSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── CompetenciesSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ActionButtons.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── KineticRing.tsx      # Interactive orbital ring navigation
│   │   └── ProfileFrame.tsx
│   ├── data/
│   │   ├── portfolioData.ts     # Verified biographical, technical & credential data
│   │   └── sections.ts          # Section sequence & radial angles
│   ├── cv-template.html         # High-precision printable CV source
│   ├── App.tsx                  # Root orchestration & gesture listener
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vercel.json                  # Deployment configuration & API rewrites
└── vite.config.ts
```

---

## 🧭 Navigation & Section Breakdown

| Section | Angle | Description |
|---|---|---|
| **Home** | `0°` | Operational overview, current readiness status, bio summary, quick credential inspection |
| **About** | `72°` | Career trajectory at Zitrac Systems, systems administration experience, core engineering focus |
| **Competencies** | `144°` | Technical arsenal across Offensive Security, Networking, Database Administration & Systems |
| **Projects** | `216°` | Selected high-impact enterprise deployments, security hardening case studies, and architecture briefs |
| **Certifications** | `288°` | Verified industry accreditations with clickable full-resolution preview modals & PDF downloads |
| **Contact** | `360°` | Direct encrypted dispatch to inbox via SMTP, WhatsApp link, telephone hotline, and public PGP channels |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### 1. Clone the Repository

```bash
git clone https://github.com/recallmabika/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables (Optional for Local Contact API)

Create a `.env` file in the project root if you wish to test contact dispatch locally:

```env
GMAIL_USER=recallmabika@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
RECIPIENT_EMAIL=recallmabika@gmail.com
```

> **Note**: `.env` files are strictly excluded from version control via `.gitignore` and `.vercelignore` to protect sensitive credentials.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

This compiles TypeScript and bundles static assets to the `dist/` directory via Vite.

---

## ☁️ Deployment Configuration (Vercel)

The project is pre-configured for seamless zero-config deployment on [Vercel](https://vercel.com/) via `vercel.json`:

```json
{
  "framework": "vite",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Setting up Contact Form on Vercel

1. In your **Vercel Dashboard**, open the project settings for **portfolio**.
2. Navigate to **Settings** → **Environment Variables**.
3. Add the following keys:

| Variable | Description |
|---|---|
| `GMAIL_USER` | Sending Gmail address (e.g. `recallmabika@gmail.com`) |
| `GMAIL_APP_PASSWORD` | 16-character Google Account [App Password](https://myaccount.google.com/apppasswords) |
| `RECIPIENT_EMAIL` | Destination inbox for contact transmissions (e.g. `recallmabika@gmail.com`) |

4. Trigger a redeployment for the variables to take effect. The `/api/contact` serverless endpoint will immediately process dispatches without third-party email services.

---

## 👤 Author Dossier

**Recall Tawanda Mabika**  
*Information Systems Specialist • Offensive Security Explorer (COSE) • Network Infrastructure & Database Architect*  
Harare / Gweru, Zimbabwe

- **Live Portfolio**: [recallmabika.vercel.app](https://recallmabika.vercel.app)
- **LinkedIn**: [linkedin.com/in/recall-mabika-58a436214](https://www.linkedin.com/in/recall-mabika-58a436214)
- **GitHub**: [github.com/recallmabika](https://github.com/recallmabika)
- **Direct Email**: [recallmabika@gmail.com](mailto:recallmabika@gmail.com)
- **WhatsApp**: [+263 77946 6786](https://wa.me/263779466786)
- **Voice Line**: [+263 71 800 1031](tel:+263718001031)

---

## 📄 License

Copyright © 2026 Recall Tawanda Mabika. All rights reserved.  
Source code is open for personal review, inspection, and architectural reference. Commercial redistribution or impersonation of credentials, identity, or materials is strictly prohibited.
