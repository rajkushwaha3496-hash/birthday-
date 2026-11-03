import { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Folder, Music, Camera, Globe } from 'lucide-react';

interface ExportGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportGuideModal({ isOpen, onClose }: ExportGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'photos' | 'hosting' | 'code'>('guide');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Happy Birthday Ranu Solanki ❤️</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body>
  <!-- All sections: Welcome, 3D Cake, Memories Gallery, Love Letter, 12 Reasons, Surprise Gift, Music Player -->
  <div id="app"></div>
  <script src="script.js"></script>
</body>
</html>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 bg-rose-50/70">
          <div>
            <h2 className="font-serif text-xl font-bold text-rose-950">
              Deliverables & Free Hosting Guide
            </h2>
            <p className="text-xs text-rose-700/80">
              For Ranu Solanki's Birthday Surprise Website
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-white hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 px-6 gap-2 bg-white text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Folder & Deliverables
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'photos'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Adding 30 Photos & Music
          </button>
          <button
            onClick={() => setActiveTab('hosting')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'hosting'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Free Hosting (GitHub / Netlify)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Standalone Code Files
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 text-left">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                <Folder className="h-5 w-5 text-rose-500" />
                <span>Recommended Project Assets Folder Structure</span>
              </h3>
              <p className="text-xs text-slate-600">
                You can host this project either as this Vite React app or as the standalone bundle prepared in <code>/standalone_export</code>:
              </p>

              <pre className="p-4 rounded-xl bg-slate-900 text-rose-200 text-xs font-mono overflow-x-auto leading-relaxed">
{`birthday-ranu-solanki/
├── index.html                 # Main website entry point
├── style.css                  # Romantic styling, 3D animations, custom fonts
├── script.js                  # Audio visualizer, 3D cake, gift box, confetti logic
├── assets/
│   ├── music/
│   │   └── romantic_song.mp3  # Place background romantic song here
│   └── photos/
│       ├── photo1.jpg         # Photo 1 of Ranu
│       ├── photo2.jpg         # Photo 2 of Ranu
│       ├── ...
│       └── photo30.jpg        # Photo 30 of Ranu
└── README.md                  # Deployment & setup documentation`}
              </pre>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                <strong>Bonus Feature:</strong> In this live website, you can also upload your own photos and MP3 right now in the browser! Photos and wishes are instantly saved in your local storage.
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                <Camera className="h-5 w-5 text-rose-500" />
                <span>How to Add 30 Photographs & Background Music</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    Option A: Directly in This Website (No Coding Required)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Click the <strong>"Add Personal Photo"</strong> button in the Memories section.</li>
                    <li>Select photos from your device, add a sweet caption and date, and hit Save.</li>
                    <li>To play custom music, tap the <strong>"Upload MP3"</strong> button in the bottom-right music player!</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    Option B: Replacing Files in the Exported Folder
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    <li>Place your 30 favorite photos in <code>assets/photos/</code> named <code>photo1.jpg</code> to <code>photo30.jpg</code>.</li>
                    <li>Place your romantic MP3 in <code>assets/music/song.mp3</code>.</li>
                    <li>In <code>script.js</code>, the memories array points to these file paths. Open in any browser!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hosting' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                <Globe className="h-5 w-5 text-rose-500" />
                <span>Free Hosting Instructions (GitHub Pages & Netlify)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Netlify */}
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
                  <h4 className="font-bold text-rose-950 text-sm mb-2 flex items-center gap-1.5">
                    <span>Netlify (Easiest & Fastest - 1 Minute)</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                    <li>Go to <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-rose-600 underline font-semibold">netlify.com/drop</a>.</li>
                    <li>Simply drag and drop the folder containing <code>index.html</code>, <code>style.css</code>, and <code>script.js</code>.</li>
                    <li>Netlify will instantly generate a free live link (e.g., <code>happy-birthday-ranu.netlify.app</code>)!</li>
                    <li>Send the link to Ranu on WhatsApp/message!</li>
                  </ol>
                </div>

                {/* GitHub Pages */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">
                    GitHub Pages (Free & Permanent)
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                    <li>Create a new repository on GitHub: <code>ranu-birthday</code>.</li>
                    <li>Upload your website files (<code>index.html</code>, <code>style.css</code>, <code>script.js</code>, and <code>assets/</code>).</li>
                    <li>Go to <strong>Settings → Pages</strong>.</li>
                    <li>Under "Branch", select <code>main</code> and click <strong>Save</strong>.</li>
                    <li>Your website goes live in ~60 seconds at <code>https://yourusername.github.io/ranu-birthday/</code>!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-rose-950">
                  Standalone HTML Template
                </h3>
                <button
                  onClick={() => copyToClipboard(sampleHtml, 'html')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-semibold"
                >
                  {copiedCode === 'html' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode === 'html' ? 'Copied!' : 'Copy Template'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto">
                {sampleHtml}
              </pre>

              <p className="text-xs text-slate-500">
                The full standalone <code>index.html</code>, <code>style.css</code>, and <code>script.js</code> files are saved in the project repository under <code>/standalone_export/</code> ready for 1-click deployment!
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 text-xs font-semibold shadow-md transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
