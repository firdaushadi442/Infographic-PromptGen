
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Copy, 
  Zap, 
  Type, 
  Sparkles, 
  Check, 
  ImageIcon, 
  Smartphone, 
  Loader2, 
  Layers, 
  Grid, 
  Wand2, 
  Palette 
} from 'lucide-react';
import { 
  STYLES, 
  SUB_STYLES, 
  COLORS, 
  LAYOUT_CATEGORIES, 
  ORIENTATIONS 
} from './constants.tsx';
import { LayoutOption } from './types.ts';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // State pilihan user
  const [selectedStyle, setSelectedStyle] = useState('cartoon');
  const [selectedSubStyle, setSelectedSubStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('vibrant');
  const [selectedLayout, setSelectedLayout] = useState('central-hero');
  const [selectedOrientation, setSelectedOrientation] = useState('portrait'); 
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoConfiguring, setIsAutoConfiguring] = useState(false);

  // Helper untuk pilih item random dari array
  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Helper function to find layout data
  const getLayoutData = (id: string): LayoutOption | null => {
    for (const category of LAYOUT_CATEGORIES) {
      const found = category.options.find(opt => opt.id === id);
      if (found) return found;
    }
    return null;
  };

  // Logic to update the generated prompt
  const updateBasePrompt = useCallback(() => {
    const styleData = STYLES.find(s => s.id === selectedStyle);
    const colorData = COLORS.find(c => c.id === selectedColor);
    const layoutData = getLayoutData(selectedLayout);
    const orientationData = ORIENTATIONS.find(o => o.id === selectedOrientation);
    
    // Cari keyword sub-style jika ada
    let subStyleKeyword = '';
    if (selectedSubStyle && SUB_STYLES[selectedStyle]) {
       const allOptions = SUB_STYLES[selectedStyle].flatMap(cat => cat.options);
       const foundOption = allOptions.find(opt => opt.id === selectedSubStyle);
       if (foundOption) subStyleKeyword = foundOption.keyword;
    }

    const finalStyleKeyword = subStyleKeyword ? `${subStyleKeyword}` : styleData?.keyword;

    const basePrompt = `Create a high-quality professional infographic poster titled "${title || '[INSERT TITLE]'}". 
    
TOPIC/CONTENT CONTEXT: 
${content || '[INSERT CONTENT]'}

VISUAL SETTINGS:
- Style: ${finalStyleKeyword}
- Color Palette: ${colorData?.keyword}
- Composition: ${layoutData?.keyword || 'Balanced layout'}
- Aspect Ratio/Size: ${orientationData?.keyword}

REQUIREMENTS:
- Render quality: 8k resolution, ultra-detailed, unreal engine 5 render style (if 3D) or crisp vector lines (if 2D).
- Typography: Use clean, bold, sans-serif typography for headers. Ensure text layout is legible.
- Elements: Use engaging icons, data visualization charts, and visual metaphors related to the topic.
- Atmosphere: Professional, engaging, and visually balanced. White space usage should be optimized for clarity.

IMPORTANT: Make it look like a finished, award-winning graphic design poster found on Behance or Pinterest. Ensure the text is integrated naturally into the design.`;
    
    setGeneratedPrompt(basePrompt);
  }, [title, content, selectedStyle, selectedSubStyle, selectedColor, selectedLayout, selectedOrientation]);

  // Update prompt whenever dependency changes
  useEffect(() => {
    updateBasePrompt();
  }, [updateBasePrompt]);

  // AI Auto-Configure Logic
  const handleAutoConfigure = () => {
    setIsAutoConfiguring(true);

    setTimeout(() => {
      const text = (title + " " + content).toLowerCase();

      // 1. Orientation Logic - Refined
      let suggestedOrientation = 'portrait';
      if (text.match(/instagram|ig|petak|feed|post/)) {
        suggestedOrientation = 'square';
      } else if (text.match(/youtube|desktop|pc|laptop|presentation|slide|banner|wide|horizontal/)) {
        suggestedOrientation = 'landscape';
      } else if (text.match(/header|website|x header|banner web|top banner/)) {
        suggestedOrientation = 'header';
      } else if (text.match(/pinterest|panjang|pin|infographic vertical/)) {
        suggestedOrientation = 'tall';
      } else if (text.match(/story|tiktok|reel|phone|mobile|reels|shorts|telefon/)) {
        suggestedOrientation = 'portrait';
      } else if (text.match(/poster|a4|print|physical/)) {
        suggestedOrientation = 'portrait-photo';
      } else {
         // Default random fallback for general use
         suggestedOrientation = getRandomItem(['portrait', 'portrait-photo', 'square']);
      }
      setSelectedOrientation(suggestedOrientation);

      // 2. Style Logic - Refined with more granular categories
      let possibleStyles: { style: string; sub: string }[] = [];
      
      // Tech/Digital/Futuristic
      if (text.match(/tech|technology|cyber|digital|future|robot|ai|artificial|code|software|web|app|glass|modern/)) {
          possibleStyles.push({ style: 'tech-neon', sub: 'hud-ui' });
          possibleStyles.push({ style: 'tech-neon', sub: 'circuit' });
          possibleStyles.push({ style: '3d-isometric', sub: 'glass-3d' }); 
          possibleStyles.push({ style: 'flat-vector', sub: 'gradient-flat' });
          possibleStyles.push({ style: '3d-isometric', sub: 'clay-3d' });
      } 
      // Education/Kids/Friendly
      else if (text.match(/sekolah|school|kanak|kids|belajar|murid|education|cikgu|teacher|pelajar|student|anak|friendly|fun|playful/)) {
          possibleStyles.push({ style: 'cartoon', sub: 'school-illus' });
          possibleStyles.push({ style: 'cartoon', sub: 'doodle-cartoon' });
          possibleStyles.push({ style: 'cartoon', sub: 'cute-cartoon' });
          possibleStyles.push({ style: 'cartoon', sub: 'kawaii' });
          possibleStyles.push({ style: 'paper-cut', sub: 'origami' });
          possibleStyles.push({ style: 'cartoon', sub: 'sticker-style' });
      } 
      // Business/Corporate/Finance
      else if (text.match(/bisnes|korporat|office|business|profesional|kewangan|finance|money|startup|corporate|bank|invest|investment|marketing|sales/)) {
          possibleStyles.push({ style: 'flat-vector', sub: 'corp-memphis' });
          possibleStyles.push({ style: 'flat-vector', sub: 'clean-outline' });
          possibleStyles.push({ style: '3d-isometric', sub: 'bright-studio' });
          possibleStyles.push({ style: 'cartoon', sub: 'corporate-cartoon' });
          possibleStyles.push({ style: 'cartoon', sub: 'isometric-cartoon' });
      } 
      // Arts/Classic/History
      else if (text.match(/sejarah|history|art|seni|lama|klasik|classic|budaya|culture|vintage|retro|painting|traditional|heritage/)) {
          possibleStyles.push({ style: 'hand-drawn', sub: 'pencil-sketch' });
          possibleStyles.push({ style: 'hand-drawn', sub: 'watercolor' });
          possibleStyles.push({ style: 'paper-cut', sub: 'layered-depth' });
          possibleStyles.push({ style: 'cartoon', sub: 'storybook' });
      } 
      // Natural/Health/Environment
      else if (text.match(/alam|nature|environment|hijau|green|pokok|tree|health|sihat|food|organic|bumi|earth/)) {
          possibleStyles.push({ style: 'hand-drawn', sub: 'watercolor' });
          possibleStyles.push({ style: 'paper-cut', sub: 'cardboard' });
          possibleStyles.push({ style: '3d-isometric', sub: 'wood-block' });
          possibleStyles.push({ style: 'cartoon', sub: 'soft-rounded' });
      }
      // General Fallback
      if (possibleStyles.length === 0) {
          possibleStyles.push({ style: '3d-isometric', sub: 'clay-3d' });
          possibleStyles.push({ style: 'cartoon', sub: 'flat-cartoon' });
          possibleStyles.push({ style: 'flat-vector', sub: 'geo-shapes' });
          possibleStyles.push({ style: 'cartoon', sub: 'line-art-cartoon' });
          possibleStyles.push({ style: 'paper-cut', sub: 'layered-depth' });
      }
      
      const selectedStyleObj = getRandomItem(possibleStyles);
      setSelectedStyle(selectedStyleObj.style);
      setSelectedSubStyle(selectedStyleObj.sub);

      // 3. Color Logic - Refined
      let possibleColors: string[] = [];
      if (text.match(/alam|nature|pokok|hijau|green|environment|outdoor|bumi|health/)) {
        possibleColors = ['earth', 'tropical', 'pastel'];
      } else if (text.match(/laut|ocean|air|water|sejuk|cold|sky|langit|blue/)) {
        possibleColors = ['corporate', 'pastel', 'vibrant'];
      } else if (text.match(/neon|cyber|game|gaming|dark|night|party/)) {
        possibleColors = ['neon-cyber', 'dark-mode', 'galaxy'];
      } else if (text.match(/profesional|kerja|office|bank|finance|law|legal|corporate|trust/)) {
        possibleColors = ['corporate', 'monochrome', 'dark-mode'];
      } else if (text.match(/panas|summer|hot|sun|fire|api|tropical|energy/)) {
        possibleColors = ['tropical', 'vibrant', 'earth'];
      } else if (text.match(/luxury|premium|expensive|gold|silver|exclusive|diamond/)) {
        possibleColors = ['dark-mode', 'monochrome', 'corporate'];
      } else if (text.match(/kids|kanak|fun|playful|toys|candy/)) {
        possibleColors = ['vibrant', 'pastel', 'tropical'];
      } else {
        possibleColors = ['vibrant', 'pastel', 'corporate', 'dark-mode', 'earth', 'monochrome', 'tropical', 'galaxy', 'neon-cyber'];
      }
      setSelectedColor(getRandomItem(possibleColors));

      // 4. Layout Logic - Refined
      let possibleLayouts: string[] = [];
      if (text.match(/langkah|step|cara|proses|tutorial|sop|how to|sequence|aliran/)) {
        possibleLayouts = ['step-by-step', 'roadmap', 'zig-zag-flow', 'process-flowchart', 'circular-cycle'];
      } else if (text.match(/banding|vs|beza|compare|comparison|pro|con|advantage/)) {
        possibleLayouts = ['comparison', 'split-screen', 'before-after'];
      } else if (text.match(/data|statistik|stats|nombor|number|chart|report|graph|laporan|dashboard/)) {
        possibleLayouts = ['stats-dashboard', 'grid-bento', 'hierarchy-pyramid', 'isometric-layout'];
      } else if (text.match(/senarai|list|tips|points|bullet/)) {
        possibleLayouts = ['vertical-stack', 'list-icon', 'grid-layout', 'card-based', 'f-pattern'];
      } else if (text.match(/idea|mind|concept|brainstorm|connection|link/)) {
        possibleLayouts = ['mind-map', 'concept-web', 'central-hero'];
      } else if (text.match(/masalah|problem|solution|sebab|cause|effect/)) {
        possibleLayouts = ['problem-solution', 'cause-effect'];
      } else if (text.match(/soalan|jawapan|faq|q&a/)) {
        possibleLayouts = ['faq-layout', 'list-icon'];
      } else {
        // Balanced, versatile layouts for general content
        possibleLayouts = ['central-hero', 'grid-bento', 'modular-layout', 'z-pattern', 'mobile-first', 'illustration-centered', 'grid-bento'];
      }
      setSelectedLayout(getRandomItem(possibleLayouts));

      setIsAutoConfiguring(false);
    }, 800); 
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 selection:bg-indigo-100">
      
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-3">
          Infographic <span className="text-indigo-600">PromptGen</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          Jana prompt Gemini AI (Banana Pro) yang tepat untuk menghasilkan poster infografik yang menakjubkan.
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-8 pb-10">
          
          {/* Section 1: Content Input */}
          <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-700">
              <Type className="w-5 h-5 text-indigo-500" />
              1. Isi Kandungan Poster
            </h2>
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Tajuk Utama</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Manfaat Minum Air Putih"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Nota / Poin Penting</label>
                <textarea 
                  placeholder="Contoh: 1. Meningkatkan tenaga, 2. Kulit lebih cantik, 3. Membantu penghadaman..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-36 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            {/* AI Auto-Configure Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleAutoConfigure}
                disabled={!title || !content || isAutoConfiguring}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-sm ${
                  !title || !content 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : isAutoConfiguring
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95'
                }`}
              >
                {isAutoConfiguring ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sedang Mencari Idea...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    ✨ Auto-Pilih (Tekan Lagi Untuk Tukar)
                  </>
                )}
              </button>
              {(!title || !content) && (
                <p className="text-xs text-center text-slate-400 mt-3">
                  *Masukkan tajuk & nota dahulu. Tekan berkali-kali untuk dapatkan kombinasi berbeza!
                </p>
              )}
            </div>
          </section>

          {/* Section 2: Orientation Selection */}
          <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-700">
              <Smartphone className="w-5 h-5 text-purple-500" />
              2. Orientasi & Saiz
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ORIENTATIONS.map((orient) => (
                <button
                  key={orient.id}
                  onClick={() => setSelectedOrientation(orient.id)}
                  className={`p-4 rounded-2xl text-center border-2 transition-all duration-200 flex flex-col items-center justify-center relative min-h-[110px] ${
                    selectedOrientation === orient.id 
                      ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  {orient.icon}
                  <div className="font-bold text-slate-800 text-xs mb-1">{orient.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{orient.desc}</div>
                  {selectedOrientation === orient.id && (
                     <div className="absolute top-3 right-3 text-purple-600">
                     <Check className="w-3 h-3" />
                   </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Section 3: Style Selection */}
          <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-700">
              <ImageIcon className="w-5 h-5 text-pink-500" />
              3. Gaya Visual (Style)
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style.id);
                    setSelectedSubStyle('');
                  }}
                  className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 relative overflow-hidden group ${
                    selectedStyle === style.id 
                      ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' 
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-slate-800 mb-1">{style.label}</div>
                  <div className="text-xs text-slate-500 leading-tight">{style.desc}</div>
                  {selectedStyle === style.id && (
                    <div className="absolute top-3 right-3 text-indigo-600">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Sub-Style Selection */}
            {SUB_STYLES[selectedStyle] && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300 shadow-inner">
                <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold text-sm">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Pilih Variasi {STYLES.find(s => s.id === selectedStyle)?.label}:
                </div>
                
                <div className="space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar pr-3">
                  {SUB_STYLES[selectedStyle].map((group, idx) => (
                    <div key={idx}>
                      <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 sticky top-0 bg-slate-50/95 backdrop-blur-sm py-1 z-10">
                        {group.category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {group.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedSubStyle(selectedSubStyle === option.id ? '' : option.id)}
                            className={`p-4 rounded-xl text-left text-sm transition-all border relative ${
                              selectedSubStyle === option.id
                                ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500 text-indigo-700 font-semibold'
                                : 'bg-white border-slate-200 hover:border-slate-400 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{option.label}</span>
                            {selectedSubStyle === option.id && <Check className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedSubStyle === '' && (
                  <p className="text-[10px] text-slate-400 mt-4 italic text-center uppercase tracking-widest">
                    *Gaya umum akan digunakan secara automatik jika variasi tidak dipilih
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Section 4: Color Selection */}
          <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-700">
              <Palette className="w-5 h-5 text-teal-500" />
              4. Tema Warna
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-200 relative ${
                    selectedColor === color.id 
                      ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500' 
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-slate-800 mb-1">{color.label}</div>
                  <div className="text-xs text-slate-500 leading-tight">{color.desc}</div>
                  {selectedColor === color.id && (
                     <div className="absolute top-3 right-3 text-teal-600">
                     <Check className="w-4 h-4" />
                   </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Section 5: Layout Selection */}
          <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-700">
              <Grid className="w-5 h-5 text-orange-500" />
              5. Susun Atur (Layout)
            </h2>
            <div className="space-y-8 max-h-[600px] overflow-y-auto custom-scrollbar pr-3">
              {LAYOUT_CATEGORIES.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.options.map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => setSelectedLayout(layout.id)}
                        className={`p-5 rounded-2xl text-left border-2 transition-all duration-200 relative ${
                          selectedLayout === layout.id 
                            ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' 
                            : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-slate-800 mb-1">{layout.label}</div>
                        <div className="text-xs text-slate-500 leading-tight">{layout.desc}</div>
                        {selectedLayout === layout.id && (
                          <div className="absolute top-3 right-3 text-orange-600">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Output Card */}
        <div className="lg:col-span-5 sticky top-8">
          
          <div className="bg-slate-900 text-white rounded-[2.5rem] shadow-2xl p-8 overflow-hidden relative border border-slate-700">
            <div className="absolute top-0 right-0 p-48 bg-indigo-600 rounded-full blur-[80px] opacity-20 -mr-24 -mt-24 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="font-bold text-xl flex items-center gap-2 tracking-tight">
                <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                Prompt Hasil
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-400">
               {ORIENTATIONS.find(o => o.id === selectedOrientation)?.label || 'Format'}
              </span>
            </div>

            <div className="bg-slate-800/40 p-6 rounded-3xl text-slate-300 font-mono text-[13px] leading-relaxed border border-slate-700/50 mb-8 max-h-[500px] overflow-y-auto custom-scrollbar relative z-10 group">
              {generatedPrompt.split('\n').map((line, i) => (
                <p key={i} className="mb-2 last:mb-0">{line || '\u00A0'}</p>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
            </div>

            <button
              onClick={copyToClipboard}
              className={`w-full py-5 rounded-[1.5rem] font-bold text-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl relative z-10 active:scale-95 ${
                isCopied 
                  ? 'bg-green-500 hover:bg-green-600 text-white transform scale-[1.02]' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.02]'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-7 h-7" />
                  Berjaya Disalin!
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  Salin Prompt
                </>
              )}
            </button>
            
            <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed tracking-wide z-10 relative">
              TIP: Pilih gaya visual utama dahulu, kemudian teroka variasi spesifik yang muncul dalam panel pilihan gaya untuk hasil yang lebih unik.
            </p>
          </div>

          {/* Contextual Tips */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 mt-8 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Panduan Kreatif:
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs">1</span>
                <span>Untuk projek pendidikan, gaya <strong className="text-slate-900">Cartoon &gt; School Illustration</strong> memberikan visual yang mesra pengguna.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs">2</span>
                <span>Layout <strong className="text-slate-900">Roadmap</strong> sangat berkesan untuk menceritakan sejarah atau evolusi sesuatu topik.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center font-bold text-xs">3</span>
                <span>Gunakan butang <strong className="text-slate-900">Auto-Pilih</strong> berkali-kali jika anda buntu untuk mendapatkan inspirasi gabungan gaya.</span>
              </li>
            </ul>
          </div>

        </div>

      </main>

      <footer className="max-w-7xl mx-auto py-12 border-t border-slate-200 mt-12 text-center text-slate-400 text-xs tracking-widest uppercase font-medium">
        Infographic PromptGen &bull; Powered by Gemini AI Engine &bull; 2024
      </footer>
    </div>
  );
};

export default App;
