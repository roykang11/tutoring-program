# Tutoring Program

A web-based tutoring session management application to manage your weekly calendar, students, and earnings. Data is stored in your browser (localStorage), so no server is required.

## Features

- 📅 **Weekly Calendar**: Visual calendar view with students as rows and days as columns
- 👥 **Student Management**: Add students with custom colors, rates, and currencies
- 💰 **Earnings Tracking**: Calculate earnings per week and month with currency conversion
- 📝 **Session Notes**: Record materials covered and notes for each tutoring session
- 🌐 **Multi-currency**: Support for USD and KRW with real-time exchange rates

## Quick Start

### Run Locally

**Option 1: Simple Server**
```bash
npm run web
```
Then open `http://localhost:3000`

**Option 2: Desktop App**
```bash
npm start
```

**Option 3: Open Directly**
Just open `pages/calendar.html` in your browser!

## Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it (e.g., `tutoring-program`)
4. Choose **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### Step 2: Upload Your Code

**Using Command Line (Recommended):**

```bash
# Navigate to your project folder
cd "/Users/seojoonkang/Desktop/Tutoring Program"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Or Using GitHub Desktop:**
1. Install [GitHub Desktop](https://desktop.github.com)
2. File → Add Local Repository
3. Select your project folder
4. Publish repository

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** (in left sidebar)
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**
6. Wait a minute, then visit: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Step 4: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

Example: If your username is `johndoe` and repo is `tutoring-program`:
```
https://johndoe.github.io/tutoring-program/
```

## Pages

- **Weekly Calendar**: View and manage weekly schedule
- **Students**: Add and manage students with rates and colors
- **Earnings**: Track earnings per week with currency conversion

## Data Storage

- All data is stored in browser `localStorage`
- Data persists between sessions
- Each browser/device has its own data
- **Backup**: Open DevTools → Application → Local Storage → Copy keys starting with `tp:`

## Notes

- Week navigation: Use arrows to navigate weeks, or select from dropdown
- Currency: Supports USD and KRW with real-time exchange rates
- Sessions: Click on session pills to edit class details

## Development

Built with vanilla HTML, CSS, and JavaScript. No frameworks required!

## License

MIT
