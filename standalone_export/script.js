// Standalone Javascript for Ranu Solanki's Birthday Surprise

// 1. Particle Canvas (Hearts & Petals)
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const colors = ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#ffffff'];

  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(renderParticles);
  }
  renderParticles();
}

// 2. 30 Memories Initialization
const memories = [
  { title: "Koi Tumhari Parchayi Ki Jagah Bhi Nahi Le Sakta ❤️", caption: "Koi tumhari jagah toh kya, tumhari parchayi ki jagah bhi koi nahi le sakta. Tu hi meri shuruat hai, tu hi mera aakhri sukoon.", date: "Haldighat Memorial", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.24_PM__1__1b236b2e.jpeg" },
  { title: "Tujhse Hi Meri Duniya Khilti Hai ✨", caption: "Green dress me jab tum aayi thi na Ranu, sach kehta hoon dil dhadakna bhool gaya tha.", date: "Green Garden Walk", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.21_PM_6cc8dd0e.jpeg" },
  { title: "Cafe Date & Warm Coffee ☕", caption: "Coffee toh bas ek bahaana tha, asli maqsad toh ghanton baith kar tumhari aankhon me khona tha.", date: "Line Coffee Date", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.34_PM_de1b709f.jpeg" },
  { title: "Snow Park Adventure ❄️", caption: "Kailash Snow Park me itni thand thi, par tumhara haath pakadte hi saari thand garmahat me badal gayi.", date: "Snow Park, Kailash", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.25_PM_929143e4.jpeg" },
  { title: "Phoolon Ka Archway & Meri Rani 🌸", caption: "In phoolon ke beech khadi ho kar bhi sabse haseen phool sirf meri Ranu hi lag rahi thi.", date: "Garden Palace Visit", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.37_PM__1__90f520fb.jpeg" },
  { title: "Humari 4 Sweetest Memories Ka Collage 📸", caption: "Lal saree ho ya casual kurta, tumhare har roop se bepanaah ishq hai mujhe. Meri zindagi ka sabse khoobsurat hissa.", date: "Unforgettable Days", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.35_PM_81726358.jpeg" },
  { title: "Lord Shiva Temple Blessings 🙏", caption: "Mahadev ke aage sar jhukaya toh sirf ek hi dua maangi—meri Ranu hamesha hasti muskurati rahe.", date: "Statue of Belief Temple", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.24_PM__2__cd09551a.jpeg" },
  { title: "Swag & Matching Sunglasses 😎", caption: "Jab hum dono sunglasses pehante hain na, toh pure shehar me humse cool aur romantic couple koi nahi hota!", date: "Style & Smiles", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.26_PM__1__1ba50921.jpeg" },
  { title: "Yeh Nashili Muskaan 💖", caption: "Tum jab aise dekh ke muskurati ho na, dil karta hai waqt yahi tham jaye aur main bas tumhe dekhta rahoon.", date: "Golden Glow Afternoon", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.33_PM_17049dab.jpeg" },
  { title: "Ghungat Me Meri Chandani 🌙", caption: "Lal chunari me tumhara ye sharmata hua chehra... khuda ne tumhe fursat se banaya hai Ranu.", date: "Village Stroll", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.22_PM__1__3aabcf17.jpeg" },
  { title: "Vintage Mirror Selfie 🪞", caption: "Is aaine ko bhi rashk hota hoga jab tum iske saamne aati ho. Mere har khwab ki taqbeer ho tum.", date: "Mirror Reflections", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.38_PM_c11925ac.jpeg" },
  { title: "Mall Masti & Shopping Partner 🛍️", caption: "Tumhare sath shopping karna matlab 1 ghanta shopping aur 3 ghante pagalpanti aur selfies!", date: "Weekend Shopping Spree", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.23_PM_d3beecb0.jpeg" },
  { title: "Cafe Lights & Cozy Moments 💡", caption: "Hat laga kar coffee cup ke samne baithi meri cute si heroine. Har pal tumhare sath ek jashn hai.", date: "Cafe Hangout", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.39_PM__1__3e75b4f2.jpeg" },
  { title: "Black & White, But Full of Love 🖤", caption: "Rang beshak chale jayein, par humara ishq hamesha aise hi gehra aur sachha rahega.", date: "Classic B&W Portrait", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.26_PM_6a081ae6.jpeg" },
  { title: "Historic Fort Gate 🏰", caption: "Itne bade kile ke darwaze ke samne khade hokar bhi meri nazar sirf tum par atki thi.", date: "Fort Heritage Walk", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.26_PM__2__47970073.jpeg" },
  { title: "Elevator Warm Hugs 🫂", caption: "Lift me chupke se li gayi ye selfie... tumhara mere kandhe par sar rakhna meri sabse badi khushi hai.", date: "Elevator Chronicles", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.23_PM__1__574ff6e8.jpeg" },
  { title: "Good Vibes Only With You 🕶️", caption: "Matching black-and-white kapde aur kala chashma—hum dono sath ho toh vibes automatic 100/100 ho jaati hain!", date: "Room Mirror Selfie", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.25_PM__1__b9b46656.jpeg" },
  { title: "Haldighat Ultra Finisher Memories 🏅", caption: "Zindagi ki har race me tum mere sath ho, is se bada koi medal ya trophy mere liye nahi ho sakti.", date: "Haldighat March", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.25_PM_bab5490b.jpeg" },
  { title: "Cafe Lunch & Endless Baatein 🍝", caption: "Pink shirt aur tumhari blue dress... khana toh theek tha par tumhari company lajawab thi.", date: "Cozy Lunch Date", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.22_PM_32b0410c.jpeg" },
  { title: "Matching Outfits & Twin Power 🤍", caption: "White t-shirts me hum dono kitne pyaare lag rahe the na! Tu meri best friend bhi hai aur meri jaan bhi.", date: "Trail Adventure", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.26_PM__1__1ba50921.jpeg" },
  { title: "Blue Sky & Khuli Hawa ☁️", caption: "Neele aasman ke niche, hare bhare pedon ke beech... par sabse khoobsurat nazara tumhara chehra tha.", date: "Park Day Picnic", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.35_PM__2__6645593d.jpeg" },
  { title: "Shy Eyes & Beautiful Soul ✨", caption: "Is mirror me jab tumne phone chhupa kar smile kiya tha na, wo innocent look dil me chhap gaya.", date: "Cafe Mirror Hall", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.40_PM_32372b06.jpeg" },
  { title: "Holding Hands Under Tree Shade 🌳", caption: "Green shade ke niche baith kar tumhara mere kandhe par sar rakhna... ye sukoon kisi jannat se kam nahi.", date: "Under The Trees", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.34_PM__1__ddbf2da0.jpeg" },
  { title: "Posing Like Royalties 👑", caption: "Silver vintage frame ke samne humara ye regal look. Meri Ranu Solanki kisi rani se kam thodi na hai!", date: "Vintage Gallery", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.38_PM__2__56c1f0b4.jpeg" },
  { title: "Cute Face & Innocent Eyes 🥺", caption: "Jab tum clinic me ya wait karte huye achanak aisi cute smile deti ho, toh dil se sirf Mashallah nikalta hai.", date: "Cute Moments", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.24_PM_bab5490b.jpeg" },
  { title: "Matching Caps & Sunshine 🧢", caption: "Dono ne cap lagayi aur nikal pade nayi yadon ko banane. Har safar aasan lagta hai jab humsafar tum ho.", date: "Temple Sunny Walk", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.24_PM__2__cd09551a.jpeg" },
  { title: "Pink Dupatta & Sweet Smiles 💕", caption: "Pink color sach me sirf tumhare liye bana hai Ranu! Meri aakhiri saans tak yehi muskurahat chahie mujhe.", date: "Open Meadows", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.23_PM_d3beecb0.jpeg" },
  { title: "The Softest Touch & Mehndi 🌿", caption: "Hathon me mehndi, mathe par bindi, aur aankhon me mere liye itna sara pyaar. I am the luckiest person!", date: "Festive Bliss", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.21_PM__1__629f978e.jpeg" },
  { title: "Shopping Mall Selfie Fun 🛒", caption: "Shopping bag pakadte pakadte selfie lena aur phir tumhara wo cuteness se gale lagna... moments to cherish forever.", date: "Trial Room Hall", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.26_PM__2__47970073.jpeg" },
  { title: "Garden Archway Hugs 🌺", caption: "Ek hath se archway pakad kar tumhare sath chalna... ye pal meri zindagi ke sabse anmol moti hain.", date: "Blossom Path", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.38_PM__1__55ab9af1.jpeg" },
  { title: "Cafe Date In Matching Beige 🤍", caption: "Dono ka matching beige dress aur wo warm cafe ki lighting... bilkul Bollywood movie jaisi romantic feeling.", date: "Cafe Line Moments", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.41_PM_7293e7b6.jpeg" },
  { title: "Happy Birthday My Forever Love, Ranu ❤️", caption: "Chahe duniya idhar se udhar ho jaye, mera pyaar tumhare liye har guzarate din ke sath aur gehra hoga. Happy Birthday Meri Ranu!", date: "Forever & Always", img: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.27_PM_88d518fb.jpeg" }
];

const memoriesGrid = document.getElementById('memoriesGrid');
if (memoriesGrid) {
  memoriesGrid.innerHTML = memories.map((m, idx) => `
    <div class="polaroid-card" style="transform: rotate(${(idx % 5 - 2) * 1.5}deg)">
      <div class="polaroid-img-wrap">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
      </div>
      <div class="polaroid-title">${m.title}</div>
      <div class="polaroid-caption">"${m.caption}"</div>
    </div>
  `).join('');
}

// 3. 12 Reasons Grid
const reasons = [
  { title: "Your Radiant Smile", desc: "It brightens every dark room and melts all my stress." },
  { title: "Your Caring Heart", desc: "You notice the little things that most people overlook." },
  { title: "Your Presence is Magic", desc: "Any ordinary place feels like home when you are with me." },
  { title: "Your Sparkling Eyes", desc: "When you get excited, a whole galaxy shines inside them." },
  { title: "How You Believe in Me", desc: "You give me courage to chase my biggest aspirations." },
  { title: "Your Cute Laughter", desc: "The sweetest, most comforting sound in the universe." },
  { title: "Your Warmth & Hugs", desc: "A safe haven after any exhausting day." },
  { title: "Your Playful Goofiness", desc: "The funny dances and sweet antics only I get to see." },
  { title: "Your Inner Strength", desc: "Facing every challenge with grace and elegance." },
  { title: "Making Days Special", desc: "Even grocery shopping feels like a romantic date." },
  { title: "Your Pure Soul", desc: "Honest, kind, and irreplaceable in every way." },
  { title: "Growing Old With You", desc: "My greatest dream and forever birthday wish." }
];

const reasonsGrid = document.getElementById('reasonsGrid');
if (reasonsGrid) {
  reasonsGrid.innerHTML = reasons.map((r, i) => `
    <div class="reason-card" onclick="this.classList.toggle('flipped')">
      <div class="reason-num">#0${i + 1}</div>
      <div class="reason-title">${r.title}</div>
      <div class="reason-text">${r.desc}</div>
    </div>
  `).join('');
}

// 4. Interactive Cake Candles
function blowCandle(el) {
  el.classList.add('blown');
  checkAllBlown();
}

function blowAllCandles() {
  document.querySelectorAll('.candle').forEach(c => c.classList.add('blown'));
  checkAllBlown();
}

function relightCandles() {
  document.querySelectorAll('.candle').forEach(c => c.classList.remove('blown'));
  const banner = document.getElementById('wishBanner');
  if (banner) banner.style.display = 'none';
}

function checkAllBlown() {
  const allBlown = Array.from(document.querySelectorAll('.candle')).every(c => c.classList.contains('blown'));
  if (allBlown) {
    const banner = document.getElementById('wishBanner');
    if (banner) banner.style.display = 'inline-block';
    celebrateBurst();
  }
}

// 5. Letter & Gift Box
function toggleLetter() {
  const paper = document.getElementById('letterPaper');
  if (paper) {
    paper.style.display = paper.style.display === 'none' ? 'block' : 'none';
    celebrateBurst();
  }
}

function openGiftBox() {
  const box = document.getElementById('giftBoxContainer');
  const reveal = document.getElementById('giftReveal');
  if (box && reveal) {
    box.style.display = 'none';
    reveal.style.display = 'block';
    celebrateBurst();
  }
}

function celebrateBurst() {
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff']
    });
  }
}

function enterSurprise() {
  celebrateBurst();
  startMusic();
  const el = document.getElementById('celebration');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// 6. Romantic Web Audio Synthesizer & Local Audio
let audioCtx = null;
let isPlaying = false;
let synthTimer = null;
let localAudio = null;

function toggleMusic() {
  if (isPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
}

function startMusic() {
  if (localAudio) {
    localAudio.play();
    isPlaying = true;
    updateMusicUI(true);
    return;
  }

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isPlaying = true;
  updateMusicUI(true);

  // Play romantic arpeggio notes
  const notes = [261.63, 329.63, 392.0, 493.88, 220.0, 261.63, 329.63, 392.0];
  let step = 0;

  function tick() {
    if (!isPlaying) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(notes[step % notes.length], audioCtx.currentTime);

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 2.0);

    // Animate visualizer
    const spans = document.querySelectorAll('.visualizer span');
    spans.forEach(s => s.style.height = `${Math.floor(Math.random() * 12) + 3}px`);

    step++;
    synthTimer = setTimeout(tick, 600);
  }
  tick();
}

function stopMusic() {
  isPlaying = false;
  if (localAudio) localAudio.pause();
  if (synthTimer) clearTimeout(synthTimer);
  updateMusicUI(false);
}

function updateMusicUI(active) {
  const btn = document.getElementById('musicToggleBtn');
  if (btn) btn.innerText = active ? '❚❚' : '▶';
  const spans = document.querySelectorAll('.visualizer span');
  spans.forEach(s => s.style.height = active ? '8px' : '3px');
}

function loadLocalAudio(e) {
  const file = e.target.files[0];
  if (file) {
    stopMusic();
    localAudio = new Audio(URL.createObjectURL(file));
    localAudio.loop = true;
    document.getElementById('musicTrackTitle').innerText = file.name.slice(0, 20);
    startMusic();
  }
}
