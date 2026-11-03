# 🎂 Ranu Solanki - Birthday Surprise Website ❤️

A luxury, romantic birthday surprise web application designed for **Ranu Solanki** with 32 real couple memories, interactive 3D birthday cake with blowable candles, wax-sealed handwritten love letter, 12 reasons why she is special, romantic synthesizer melody player, and 3D gift box surprise.

---

## 💻 Local Machine Par Run Karne Ka Tareeqa (Localhost Guide)

Apne computer / laptop par is project ko run karne ke 2 aasan tareeqe hain:

### Tareeqa 1: Full React + Vite App (Recommended)

#### Step 1: Check Node.js
Aapke computer par **Node.js** install hona chahiye (Version 18 ya 20+).
- Agar install nahi hai, toh yahan se download karein: [https://nodejs.org/](https://nodejs.org/) (LTS version)
- Verify karne ke liye terminal / cmd mein check karein:
  ```bash
  node -v
  npm -v
  ```

#### Step 2: GitHub se Clone karein ya Folder Open karein
Terminal ya Command Prompt (CMD) open karein:
```bash
git clone <AAPKA_GITHUB_REPO_URL>
cd <REPO_FOLDER_NAME>
```

#### Step 3: Dependencies Install karein
Project folder ke andar yeh command run karein:
```bash
npm install
```
*(Yeh saare packages jaise React, Lucide icons, Canvas-Confetti, Tailwind CSS install kar dega).*

#### Step 4: Local Server Start karein
```bash
npm run dev
```

#### Step 5: Browser mein Open karein
Terminal par ek link aayegi:
```
  ➜  Local:   http://localhost:3000/
```
Apne browser (Chrome, Edge, Brave, Safari) mein `http://localhost:3000` open karein. Aapki website live ho jayegi! 🎉

---

### Tareeqa 2: Standalone (Bina Node.js ke - Direct Open)

Agar aapke computer mein Node ya npm nahi hai, toh project mein ek **`standalone_export/`** folder bhi hai:
1. VS Code mein `standalone_export` folder open karein.
2. `index.html` file par right-click karke **"Open with Live Server"** karein ya direct double-click karke browser mein open karein!
3. Ya terminal mein run karein:
   ```bash
   npx serve standalone_export
   ```

---

## 🛠️ Helpful Commands

| Command | Kaam |
| :--- | :--- |
| `npm run dev` | Local development server start karta hai (`http://localhost:3000`) |
| `npm run build` | Production ke liye optimize build banata hai (`dist/` folder) |
| `npm run preview` | Production build ko locally preview karta hai |

---

## 🌐 Free Hosting Options (Ranu ke sath link share karne ke liye)

Agar aap chahte hain ki Ranu isko apne phone par direct open kare bina laptop ke:

1. **Vercel** (Sabse easy):
   - [vercel.com](https://vercel.com) par jayein.
   - Apne GitHub account se login karein.
   - Yeh repository select karein aur **Deploy** dabayein. 1 minute mein free live link mil jayegi!
2. **Netlify**:
   - [netlify.com](https://netlify.com) par jayein.
   - GitHub connect karein ya `dist` folder drag-and-drop karein.
3. **GitHub Pages**:
   - Repository Settings > Pages > Source select karein.
