#!/bin/bash
# This will open GitHub to create the repo, then push

echo "📦 Setting up GitHub repository..."
echo ""
echo "Opening GitHub to create repository..."
echo ""

# Open GitHub new repo page
open "https://github.com/new?name=tutoring-program&description=Tutoring+session+management+app&public=true&initialize=false" 2>/dev/null || echo "Please go to: https://github.com/new"

echo "⏳ Waiting for you to create the repository..."
echo ""
echo "Steps:"
echo "1. Repository name: tutoring-program"
echo "2. Make sure it's PUBLIC"
echo "3. DO NOT initialize with README"
echo "4. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Now enabling GitHub Pages..."
    echo ""
    echo "Go to: https://github.com/roykang11/tutoring-program/settings/pages"
    echo "1. Under 'Source', select: Branch 'main', Folder '/ (root)'"
    echo "2. Click 'Save'"
    echo ""
    echo "Your site will be live at:"
    echo "https://roykang11.github.io/tutoring-program/"
    echo ""
    open "https://github.com/roykang11/tutoring-program/settings/pages" 2>/dev/null
else
    echo ""
    echo "❌ Push failed. You may need to authenticate."
    echo "Run: git push -u origin main"
fi

