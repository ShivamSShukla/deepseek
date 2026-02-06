#!/bin/bash

# HyperScraper Pro Quick Start
echo "🚀 Setting up HyperScraper Pro..."

# Check if Chrome is installed
if ! command -v google-chrome &> /dev/null && ! command -v chromium &> /dev/null; then
    echo "❌ Chrome/Chromium not found. Please install Chrome first."
    exit 1
fi

# Create project structure
echo "📁 Creating project structure..."
mkdir -p hyper-scraper-pro/{background,content/selectors,popup,sidebar,options,utils,assets/icons,screenshots,scripts}

# Copy all files to their locations
echo "📋 Copying files..."

# You would copy all the code files here
# This is a template - you need to create the actual files

echo "✅ Project structure created!"
echo ""
echo "📦 Next steps:"
echo "1. Copy all the code files to their respective folders"
echo "2. Create PNG icons from the SVG files provided"
echo "3. Open Chrome and go to chrome://extensions/"
echo "4. Enable 'Developer mode'"
echo "5. Click 'Load unpacked' and select the hyper-scraper-pro folder"
echo ""
echo "🎉 Happy scraping!"