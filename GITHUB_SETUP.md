# GitHub Pages Setup Guide

Follow these steps to deploy your Tutoring Program to GitHub Pages:

## Step 1: Create a GitHub Account
If you don't have one, sign up at [github.com](https://github.com)

## Step 2: Create a New Repository

1. Click the **"+"** icon in the top right of GitHub
2. Click **"New repository"**
3. Fill in:
   - **Repository name**: `tutoring-program` (or any name you like)
   - **Description**: "Tutoring session management app"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

## Step 3: Initialize Git and Push Your Code

### Option A: Using Terminal/Command Line

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
# Navigate to your project
cd "/Users/seojoonkang/Desktop/Tutoring Program"

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Tutoring Program"

# Add GitHub remote (REPLACE YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important**: Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with the repository name you created

Example:
```bash
git remote add origin https://github.com/johndoe/tutoring-program.git
```

### Option B: Using GitHub Desktop (Easier!)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Install and sign in
3. Click **File** → **Add Local Repository**
4. Browse to: `/Users/seojoonkang/Desktop/Tutoring Program`
5. Click **"Publish repository"**
6. Choose your repository name and click **"Publish"**

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub (the page that opened after creating it)
2. Click the **"Settings"** tab (top right)
3. Scroll down in the left sidebar and click **"Pages"**
4. Under **"Source"**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for GitHub to build your site

## Step 5: Access Your Live Website

GitHub will show you the URL at the top of the Pages settings. It will look like:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:**
```
https://johndoe.github.io/tutoring-program/
```

Click the link or copy it to share with others!

## Updating Your Site

Whenever you make changes:

**Using Terminal:**
```bash
git add .
git commit -m "Updated calendar view"
git push
```

**Using GitHub Desktop:**
- Make your changes
- Write a commit message
- Click "Commit" and "Push"

Changes will be live in about 1 minute!

## Troubleshooting

**"Repository not found" error:**
- Make sure you replaced YOUR_USERNAME and YOUR_REPO_NAME correctly
- Make sure the repository exists on GitHub

**"Pages not found":**
- Wait a few minutes after enabling Pages
- Make sure you selected the correct branch (`main` or `master`)
- Check that your `index.html` or `pages/calendar.html` exists

**"404 error" on subpages:**
- This is normal! GitHub Pages needs the `404.html` file for routing
- I've already created this file for you

## Next Steps

- Share your site URL with others!
- Update the repository description on GitHub
- Add a custom domain (optional, in Settings → Pages)

## Need Help?

Check the main README.md file or GitHub's documentation:
https://docs.github.com/en/pages

