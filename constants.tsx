
import React from 'react';
import { 
  LayoutTemplate, 
  Smartphone, 
  Monitor, 
  RectangleVertical, 
  RectangleHorizontal, 
  Crop, 
  Frame 
} from 'lucide-react';
import { 
  StyleOption, 
  SubStyleGroup, 
  ColorOption, 
  LayoutCategory, 
  OrientationOption 
} from './types';

export const STYLES: StyleOption[] = [
  { id: 'cartoon', label: 'Cartoon Style', desc: 'Ceria, menyeronokkan, watak ekspresif', keyword: 'Cartoon illustration style, vibrant colors, fun atmosphere' },
  { id: '3d-isometric', label: '3D Isometric', desc: 'Moden, terapung, kemasan 3D licin', keyword: '3D isometric render, cute 3D icons, blender 3D style' },
  { id: 'flat-vector', label: 'Flat Vector', desc: 'Minimalis, bersih, profesional', keyword: 'Flat vector art, clean lines, minimalist design' },
  { id: 'tech-neon', label: 'Tech / Cyber', desc: 'Futuristik, gelap dengan cahaya neon', keyword: 'Cyberpunk style, futuristic data visualization' },
  { id: 'hand-drawn', label: 'Hand Drawn', desc: 'Artistik, lakaran pensel/krayon', keyword: 'Hand-drawn sketch style, textured paper background' },
  { id: 'paper-cut', label: 'Paper Cutout', desc: 'Seni lapisan kertas, bertekstur', keyword: 'Paper cutout craft style, layered paper effect' },
];

