#!/bin/bash
# Script to connect your local repo to GitHub

echo "🚀 Connecting to GitHub..."
echo ""
echo "Please create a repository on GitHub first:"
echo "1. Go to https://github.com/new"
echo "2. Name it: tutoring-program (or any name)"
echo "3. Choose PUBLIC (required for free GitHub Pages)"
echo "4. DO NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository..."
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name: " REPO_NAME

echo ""
echo "Adding remote repository..."
git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git 2>/dev/null || git remote set-url origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

echo ""
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Now enable GitHub Pages:"
echo "1. Go to: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
echo "2. Under 'Source', select: Branch 'main', Folder '/ (root)'"
echo "3. Click 'Save'"
echo "4. Your site will be at: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
echo ""

