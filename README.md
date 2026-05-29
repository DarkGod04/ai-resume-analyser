# Resumind — AI Resume Analyzer

An elegant, premium, AI-powered Resume Analyzer built by **Nikhil Kumar Singh** using React, React Router v7, and Puter.js. Resumind matches candidates' resumes with specific job listings, evaluates the ATS score, extracts structural components via OCR (img2txt), and provides in-depth rating feedback.

## ⚙️ Tech Stack

- **React**: Modern component-driven frontend library.
- **React Router v7**: Advanced routing and layout hierarchy.
- **Puter.js**: Serverless cloud storage, database, authentication, and AI drivers (OCR + LLM) running entirely in the browser.
- **Tailwind CSS**: Utility-first CSS styling framework.
- **TypeScript**: Static typing for solid code scalability and type safety.

## 🔋 Key Features

- **Puter Cloud Authentication**: Sign in using Puter's secure, zero-setup, user-paid authentication.
- **Resume Upload & File Management**: Files are uploaded to Puter's file system and stored securely.
- **PDF-to-Image Extraction**: Auto-converts uploaded PDFs to high-res images on the client-side for OCR extraction.
- **OCR (img2txt) & AI Feedback**: Extracts text from resume images and leverages Claude 3.5 Sonnet to perform detailed analyses.
- **ATS Match Score**: Computes matching metrics (ATS score, tone & style, content formatting, and skills match) and displays interactive circular gauges and category rating badges.
- **Interactive Accordion Details**: Segmented suggestions highlighting specific strengths and actionable improvements.

## 🤸 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd ai-resume-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open the local address shown in your terminal (usually [http://localhost:5173](http://localhost:5173) or [http://localhost:5174](http://localhost:5174)) in your browser.

## 🌐 Deployment on Vercel

To deploy **Resumind** on Vercel, ensure you configure your environment variables in your Vercel project settings:

1. **Environment Variables**:
   Secrets like `PUTER_CLIENT_ID`, `PUTER_CLIENT_SECRET`, or `NEXTAUTH_URL` work locally via a `.env.local` file, but must be added manually in the Vercel dashboard under **Project Settings > Environment Variables**.

2. **Cross-Origin Headers (COOP/COEP)**:
   Do **NOT** enable `Cross-Origin-Opener-Policy` (COOP) or `Cross-Origin-Embedder-Policy` (COEP) headers on Vercel or locally. Since Puter's login flow operates via a cross-origin popup (`puter.auth.signIn()`), enabling COOP (even as `same-origin-allow-popups`) will sever the window context connection between your app and the Puter popup. This results in the login hanging or failing with `INVALID_APP` / authentication errors.
