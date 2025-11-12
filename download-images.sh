#!/bin/bash

# Image Download Helper Script for Matcha or Swamp Game
# This script helps you download images from Pexels or Unsplash

echo "=== Matcha or Swamp - Image Download Helper ==="
echo ""
echo "This script will help you download images for the game."
echo "You'll need to manually copy image URLs from free stock photo sites."
echo ""

# Function to download an image
download_image() {
    local url=$1
    local output_path=$2
    echo "Downloading to $output_path..."
    curl -L "$url" -o "$output_path"

    # Check if download was successful
    if [ -f "$output_path" ] && [ -s "$output_path" ]; then
        # Check if it's actually an image
        file_type=$(file -b --mime-type "$output_path")
        if [[ $file_type == image/* ]]; then
            echo "✓ Successfully downloaded $output_path"
            return 0
        else
            echo "✗ Downloaded file is not an image (got $file_type)"
            rm "$output_path"
            return 1
        fi
    else
        echo "✗ Failed to download image"
        return 1
    fi
}

# Instructions
echo "HOW TO USE THIS SCRIPT:"
echo ""
echo "1. Go to a free stock photo website:"
echo "   - Pexels: https://www.pexels.com"
echo "   - Unsplash: https://unsplash.com"
echo "   - Pixabay: https://pixabay.com"
echo ""
echo "2. Search for 'matcha latte' or 'matcha drink'"
echo ""
echo "3. Click on an image you like"
echo ""
echo "4. Right-click on the image and select 'Copy Image Address' (or similar)"
echo ""
echo "5. Paste the URL below when prompted"
echo ""
echo "================================================"
echo ""

# Download matcha images
echo "Let's download MATCHA images (need 10 total)..."
current_count=$(ls images/matcha/*.jpg 2>/dev/null | wc -l | tr -d ' ')
echo "You currently have $current_count matcha images."
needed=$((10 - current_count))

if [ $needed -gt 0 ]; then
    echo "You need $needed more matcha images."
    echo ""

    for i in $(seq $((current_count + 1)) 10); do
        echo "--- Matcha Image $i of 10 ---"
        read -p "Paste the image URL (or 'skip' to skip, 'done' to finish): " url

        if [ "$url" = "done" ]; then
            break
        fi

        if [ "$url" = "skip" ] || [ -z "$url" ]; then
            echo "Skipped."
            continue
        fi

        download_image "$url" "images/matcha/matcha$i.jpg"
        echo ""
    done
else
    echo "You already have all 10 matcha images!"
fi

echo ""
echo "================================================"
echo ""

# Download swamp images
echo "Now let's download SWAMP images (need 10 total)..."
current_count=$(ls images/swamp/*.jpg 2>/dev/null | wc -l | tr -d ' ')
echo "You currently have $current_count swamp images."
needed=$((10 - current_count))

if [ $needed -gt 0 ]; then
    echo "You need $needed more swamp images."
    echo ""
    echo "TIP: Search for 'swamp water', 'marsh', 'bog', or 'murky water'"
    echo ""

    for i in $(seq $((current_count + 1)) 10); do
        echo "--- Swamp Image $i of 10 ---"
        read -p "Paste the image URL (or 'skip' to skip, 'done' to finish): " url

        if [ "$url" = "done" ]; then
            break
        fi

        if [ "$url" = "skip" ] || [ -z "$url" ]; then
            echo "Skipped."
            continue
        fi

        download_image "$url" "images/swamp/swamp$i.jpg"
        echo ""
    done
else
    echo "You already have all 10 swamp images!"
fi

echo ""
echo "================================================"
echo "Summary:"
matcha_count=$(ls images/matcha/*.jpg 2>/dev/null | wc -l | tr -d ' ')
swamp_count=$(ls images/swamp/*.jpg 2>/dev/null | wc -l | tr -d ' ')
echo "Matcha images: $matcha_count / 10"
echo "Swamp images: $swamp_count / 10"
echo ""

if [ $matcha_count -eq 10 ] && [ $swamp_count -eq 10 ]; then
    echo "✓ All images downloaded! Your game is ready to play!"
    echo "Open index.html in your browser to start playing."
else
    echo "You still need more images. Run this script again to continue."
fi