export const SUB_STYLES: Record<string, SubStyleGroup[]> = {
  'cartoon': [
    { category: '🎨 Umum / Popular', options: [
      { id: 'flat-cartoon', label: 'Flat Cartoon', keyword: 'Flat cartoon style, simple shapes, solid colors, educational and corporate look' },
      { id: 'line-art-cartoon', label: 'Line Art Cartoon', keyword: 'Line art cartoon, thin black lines, minimal colors, neat and modern' },
      { id: 'outline-stroke', label: 'Outline / Stroke', keyword: 'Thick outline cartoon, focus on outer strokes, pastel colors' },
      { id: 'doodle-cartoon', label: 'Doodle Cartoon', keyword: 'Hand-drawn doodle cartoon style, playful scribbles, casual vibe' },
      { id: 'cute-cartoon', label: 'Cute Cartoon', keyword: 'Cute cartoon style, big eyes, cheerful expressions, general audience appeal' },
    ]},
    { category: '🧸 Comel / Friendly', options: [
      { id: 'kawaii', label: 'Kawaii Style', keyword: 'Kawaii Japanese style, soft pastel colors, adorable mascots, sparkly effects' },
      { id: 'soft-rounded', label: 'Soft Rounded', keyword: 'Soft rounded cartoon shapes, friendly and approachable, no sharp edges' },
      { id: 'sticker-style', label: 'Sticker Style', keyword: 'Sticker art style, white borders around characters, pop art feel' },
      { id: 'bubble-char', label: 'Bubble Character', keyword: 'Bubble-shaped characters, inflated look, playful and bouncy' },
    ]},
    { category: '🖍️ Pendidikan / Sekolah', options: [
      { id: 'school-illus', label: 'School Illustration', keyword: 'Modern textbook illustration style, student and teacher characters, educational context' },
      { id: 'whiteboard', label: 'Whiteboard Art', keyword: 'Whiteboard marker style, drawn on white surface, training module look' },
      { id: 'info-char-pack', label: 'Info Character Pack', keyword: 'Generic infographic character pack style, versatile poses, Canva-like aesthetics' },
      { id: 'isometric-cartoon', label: 'Isometric Cartoon', keyword: 'Isometric cartoon view, 3D-like angles but flat coloring, professional structure' },
    ]},
    { category: '🎬 3D Unik (Non-Pixar)', options: [
      { id: 'claymation', label: 'Claymation', keyword: 'Claymation style, plasticine texture, stop-motion look, handmade feel' },
      { id: 'low-poly', label: 'Low Poly', keyword: 'Low poly cartoon, geometric polygon shapes, sharp facets, modern digital art' },
      { id: '3d-flat', label: '3D Flat Render', keyword: '3D render with flat shading, matte finish, digital infographic style' },
    ]},
    { category: '📖 Buku / Cerita', options: [
      { id: 'storybook', label: 'Storybook', keyword: 'Children\'s storybook illustration, soft textures, emotional and whimsical' },
      { id: 'comic-style', label: 'Comic Style', keyword: 'Comic book style, halftone patterns, speech bubbles, dynamic panels' },
      { id: 'manga-simple', label: 'Manga Simplified', keyword: 'Simplified manga style, clean ink lines, minimal shading, expressive' },
    ]},
    { category: '🧠 Moden & Trendy', options: [
      { id: 'minimal-cartoon', label: 'Minimal Cartoon', keyword: 'Ultra-minimalist cartoon, abstract representations, focus on message' },
      { id: 'abstract-cartoon', label: 'Abstract Cartoon', keyword: 'Abstract cartoon shapes, quirky proportions, consistent artistic style' },
      { id: 'corporate-cartoon', label: 'Corporate Cartoon', keyword: 'Big tech corporate art style, flat human characters with exaggerated limbs, blue and purple tones' },
    ]},
  ],
  '3d-isometric': [
    { category: '🏗️ Struktur & Material', options: [
      { id: 'clay-3d', label: 'Claymorphism', keyword: 'Soft clay 3D render, rounded edges, matte finish, friendly look' },
      { id: 'glass-3d', label: 'Glassmorphism', keyword: 'Frosted glass 3D elements, transparency, blur effects, premium tech look' },
      { id: 'plastic-3d', label: 'Glossy Plastic', keyword: 'High gloss plastic 3D, toy-like shine, vibrant colors' },
      { id: 'wood-block', label: 'Wooden Blocks', keyword: 'Wooden block toy style, natural wood texture, eco-friendly vibe' },
    ]},
    { category: '💡 Pencahayaan', options: [
      { id: 'neon-iso', label: 'Neon Isometric', keyword: 'Dark background with glowing neon edges, cyber city vibe' },
      { id: 'bright-studio', label: 'Bright Studio', keyword: 'Bright studio lighting, soft shadows, clean white background, product design look' },
    ]}
  ],
  'flat-vector': [
    { category: '🏢 Korporat', options: [
      { id: 'corp-memphis', label: 'Corporate Memphis', keyword: 'Corporate Memphis art, flat characters with long limbs, joyful and diverse' },
      { id: 'clean-outline', label: 'Clean Outline', keyword: 'Monoline vector art, consistent line weight, technical drawing feel' },
    ]},
    { category: '🎨 Artistik', options: [
      { id: 'geo-shapes', label: 'Geometric Shapes', keyword: 'Bauhaus inspired, simple geometric shapes composition, abstract vector' },
      { id: 'gradient-flat', label: 'Gradient Vector', keyword: 'Flat vector with subtle gradients, mesh gradients, modern app icon style' },
    ]}
  ],
  'tech-neon': [
    { category: '💾 Digital', options: [
      { id: 'hud-ui', label: 'HUD Interface', keyword: 'Futuristic HUD interface, thin data lines, sci-fi screen overlays' },
      { id: 'circuit', label: 'Circuit Board', keyword: 'Glowing circuit board patterns, microchip aesthetics, gold and green traces' },
      { id: 'matrix', label: 'Matrix Code', keyword: 'Digital rain code aesthetic, binary data stream, hacker vibe' },
    ]},
    { category: '🌌 Retro Future', options: [
      { id: 'synthwave', label: 'Synthwave 80s', keyword: '80s Synthwave style, retro grid landscape, sunset gradients, chrome text' },
    ]}
  ],
  'paper-cut': [
    { category: '✂️ Kraftangan', options: [
      { id: 'layered-depth', label: 'Deep Layers', keyword: 'Multi-layered paper cut, deep shadows, tunnel book effect' },
      { id: 'origami', label: 'Origami Fold', keyword: 'Origami style, folded paper creases, geometric angular shapes' },
      { id: 'cardboard', label: 'Cardboard Texture', keyword: 'Recycled cardboard texture, rough edges, eco-craft look' },
    ]}
  ],
  'hand-drawn': [
    { category: '✏️ Media', options: [
      { id: 'pencil-sketch', label: 'Pencil Sketch', keyword: 'Graphite pencil sketch, rough shading, sketchbook paper texture' },
      { id: 'watercolor', label: 'Watercolor', keyword: 'Watercolor painting, wet ink bleed, soft artistic washes' },
      { id: 'chalkboard', label: 'Chalkboard', keyword: 'White chalk on blackboard, dusty texture, cafe menu style' },
    ]}
  ]
};

