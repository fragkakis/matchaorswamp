# Matcha or Swamp?

A fun browser-based game where you test your ability to distinguish between matcha drinks and swamps! The greenish appearance of matcha makes it surprisingly similar to swamp water - can you tell them apart?

## How to Play

1. You'll be shown two images side by side
2. Click on the image you think is the matcha drink
3. Get it right and move to the next round
4. Make one mistake and the game is over!
5. Try to achieve the highest score possible

## Setup Instructions

### 1. Add Images

Before the game can work, you need to add images to the `images` folder:

- Add 10 matcha drink images to `images/matcha/` named: matcha1.jpg through matcha10.jpg
- Add 10 swamp images to `images/swamp/` named: swamp1.jpg through swamp10.jpg

See `images/README.md` for more details on where to find images.

### 2. Test Locally

Simply open `index.html` in your web browser to play the game locally.

### 3. Deploy to GitHub Pages

To deploy this game to GitHub Pages:

1. Create a new repository on GitHub called `matchaorswamp`

2. Initialize git in this directory (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Matcha or Swamp game"
   ```

3. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/matchaorswamp.git
   git branch -M main
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"

5. Your game will be live at: `https://YOUR_USERNAME.github.io/matchaorswamp/`

## File Structure

```
matchaorswamp/
├── index.html          # Main HTML structure
├── styles.css          # Game styling
├── game.js            # Game logic
├── images/
│   ├── matcha/        # Matcha drink images (add 10 images)
│   └── swamp/         # Swamp images (add 10 images)
└── README.md          # This file
```

## Features

- Pure frontend implementation (HTML, CSS, JavaScript)
- No dependencies or build process required
- Responsive design that works on desktop and mobile
- Smooth animations and visual feedback
- Score tracking
- Randomized image pairs to prevent memorization

## Customization

You can easily customize the game by:

- Adding more images to the `images/matcha/` and `images/swamp/` folders
- Modifying the `matchaImages` and `swampImages` arrays in `game.js`
- Changing colors and styles in `styles.css`
- Adjusting game logic in `game.js`

## Browser Compatibility

This game works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use, modify, and distribute this game as you wish!

## Credits

Created as a fun project to play with the visual similarity between matcha drinks and swamps.
