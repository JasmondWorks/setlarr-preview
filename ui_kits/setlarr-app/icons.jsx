// icons.jsx — Lucide icons re-drawn as React components (1.5px stroke)
// We inline rather than CDN to keep the UI kit offline-friendly.

const baseSvg = (paths, size = 20) => ({ size: s = size, color = 'currentColor', style = {} } = {}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
       style={{ flexShrink: 0, ...style }}>
    {paths}
  </svg>
);

const Icon = {
  Home: baseSvg(<><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></>),
  Search: baseSvg(<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>),
  MessageCircle: baseSvg(<><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></>),
  User: baseSvg(<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>),
  Plus: baseSvg(<><path d="M12 5v14M5 12h14"/></>),
  MapPin: baseSvg(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
  Clock: baseSvg(<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>),
  Check: baseSvg(<><path d="M20 6L9 17l-5-5"/></>),
  Shield: baseSvg(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
  ShieldCheck: baseSvg(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>),
  ChevronRight: baseSvg(<><path d="M9 18l6-6-6-6"/></>),
  ChevronLeft: baseSvg(<><path d="M15 18l-6-6 6-6"/></>),
  X: baseSvg(<><path d="M18 6L6 18M6 6l12 12"/></>),
  Heart: baseSvg(<><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.5z"/></>),
  Wallet: baseSvg(<><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/></>),
  CreditCard: baseSvg(<><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></>),
  Bell: baseSvg(<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>),
  Settings: baseSvg(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .4 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.4 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .4-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.4-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.4h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.4 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>),
  Smartphone: baseSvg(<><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M11 18h2"/></>),
  Camera: baseSvg(<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>),
  Package: baseSvg(<><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>),
  Tag: baseSvg(<><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1"/></>),
  Filter: baseSvg(<><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/></>),
  AlertCircle: baseSvg(<><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>),
  Inbox: baseSvg(<><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13a2 2 0 0 1 2 1.8l1.5 8.7a2 2 0 0 1-2 2.5h-16a2 2 0 0 1-2-2.5L2.5 6.8A2 2 0 0 1 4.5 5z"/></>),
  Send: baseSvg(<><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></>),
  TrendingUp: baseSvg(<><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></>),
};

window.Icon = Icon;
