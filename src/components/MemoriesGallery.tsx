import { useState, useEffect, useRef } from 'react';
import { Heart, Maximize2, Plus, X, ChevronLeft, ChevronRight, Camera, Sparkles, Upload, RefreshCw, Trash2, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_MEMORIES, MemoryItem } from '../data/memoriesData';

export function MemoriesGallery() {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ranu_real_photos_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 32) return parsed;
      }
    } catch {
      // Storage unavailable or disabled
    }
    return DEFAULT_MEMORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ranu_real_photos_v2', JSON.stringify(memories));
    } catch {
      // Storage quota or restriction
    }
  }, [memories]);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBatchUpload, setShowBatchUpload] = useState(false);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'Sweet Dates' | 'Adventures' | 'Candid Smiles' | 'Milestones'>('Sweet Dates');
  const [newImagePreview, setNewImagePreview] = useState<string>('');

  const singleFileInputRef = useRef<HTMLInputElement | null>(null);
  const batchFileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement | null>(null);


  const categories = ['All', 'Sweet Dates', 'Adventures', 'Candid Smiles', 'Milestones'];

  const filteredMemories = memories.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories(prev =>
      prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleSingleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Bulk / Multiple Photos Upload (1-Click for up to 30+ photos!)
  const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const newItems: MemoryItem[] = [];
    let loadedCount = 0;

    fileList.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

        newItems.push({
          id: `custom_batch_${Date.now()}_${index}`,
          title: formattedTitle || `Beautiful Memory #${memories.length + index + 1}`,
          caption: 'Another precious moment spent with the queen of my heart, Ranu ❤️',
          date: 'Special Moment',
          category: 'Candid Smiles',
          image: result,
          rotation: (Math.random() - 0.5) * 5,
          likes: Math.floor(Math.random() * 50) + 100,
        });

        loadedCount++;
        if (loadedCount === fileList.length) {
          setMemories(prev => [...newItems, ...prev]);
          setShowBatchUpload(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Replace a single photo on a card
  const handleReplacePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReplaceTargetId(id);
    replaceFileInputRef.current?.click();
  };

  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replaceTargetId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setMemories(prev =>
          prev.map(item => (item.id === replaceTargetId ? { ...item, image: result } : item))
        );
        setReplaceTargetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this photo?')) {
      setMemories(prev => prev.filter(item => item.id !== id));
      if (selectedMemoryIndex !== null) setSelectedMemoryIndex(null);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all photos to original 30 romantic presets?')) {
      setMemories(DEFAULT_MEMORIES);
      localStorage.removeItem('ranu_birthday_memories');
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    const newItem: MemoryItem = {
      id: `custom_${Date.now()}`,
      title: newTitle,
      caption: newCaption,
      date: newDate || 'Cherished Moment',
      category: newCategory,
      image: newImagePreview || '/assets/images/polaroid_memory_featured_1793707845627.jpg',
      rotation: (Math.random() - 0.5) * 5,
      likes: 1,
    };

    setMemories([newItem, ...memories]);
    setShowUploadModal(false);
    setNewTitle('');
    setNewCaption('');
    setNewDate('');
    setNewImagePreview('');
  };

  const selectedMemory = selectedMemoryIndex !== null ? filteredMemories[selectedMemoryIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMemoryIndex === null) return;
    setSelectedMemoryIndex(selectedMemoryIndex === 0 ? filteredMemories.length - 1 : selectedMemoryIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMemoryIndex === null) return;
    setSelectedMemoryIndex(selectedMemoryIndex === filteredMemories.length - 1 ? 0 : selectedMemoryIndex + 1);
  };

  return (
    <section id="memories" className="relative py-24 px-6 bg-[#FFF5F7]">
      {/* Hidden file input for quick replace */}
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleReplaceFileChange}
      />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-rose-200/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Chapter 03 · Scrapbook of Us</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950">
              Our Beautiful Memories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-rose-800/80 max-w-xl">
              Every photograph is a love letter written in time. Over 30 treasured snapshots of laughter, sweet glances, and unforgettable adventures with Ranu.
            </p>
          </div>

          {/* Action Buttons for Uploading Photos */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Bulk Upload Button */}
            <button
              onClick={() => batchFileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-rose-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
              title="Select multiple photos at once from your phone or PC"
            >
              <Upload className="h-4 w-4" />
              <span>Bulk Upload Multiple Photos</span>
            </button>
            <input
              ref={batchFileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleBatchUpload}
            />

            {/* Single Add Photo Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-rose-300 px-3.5 py-2.5 text-xs font-semibold text-rose-900 shadow-xs transition-all hover:bg-rose-50 hover:border-rose-400 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Plus className="h-4 w-4 text-rose-500" />
              <span>Add Single Photo</span>
            </button>

            {/* Reset to Default */}
            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-rose-200 px-3 py-2.5 text-xs font-medium text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              title="Reset to sample photos"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Quick Helper Banner (Hindi / Hinglish guidance) */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-rose-100/80 via-pink-50 to-amber-50/60 p-4 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-950">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white font-bold">
              📸
            </span>
            <div>
              <p className="font-semibold text-rose-900">
                Photos kaise lagayein (How to add photos):
              </p>
              <p className="text-slate-600 font-light">
                <strong>Option 1:</strong> Upar <strong>"Bulk Upload Multiple Photos"</strong> dabakar apne phone ya laptop se saari photos ek saath select karein! &nbsp;|&nbsp; <strong>Option 2:</strong> Kisi bhi photo par <strong>"Change"</strong> button dabakar photo badal sakte hain.
              </p>
            </div>
          </div>
          <button
            onClick={() => batchFileInputRef.current?.click()}
            className="shrink-0 rounded-lg bg-white border border-rose-300 px-3 py-1.5 font-semibold text-rose-700 hover:bg-rose-50 shadow-xs text-xs"
          >
            Select Photos Now
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white/80 text-rose-900 border border-rose-200/60 hover:bg-rose-50'
              }`}
            >
              {cat === 'All' ? `All Memories (${memories.length})` : cat}
            </button>
          ))}
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMemories.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedMemoryIndex(index)}
              className="group relative cursor-pointer bg-white p-3.5 pb-6 rounded-sm shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-rose-100/60"
              style={{
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              {/* Washi Tape / Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-rose-200/70 border border-rose-300/40 opacity-80 rotate-1 shadow-xs pointer-events-none" />

              {/* Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-50 rounded-xs">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Hover overlay with Actions: View & Quick Replace */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={(e) => handleReplacePhoto(item.id, e)}
                    className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-rose-700 shadow-md hover:bg-white hover:scale-105 transition-all"
                    title="Change this photo to Ranu's picture"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <span>Change</span>
                  </button>

                  <div className="h-8 w-8 rounded-full bg-white/95 flex items-center justify-center text-rose-600 shadow-md">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Handwritten Style Caption & Date */}
              <div className="mt-4 px-1">
                <div className="flex items-center justify-between text-xs text-rose-700/80 mb-1">
                  <span className="font-medium text-[11px] uppercase tracking-wider">{item.date}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="inline-flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-700 transition-colors"
                      title="Send a heart"
                    >
                      <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      <span>{item.likes}</span>
                    </button>
                    <button
                      onClick={(e) => handleDeleteMemory(item.id, e)}
                      className="text-slate-300 hover:text-rose-600 transition-colors"
                      title="Delete this photo"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-base font-semibold text-rose-950 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-1 font-script text-xl text-rose-800 leading-snug line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Fullscreen Modal */}
        {selectedMemory !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedMemoryIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-rose-200"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemoryIndex(null)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Photo Display */}
                <div className="relative md:col-span-3 bg-neutral-950 flex items-center justify-center min-h-[340px] md:min-h-[480px]">
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className="max-h-[70vh] w-full object-contain"
                    referrerPolicy="no-referrer"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Details & Emotional Caption */}
                <div className="md:col-span-2 p-6 flex flex-col justify-between bg-gradient-to-b from-white to-rose-50/50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-rose-700/80">
                      <span>{selectedMemory.category}</span>
                      <span>{selectedMemory.date}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-rose-950">
                      {selectedMemory.title}
                    </h3>

                    <p className="font-script text-2xl text-rose-800 leading-relaxed">
                      "{selectedMemory.caption}"
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={(e) => handleReplacePhoto(selectedMemory.id, e)}
                        className="inline-flex items-center gap-1.5 text-xs text-rose-700 font-semibold hover:underline"
                      >
                        <Camera className="h-3.5 w-3.5" />
                        <span>Change this photo</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rose-200/60 flex items-center justify-between">
                    <button
                      onClick={(e) => handleLike(selectedMemory.id, e)}
                      className="inline-flex items-center gap-2 rounded-full bg-rose-100 hover:bg-rose-200 px-4 py-2 text-xs font-semibold text-rose-900 transition-colors"
                    >
                      <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                      <span>{selectedMemory.likes} Hearts for Ranu</span>
                    </button>

                    <span className="text-xs text-rose-600/80">
                      Photo {(selectedMemoryIndex ?? 0) + 1} of {filteredMemories.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Single Custom Photo Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-rose-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-rose-600 font-serif text-xl font-bold mb-4">
                <Camera className="h-5 w-5" />
                <span>Add Your Personal Photo</span>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Select Photograph (Apne Phone / Computer Se)
                  </label>
                  <input
                    ref={singleFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSingleImageChange}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                  />
                  {newImagePreview && (
                    <div className="mt-2 h-28 w-28 rounded-lg overflow-hidden border border-rose-200">
                      <img src={newImagePreview} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ranu's Sweet Smile"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Romantic Caption
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. The way your eyes lit up on this special day..."
                    value={newCaption}
                    onChange={e => setNewCaption(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Date / Moment
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. November 2026"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value as any)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none"
                    >
                      <option value="Sweet Dates">Sweet Dates</option>
                      <option value="Adventures">Adventures</option>
                      <option value="Candid Smiles">Candid Smiles</option>
                      <option value="Milestones">Milestones</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-rose-600 px-5 py-2 text-xs font-semibold text-white hover:bg-rose-700 shadow-md shadow-rose-200"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
