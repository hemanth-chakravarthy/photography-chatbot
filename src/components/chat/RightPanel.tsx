import ReactMarkdown from "react-markdown";
import { Message } from "@/types/chat";

const PHOTO_IMAGES = [
  { key: "portrait",    keywords: ["portrait", "person", "face", "model", "selfie", "headshot", "people"],         url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&h=400&fit=crop&auto=format", label: "Portrait",      tag: "f/1.8" },
  { key: "landscape",   keywords: ["landscape", "mountain", "scenery", "panorama", "vista", "nature", "outdoor"],  url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=400&fit=crop&auto=format", label: "Landscape",     tag: "f/11"  },
  { key: "night",       keywords: ["night", "dark", "star", "milky way", "low light", "astrophoto", "moon"],       url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&h=400&fit=crop&auto=format", label: "Night Sky",     tag: "f/2.8" },
  { key: "street",      keywords: ["street", "urban", "city", "architecture", "building", "road", "downtown"],     url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&h=400&fit=crop&auto=format", label: "Street",        tag: "f/5.6" },
  { key: "wildlife",    keywords: ["bird", "animal", "wildlife", "wildlife", "dog", "cat", "lion", "eagle", "insect", "macro", "creature"], url: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=700&h=400&fit=crop&auto=format", label: "Wildlife",  tag: "f/4"   },
  { key: "golden",      keywords: ["golden hour", "golden", "sunset", "sunrise", "dusk", "dawn", "warm light"],    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&h=400&fit=crop&auto=format", label: "Golden Hour",   tag: "f/8"   },
  { key: "wedding",     keywords: ["wedding", "bride", "groom", "ceremony", "event", "couple"],                    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=400&fit=crop&auto=format", label: "Wedding",       tag: "f/2"   },
  { key: "food",        keywords: ["food", "meal", "restaurant", "dish", "drink", "coffee", "cooking"],            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=400&fit=crop&auto=format", label: "Food",          tag: "f/3.5" },
  { key: "travel",      keywords: ["travel", "beach", "ocean", "sea", "tropical", "vacation", "island"],           url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=400&fit=crop&auto=format", label: "Travel",        tag: "f/9"   },
  { key: "sports",      keywords: ["sport", "action", "fast", "motion blur", "athlete", "running", "jump"],        url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&h=400&fit=crop&auto=format", label: "Sports",        tag: "f/6.3" },
  { key: "forest",      keywords: ["forest", "tree", "woods", "jungle", "green", "foggy", "misty"],                url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&h=400&fit=crop&auto=format", label: "Forest",        tag: "f/7.1" },
  { key: "aerial",      keywords: ["aerial", "drone", "sky", "above", "top", "bird eye", "high"],                  url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=700&h=400&fit=crop&auto=format", label: "Aerial",        tag: "f/10"  },
  { key: "product",     keywords: ["product", "studio", "flat lay", "object", "minimalist", "commercial"],         url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=700&h=400&fit=crop&auto=format", label: "Product",       tag: "f/16"  },
  { key: "flower",     keywords: ["flower", "floral", "petal", "bloom", "garden", "rose", "tulip", "plant", "botanical", "spring"], url: "https://images.unsplash.com/photo-1490750967868-88df5691cc8f?w=700&h=400&fit=crop&auto=format", label: "Flowers",       tag: "f/2.2" },
  { key: "snow",       keywords: ["snow", "winter", "ice", "cold", "frost", "frozen", "blizzard"],                                   url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=700&h=400&fit=crop&auto=format", label: "Winter",        tag: "f/8"   },
  { key: "rain",       keywords: ["rain", "water drop", "wet", "puddle", "storm", "monsoon", "splash"],                              url: "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=700&h=400&fit=crop&auto=format", label: "Rain & Water",  tag: "f/5.6" },
  { key: "arch",       keywords: ["architecture", "interior", "building", "bridge", "structure", "staircase", "church", "mosque"],   url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=400&fit=crop&auto=format", label: "Architecture",  tag: "f/11"  },
  { key: "desert",     keywords: ["desert", "sand", "dune", "dry", "arid", "cactus", "sahara"],                                      url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&h=400&fit=crop&auto=format", label: "Desert",        tag: "f/9"   },
  { key: "underwater", keywords: ["underwater", "ocean floor", "diving", "coral", "fish", "submarine", "sea life"],                  url: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=700&h=400&fit=crop&auto=format", label: "Underwater",    tag: "f/4"   },
  { key: "fire",       keywords: ["fire", "smoke", "flame", "light trail", "sparkle", "firework", "long exposure"],                  url: "https://images.unsplash.com/photo-1486551937199-baf066a6c939?w=700&h=400&fit=crop&auto=format", label: "Light Trails",  tag: "f/16"  },
  { key: "concert",    keywords: ["concert", "music", "stage", "performer", "crowd", "festival", "event photography"],              url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&h=400&fit=crop&auto=format", label: "Concert",       tag: "f/2.8" },
];

/** Match image by keyword in user message + AI response, fallback to hash */
function pickImage(id: string, content: string): typeof PHOTO_IMAGES[0] {
  const text = content.toLowerCase();
  // Try to find a matching category by keywords
  for (const img of PHOTO_IMAGES) {
    if (img.keywords.some((kw) => text.includes(kw))) {
      return img;
    }
  }
  // Fallback: deterministic hash on message ID
  const hash = parseInt(id.slice(-4), 16) || 0;
  return PHOTO_IMAGES[hash % PHOTO_IMAGES.length];
}

// Parse key numbers from AI response for display in stat cards
function extractStats(content: string) {
  const iso = content.match(/ISO\s*:?\s*(\d+)/i)?.[1];
  const aperture = content.match(/f\/?([\d.]+)/i)?.[1];
  const shutter = content.match(/(\d+\/\d+)\s*s/i)?.[1] ?? content.match(/1\/(\d+)/i)?.[1];
  return { iso, aperture, shutter: shutter ? (shutter.includes("/") ? shutter : `1/${shutter}`) : null };
}

export function RightPanel({ latestAssistantMessage }: { latestAssistantMessage?: Message }) {
  /* ── EMPTY STATE ────────────────────────────── */
  if (!latestAssistantMessage) {
    return (
      <div className="h-full w-full flex flex-col rounded-3xl overflow-hidden relative bg-[#111] shadow-2xl select-none">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=700&fit=crop&auto=format"
          alt="Photography"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 gap-4">
          {/* Animated aperture ring */}
          <div className="relative w-24 h-24 mb-2">
            <div className="absolute inset-0 rounded-full border-[3px] border-white/20 animate-spin" style={{ animationDuration: "8s" }}/>
            <div className="absolute inset-2 rounded-full border-[2px] border-white/30 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }}/>
            <div className="absolute inset-4 rounded-full border-[2px] border-white/40"/>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* SVG aperture blades */}
              <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                <circle cx="20" cy="20" r="18" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="8" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/>
                <line x1="20" y1="2" x2="20" y2="38" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
                <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
                <line x1="6" y1="6" x2="34" y2="34" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
                <line x1="34" y1="6" x2="6" y2="34" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight leading-tight">
            Ready to<br/>capture your shot.
          </h2>
          <p className="text-white/50 text-sm max-w-[180px] leading-relaxed">
            Ask me anything - your personalized recommendation will appear right here.
          </p>
          {/* Decorative badge row */}
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {["ISO", "Aperture", "Shutter", "Tips"].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom label */}
        <div className="relative z-10 px-6 pb-5 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
            <span className="text-white/40 text-xs">AI ready</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── FILLED STATE ───────────────────────────── */
  const photo = pickImage(latestAssistantMessage.id, latestAssistantMessage.content);
  const stats = extractStats(latestAssistantMessage.content);

  return (
    <div className="h-[calc(100vh-4rem)] max-h-[640px] w-full flex flex-col rounded-3xl overflow-hidden bg-white shadow-2xl">

      {/* ── Hero image section ── */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.label}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm border border-white/10">
            ✦ Photo AI
          </span>
        </div>
        <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-mono border border-white/10">
          {photo.tag}
        </span>

        {/* Bottom image label */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-0.5">Best match</p>
          <h2 className="text-white text-xl font-bold leading-tight">{photo.label} Setup</h2>
        </div>
      </div>

      {/* ── Stats row ── */}
      {(stats.iso || stats.aperture || stats.shutter) && (
        <div className="grid grid-cols-3 divide-x divide-[#f3f4f6] border-b border-[#f3f4f6] shrink-0">
          {[
            { label: "ISO", value: stats.iso ? `ISO ${stats.iso}` : "—" },
            { label: "Aperture", value: stats.aperture ? `f/${stats.aperture}` : "—" },
            { label: "Shutter", value: stats.shutter ?? "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center py-3 gap-0.5">
              <span className="text-[10px] text-[#9ca3af] uppercase tracking-widest">{label}</span>
              <span className="text-[#111827] font-bold text-sm font-mono">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── AI response content ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="prose prose-sm prose-slate max-w-none
          prose-p:text-[#374151] prose-p:leading-relaxed prose-p:my-1.5
          prose-li:text-[#374151] prose-li:my-0.5
          prose-ul:my-2 prose-ul:pl-4
          prose-strong:text-[#111827] prose-strong:font-semibold
          prose-headings:text-[#111827] prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1
        ">
          <ReactMarkdown>{latestAssistantMessage.content}</ReactMarkdown>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="shrink-0 px-6 py-4 border-t border-[#f3f4f6] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
          <span className="text-xs text-[#9ca3af]">AI recommendation</span>
        </div>
        <button className="px-4 py-1.5 bg-[#111827] text-white text-xs font-medium rounded-full hover:bg-black transition-colors">
          Save settings
        </button>
      </div>
    </div>
  );
}