export const COLORS: ColorOption[] = [
  { id: 'vibrant', label: 'Vibrant & Pop', desc: 'Cerah, menarik perhatian', keyword: 'Vibrant and saturated colors, orange and purple gradients, high contrast' },
  { id: 'pastel', label: 'Soft Pastel', desc: 'Lembut, tenang, estetik', keyword: 'Soft pastel color palette, macaron colors, light pink and mint green, airy atmosphere' },
  { id: 'corporate', label: 'Corporate Blue', desc: 'Profesional, amanah', keyword: 'Professional deep blue and white theme, corporate branding colors, clean gold accents' },
  { id: 'dark-mode', label: 'Dark Mode', desc: 'Elegan, latar belakang gelap', keyword: 'Dark mode aesthetics, matte black background with white text, elegant gold or silver highlights' },
  { id: 'earth', label: 'Earth Tones', desc: 'Semula jadi, hijau & coklat', keyword: 'Earthy tones, warm beige, forest green and terracotta, nature-inspired palette' },
  { id: 'monochrome', label: 'Monochrome', desc: 'Hitam, putih & kelabu', keyword: 'Monochromatic grayscale palette, black and white photography style, high contrast, timeless and elegant' },
  { id: 'tropical', label: 'Tropical', desc: 'Ceria, hijau & oren tropika', keyword: 'Tropical color palette, lush jungle greens, bright sunny yellows, vibrant coral pinks, exotic summer atmosphere' },
  { id: 'galaxy', label: 'Galaxy / Space', desc: 'Ungu gelap, bintang & kosmos', keyword: 'Galaxy space color palette, deep purple and dark blue gradients, starry nebula effects, cosmic dust, mystical atmosphere' },
  { id: 'neon-cyber', label: 'Neon Cyberpunk', desc: 'Gelap dengan neon terang', keyword: 'Neon cyberpunk palette, deep black background with glowing hot pink, electric blue, and lime green accents' },
];

export const LAYOUT_CATEGORIES: LayoutCategory[] = [
  {
    name: "📐 Susun Atur Standard",
    options: [
      { id: 'vertical-stack', label: 'Vertical Stack', desc: 'Isi dari atas ke bawah (A4/WhatsApp)', keyword: 'Vertical stack layout, top-to-bottom logical flow' },
      { id: 'horizontal-flow', label: 'Horizontal Flow', desc: 'Kiri ke kanan (Banner/Slide)', keyword: 'Horizontal flow layout, left-to-right progression' },
      { id: 'grid-layout', label: 'Grid Layout', desc: 'Kotak seimbang & kemas', keyword: 'Structured grid layout, balanced columns and rows' },
      { id: 'z-pattern', label: 'Z-Pattern', desc: 'Arah mata membaca (Promosi)', keyword: 'Z-pattern layout, visual hierarchy flow' },
      { id: 'f-pattern', label: 'F-Pattern', desc: 'Teks + Ikon (Artikel)', keyword: 'F-pattern layout, text-heavy reading flow' },
    ]
  },
  {
    name: "🔁 Proses & Aliran",
    options: [
      { id: 'step-by-step', label: 'Step / Timeline', desc: 'Langkah 1 → 2 → 3 (SOP)', keyword: 'Timeline layout, sequential steps, winding path style' },
      { id: 'process-flowchart', label: 'Process Flowchart', desc: 'Kotak + Anak Panah', keyword: 'Flowchart diagram style, connected nodes with arrows' },
      { id: 'circular-cycle', label: 'Circular / Cycle', desc: 'Proses berulang/Kitaran', keyword: 'Circular cycle layout, repeating process loop' },
      { id: 'zig-zag-flow', label: 'Zig-Zag Flow', desc: 'Visual dinamik, elak bosan', keyword: 'Zig-zag path layout, dynamic progression' },
      { id: 'roadmap', label: 'Roadmap', desc: 'Laluan Mula → Akhir', keyword: 'Roadmap style, winding path from start to finish' },
    ]
  },
  {
    name: "📊 Maklumat & Data",
    options: [
      { id: 'comparison', label: 'Comparison', desc: 'Banding A vs B (Pro/Kontra)', keyword: 'Split screen comparison, side-by-side vs style' },
      { id: 'before-after', label: 'Before – After', desc: 'Perubahan & Impak', keyword: 'Before and after layout, transformation comparison' },
      { id: 'stats-dashboard', label: 'Stats / Dashboard', desc: 'Nombor besar & ikon', keyword: 'Dashboard style, big numbers and icons data visualization' },
      { id: 'hierarchy-pyramid', label: 'Hierarchy / Pyramid', desc: 'Dari umum → khusus', keyword: 'Pyramid hierarchy layout, triangle structure' },
      { id: 'list-icon', label: 'List + Icon', desc: 'Senarai mudah faham', keyword: 'List style with icons, clear bullet points' },
    ]
  },
  {
    name: "🧠 Konsep & Pembelajaran",
    options: [
      { id: 'mind-map', label: 'Mind Map', desc: 'Idea tengah bercabang', keyword: 'Mind map layout, central idea with branches' },
      { id: 'concept-web', label: 'Concept Web', desc: 'Hubungan idea (Peta Konsep)', keyword: 'Concept web diagram, interconnected nodes' },
      { id: 'cause-effect', label: 'Cause & Effect', desc: 'Sebab → Akibat', keyword: 'Cause and effect diagram, fishbone style' },
      { id: 'problem-solution', label: 'Problem → Solution', desc: 'Isu & Penyelesaian', keyword: 'Problem solution layout, two-part structure' },
      { id: 'faq-layout', label: 'FAQ Layout', desc: 'Soalan & Jawapan', keyword: 'FAQ style, Q&A blocks layout' },
    ]
  },
  {
    name: "🎨 Kreatif & Visual",
    options: [
      { id: 'central-hero', label: 'Central Hero', desc: 'Imej utama di tengah', keyword: 'Central composition, main subject in the center surrounded by info bubbles' },
      { id: 'illustration-centered', label: 'Illustration-Centered', desc: 'Cerita bergambar', keyword: 'Illustration-centered layout, main visual storytelling focus' },
      { id: 'grid-bento', label: 'Bento Grid', desc: 'Kotak moden & rapi', keyword: 'Bento box grid layout, organized modular sections, clean separation of data' },
      { id: 'card-based', label: 'Card-Based Layout', desc: 'Isi dalam kad', keyword: 'Card-based UI design, modular content cards' },
      { id: 'modular-layout', label: 'Modular Layout', desc: 'Blok boleh susun', keyword: 'Modular block layout, masonry grid style' },
      { id: 'isometric-layout', label: 'Isometric Layout', desc: '3D ringan (STEM)', keyword: 'Isometric 3D layout, engineering view, technical look' },
      { id: 'character-guided', label: 'Character-Guided', desc: 'Watak tunjuk info', keyword: 'Character guided layout, mascot pointing to info' },
    ]
  },
  {
    name: "📱 Digital Khas",
    options: [
      { id: 'mobile-first', label: 'Mobile-First', desc: 'Teks besar, scroll senang', keyword: 'Mobile-first vertical layout, big text, scrollable design' },
      { id: 'carousel-layout', label: 'Carousel Layout', desc: 'Slide demi slide (IG)', keyword: 'Carousel slide layout aesthetic, swipeable sequence look' },
      { id: 'split-screen', label: 'Split Screen', desc: '50:50 Visual & Teks', keyword: 'Split screen layout, 50/50 division' },
      { id: 'dark-mode-layout', label: 'Dark Mode Layout', desc: 'Latar gelap (Skrin)', keyword: 'Dark mode UI layout, high contrast interface' },
      { id: 'interactive-style', label: 'Interactive Style', desc: 'Butang & Highlight', keyword: 'Interactive UI style, buttons and visual cues, app interface look' },
    ]
  }
];

