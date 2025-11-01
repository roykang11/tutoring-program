# Deploying Tutoring Program to a Website

This guide shows you how to deploy your Tutoring Program as a web application.

## Option 1: Simple Local Server (Testing)

1. **Start a simple server:**
   ```bash
   node server.js
   ```
   
2. **Open your browser:**
   - Go to `http://localhost:3000`
   - The app will work exactly like the desktop version!

## Option 2: Deploy to Free Hosting Services

### Using Netlify (Easiest)

1. **Install Netlify CLI (if you want to use CLI):**
   ```bash
   npm install -g netlify-cli
   ```

2. **Or use Netlify Drop:**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your entire project folder
   - Your site will be live in seconds!

3. **Configure redirects (create `netlify.toml` or `_redirects` file):**
   ```
   /  /pages/calendar.html  200
   ```

### Using Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Create `vercel.json` for routing:**
   ```json
   {
     "routes": [
       { "src": "/", "dest": "/pages/calendar.html" }
     ]
   }
   ```

### Using GitHub Pages

1. **Create a GitHub repository** and push your code

2. **Go to Settings > Pages** in your GitHub repo

3. **Select source branch** (usually `main` or `master`)

4. **Add a `404.html` file** that redirects to calendar:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta http-equiv="refresh" content="0; url=/pages/calendar.html">
   </head>
   <body></body>
   </html>
   ```

### Using Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure:**
   - Public directory: `.` (current directory)
   - Single-page app: No
   - GitHub deploys: Your choice

4. **Deploy:**
   ```bash
   firebase deploy
   ```

## Option 3: Traditional Web Hosting

1. **Upload all files** (except `node_modules`, `dist`, `main.js`) to your web host
2. **Ensure your server supports:**
   - HTML files
   - Static file serving
   - No special server-side requirements needed!

## Important Notes

- ✅ The app uses `localStorage`, so all data is stored in the browser
- ✅ No backend server needed - it's a pure frontend app
- ✅ Works offline (data persists in browser)
- ⚠️ Data is stored locally per browser/device
- ⚠️ Clearing browser data will delete all students and sessions

## Files to Include

Include these files/folders:
- `pages/` (all HTML files)
- `js/` (all JavaScript files)
- `styles.css`
- `assets/` (images)
- `index.html` (optional, it just redirects)

Do NOT include:
- `node_modules/`
- `dist/`
- `main.js` (Electron-specific)
- `package.json` (optional, not needed for web)
- `.git/` (unless using Git-based deployment)

## Custom Domain

After deploying, you can add a custom domain in your hosting provider's settings.

