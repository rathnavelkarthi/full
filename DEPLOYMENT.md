# Vercel Deployment Guide

## Folder Contents

This folder contains all the necessary files for deploying the Dr. Senz Medical Platform to Vercel.

### Required Files
- `package.json` - Project dependencies and scripts
- `vite.config.js` - Vite build configuration
- `vercel.json` - Vercel deployment configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `src/` - Source code directory
- `public/` - Public assets

### Deployment Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```
   
   Or use the Vercel dashboard:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import this folder
   - Configure environment variables
   - Deploy

### Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_NEON_DATABASE_URL` - Your Neon database connection string

### Build Configuration

The `vercel.json` file is already configured to:
- Build the project using Vite
- Serve static files from the `dist` directory
- Handle all routes with a single-page application router
- Set security headers
- Configure Node.js runtime for API routes

### Important Notes

- The build output directory is set to `dist` in `vercel.json`
- All routes are handled by the SPA router (single-page application)
- Security headers are configured for production
- The project uses React 18, Vite 4, and Tailwind CSS 3