export const ORIENTATIONS: OrientationOption[] = [
  { id: 'square', label: 'Square (1:1)', desc: 'Instagram Post', keyword: 'Square aspect ratio 1:1, suitable for Instagram feed', icon: <LayoutTemplate className="w-6 h-6 mb-2 text-indigo-500" /> },
  { id: 'portrait', label: 'Portrait (9:16)', desc: 'TikTok / Story / Reels', keyword: 'Vertical aspect ratio 9:16, tall format, suitable for mobile screens', icon: <Smartphone className="w-6 h-6 mb-2 text-purple-500" /> },
  { id: 'landscape', label: 'Landscape (16:9)', desc: 'YouTube / Desktop', keyword: 'Horizontal aspect ratio 16:9, wide format, cinematic view', icon: <Monitor className="w-6 h-6 mb-2 text-blue-500" /> },
  { id: 'portrait-photo', label: 'Portrait (3:4)', desc: 'Poster / FB Post', keyword: 'Vertical aspect ratio 3:4, standard photographic portrait', icon: <RectangleVertical className="w-6 h-6 mb-2 text-pink-500" /> },
  { id: 'landscape-photo', label: 'Landscape (4:3)', desc: 'Blog / Standard Photo', keyword: 'Horizontal aspect ratio 4:3, standard digital photography', icon: <RectangleHorizontal className="w-6 h-6 mb-2 text-teal-500" /> },
  { id: 'tall', label: 'Tall (2:3)', desc: 'Pinterest Pin', keyword: 'Tall vertical aspect ratio 2:3, suitable for Pinterest', icon: <Crop className="w-6 h-6 mb-2 text-red-500" /> },
  { id: 'ultrawide', label: 'Ultrawide (21:9)', desc: 'Panoramic / Game', keyword: 'Ultrawide aspect ratio 21:9, panoramic view', icon: <Frame className="w-6 h-6 mb-2 text-orange-500" /> },
  { id: 'header', label: 'Header (3:1)', desc: 'Website / X Banner', keyword: 'Wide header aspect ratio 3:1, horizontal panoramic layout, website banner style', icon: <RectangleHorizontal className="w-6 h-6 mb-2 text-cyan-600" /> },
];
