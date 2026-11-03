# Happy Birthday Surprise Website for Ranu Solanki ❤️

A premium, romantic, fully responsive birthday surprise website crafted with love for **Ranu Solanki**.

---

## 📁 1. Project Folder Structure

```
birthday-surprise-ranu/
│
├── index.html                 # Main website HTML file
├── style.css                  # Romantic Pink Luxury CSS styles & 3D animations
├── script.js                  # Audio synthesizer, 3D cake, memories, and interactions
│
└── assets/                    # Assets directory
    ├── music/
    │   └── romantic_song.mp3  # Optional custom romantic MP3
    └── photos/
        ├── photo1.jpg         # Photo 1 of Ranu
        ├── photo2.jpg         # Photo 2 of Ranu
        └── ... (up to photo30.jpg)
```

---

## 📸 2. Instructions to Add 30 Personal Photographs

### Method A: Directly in the Live Website (Easiest)
1. Open the website on your phone or laptop.
2. Scroll to the **"Our Beautiful Memories"** section.
3. Click the **"Add Personal Photo"** button.
4. Select any photo from your gallery, write a sweet caption, pick a date, and hit **Save**.
5. The photos are instantly stored in your browser's persistent storage.

### Method B: In the Standalone Code
1. Place 30 photos inside `assets/photos/` named `photo1.jpg` to `photo30.jpg`.
2. In `script.js`, edit the `memories` array with your custom photo file paths and captions:
```javascript
{
  title: "Sunset by the Beach",
  caption: "You smiled and my whole world brightened.",
  date: "July 2026",
  img: "assets/photos/photo1.jpg"
}
```

---

## 🎵 3. Instructions for Background Romantic Music

1. **Instant Web Audio Synth:** By default, the website includes a built-in Romantic Piano Synthesizer playing a soft melody without requiring any external audio files.
2. **Uploading Your Own Song:**
   - Tap the **"Upload MP3"** button located on the bottom-right music player widget.
   - Choose your favorite MP3 song (e.g. *Until I Found You*, *Tum Mile*, *Perfect*, *Kesariya*).
   - The song will play continuously with the dynamic animated audio visualizer.

---

## 💻 4. Local Preview Instructions

1. Double-click `index.html` to open it in Chrome, Safari, Edge, or Firefox.
2. Or use VS Code Live Server extension: Right click `index.html` -> "Open with Live Server".

---

## 🌐 5. Free Hosting Instructions

### Option 1: Netlify Drop (Fastest - 60 Seconds)
1. Visit [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `standalone_export` folder directly into the browser box.
3. Your website is instantly deployed with a free public URL (e.g. `https://happy-birthday-ranu.netlify.app`).
4. Share the URL with Ranu!

### Option 2: GitHub Pages (Permanent & Free)
1. Log in to [GitHub](https://github.com/) and click **New Repository**.
2. Name it `happy-birthday-ranu` and check "Public".
3. Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder.
4. Go to **Settings** → **Pages** (in the left sidebar).
5. Under **Branch**, select `main` and click **Save**.
6. In about 1 minute, your website will be live at `https://<your-username>.github.io/happy-birthday-ranu/`!

---

Crafted with infinite love for Ranu Solanki. ❤️
