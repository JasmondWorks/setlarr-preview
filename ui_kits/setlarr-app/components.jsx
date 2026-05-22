// components.jsx — Setlarr primitive components
// Tokens come from ../../colors_and_type.css imported by the host page.

const setColors = {
  brand50: 'hsl(248, 80%, 96%)',
  brand100: 'hsl(248, 75%, 91%)',
  brand500: 'hsl(248, 62%, 55%)',
  brand600: 'hsl(248, 60%, 47%)',
  brand700: 'hsl(248, 60%, 39%)',
  brand900: 'hsl(248, 62%, 18%)',
  n50:  'hsl(240, 20%, 98%)',
  n100: 'hsl(240, 16%, 95%)',
  n200: 'hsl(240, 12%, 90%)',
  n300: 'hsl(240, 10%, 82%)',
  n400: 'hsl(240, 8%, 65%)',
  n500: 'hsl(240, 8%, 50%)',
  n600: 'hsl(240, 8%, 38%)',
  n700: 'hsl(240, 8%, 26%)',
  n900: 'hsl(240, 12%, 12%)',
  success50: 'hsl(152, 70%, 95%)',
  success500: 'hsl(152, 55%, 40%)',
  success600: 'hsl(152, 60%, 32%)',
  success900: 'hsl(152, 65%, 12%)',
  warning50: 'hsl(38, 95%, 95%)',
  warning500: 'hsl(38, 85%, 50%)',
  warning600: 'hsl(38, 88%, 40%)',
  warning900: 'hsl(38, 90%, 14%)',
  danger50:  'hsl(4, 80%, 96%)',
  danger200: 'hsl(4, 75%, 84%)',
  danger500: 'hsl(4, 72%, 52%)',
  danger600: 'hsl(4, 75%, 42%)',
  danger900: 'hsl(4, 78%, 14%)',
};
const elev1 = '0 1px 2px rgba(30,20,60,0.06), 0 1px 4px rgba(30,20,60,0.04)';
const elev2 = '0 2px 8px rgba(30,20,60,0.08), 0 4px 16px rgba(30,20,60,0.06)';
const elev3 = '0 8px 24px rgba(30,20,60,0.10), 0 16px 48px rgba(30,20,60,0.08)';

// ─────────────────── Button ───────────────────
function SButton({ variant = 'primary', children, onClick, full = false, disabled = false, leadingIcon, style = {} }) {
  const base = {
    height: 44,
    padding: '0 18px',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'inherit',
    border: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: full ? '100%' : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 120ms cubic-bezier(0.2,0,0,1), transform 80ms cubic-bezier(0.2,0,0,1)',
    whiteSpace: 'nowrap',
  };
  const variants = {
    primary:   { background: setColors.brand600, color: '#fff' },
    secondary: { background: setColors.n100, color: setColors.n900, border: `1px solid ${setColors.n300}` },
    ghost:     { background: 'transparent', color: setColors.brand600 },
    danger:    { background: 'transparent', color: setColors.danger600, fontWeight: 400, border: `1px solid ${setColors.danger200}` },
  };
  const dis = { background: setColors.n200, color: setColors.n400 };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...(disabled ? dis : null), ...style }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {leadingIcon}
      {children}
    </button>
  );
}

// ─────────────────── Input ───────────────────
function SInput({ label, value, onChange, placeholder, type = 'text', error, prefix }) {
  const [focused, setFocused] = React.useState(false);
  const wrap = {
    display: 'flex',
    alignItems: 'center',
    height: 44,
    padding: focused || error ? '0 15px' : '0 16px',
    background: focused ? '#fff' : (error ? setColors.danger50 : setColors.n100),
    border: focused
      ? `2px solid ${setColors.brand500}`
      : (error ? `2px solid ${setColors.danger500}` : `1px solid ${setColors.n300}`),
    boxShadow: focused
      ? `0 0 0 3px ${setColors.brand50}`
      : (error ? `0 0 0 3px ${setColors.danger50}` : 'none'),
    borderRadius: 6,
    transition: 'all 120ms cubic-bezier(0.2,0,0,1)',
    gap: 8,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <div style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
        textTransform: 'uppercase', color: setColors.n700,
      }}>{label}</div>}
      <div style={wrap}>
        {prefix && <span style={{ color: setColors.n500, fontSize: 14 }}>{prefix}</span>}
        <input
          type={type}
          value={value ?? ''}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, height: '100%', border: 0, outline: 'none', background: 'transparent',
            fontSize: 14, color: setColors.n900, fontFamily: 'inherit', minWidth: 0,
          }}
        />
      </div>
      {error && <div style={{ fontSize: 12, color: setColors.danger600 }}>{error}</div>}
    </div>
  );
}

// ─────────────────── Badge ───────────────────
const badgePalette = {
  verified: { bg: setColors.success50, fg: setColors.success900, dot: setColors.success500 },
  escrow:   { bg: setColors.brand50,   fg: setColors.brand900,   dot: setColors.brand500 },
  pending:  { bg: setColors.warning50, fg: setColors.warning900, dot: setColors.warning500 },
  disputed: { bg: setColors.danger50,  fg: setColors.danger900,  dot: setColors.danger500 },
  inactive: { bg: setColors.n100,      fg: setColors.n600,       dot: setColors.n400 },
};
function SBadge({ variant = 'verified', children, dot = true }) {
  const p = badgePalette[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 9999,
      background: p.bg, color: p.fg,
      fontSize: 11, fontWeight: 600, lineHeight: 1.4,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 9999, background: p.dot }} />}
      {children}
    </span>
  );
}

// ─────────────────── Card ───────────────────
function SCard({ children, variant = 'standard', style = {}, onClick }) {
  const v = {
    standard: { background: '#fff', boxShadow: elev2 },
    flat: { background: setColors.n50, border: `1px solid ${setColors.n200}` },
    alert: { background: setColors.warning50, borderLeft: `3px solid ${setColors.warning600}` },
  }[variant];
  return (
    <div onClick={onClick} style={{
      borderRadius: 10, padding: 16,
      cursor: onClick ? 'pointer' : 'default',
      ...v, ...style,
    }}>{children}</div>
  );
}

// ─────────────────── ListingCard ───────────────────
function ListingCard({ listing, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 10,
      boxShadow: elev2, cursor: 'pointer', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 120ms cubic-bezier(0.2,0,0,1)',
    }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{
        aspectRatio: '1 / 1',
        background: listing.bg || `linear-gradient(135deg, ${setColors.n100}, ${setColors.n200})`,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40, color: setColors.n400,
      }}>
        {listing.glyph}
        {listing.verified && (
          <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <SBadge variant="verified">Verified</SBadge>
          </div>
        )}
      </div>
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 400, color: setColors.n900,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {listing.title}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: setColors.n900, fontVariantNumeric: 'tabular-nums' }}>
          ₦{listing.price.toLocaleString()}
        </div>
        <div style={{ fontSize: 11, color: setColors.n500, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon.MapPin size={12} color={setColors.n400} />
          <span>{listing.city}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── TopBar ───────────────────
function TopBar({ title, leading, trailing, scrolled = false }) {
  return (
    <div style={{
      height: 56, padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: '#fff',
      borderBottom: scrolled ? `1px solid ${setColors.n200}` : 'none',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 32 }}>
        {leading}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: setColors.n900 }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 32, justifyContent: 'flex-end' }}>
        {trailing}
      </div>
    </div>
  );
}

// ─────────────────── BottomNav (with FAB center) ───────────────────
function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Icon.Home },
    { id: 'search', label: 'Search', icon: Icon.Search },
    { id: 'sell', fab: true },
    { id: 'chats', label: 'Chats', icon: Icon.MessageCircle, badge: true },
    { id: 'you', label: 'You', icon: Icon.User },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 'calc(64px + env(safe-area-inset-bottom, 24px))',
      paddingBottom: 'env(safe-area-inset-bottom, 24px)',
      background: '#fff',
      borderTop: `1px solid ${setColors.n200}`,
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      zIndex: 10,
    }}>
      {tabs.map(t => {
        if (t.fab) {
          return (
            <div key={t.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => onChange('sell')} style={{
                position: 'absolute', top: -8,
                width: 44, height: 44, borderRadius: 10, border: 0,
                background: setColors.brand600, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: elev2, cursor: 'pointer',
              }}>
                <Icon.Plus size={20} color="#fff" />
              </button>
              <div style={{ fontSize: 10, fontWeight: 600, color: setColors.n700, marginTop: 24 }}>Sell</div>
            </div>
          );
        }
        const I = t.icon;
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            position: 'relative', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4,
            background: 'transparent', border: 0, cursor: 'pointer', paddingTop: 8,
          }}>
            {isActive && <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 16, height: 4, background: setColors.brand600,
              borderRadius: '0 0 9999px 9999px',
            }}/>}
            <div style={{ position: 'relative' }}>
              <I size={20} color={isActive ? setColors.n900 : setColors.n400} />
              {t.badge && <div style={{
                position: 'absolute', top: -2, right: -3,
                width: 8, height: 8, borderRadius: 9999,
                background: setColors.danger500, boxShadow: '0 0 0 1.5px #fff',
              }}/>}
            </div>
            <div style={{
              fontSize: 10, fontWeight: isActive ? 600 : 400,
              color: isActive ? setColors.n900 : setColors.n400,
            }}>{t.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────── CityChip ───────────────────
function CityChip({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 9999, border: 0,
      background: active ? setColors.n900 : setColors.n100,
      color: active ? '#fff' : setColors.n700,
      fontSize: 12, fontWeight: 600, cursor: 'pointer',
      whiteSpace: 'nowrap', flexShrink: 0,
      transition: 'background 120ms cubic-bezier(0.2,0,0,1)',
    }}>{children}</button>
  );
}

// ─────────────────── CategoryTile ───────────────────
function CategoryTile({ glyph, label, tint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 10,
        background: tint || setColors.brand50, color: setColors.brand600,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {glyph}
      </div>
      <div style={{ fontSize: 11, color: setColors.n700 }}>{label}</div>
    </div>
  );
}

// ─────────────────── ListRow ───────────────────
function ListRow({ icon, title, sub, trailing = <Icon.ChevronRight size={18} color={setColors.n400} />, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      minHeight: 56, padding: '12px 0',
      borderBottom: `1px solid ${setColors.n200}`,
      width: '100%', background: 'transparent', border: 0, borderBottom: `1px solid ${setColors.n200}`,
      textAlign: 'left', cursor: 'pointer',
    }}>
      {icon && <div style={{
        width: 32, height: 32, borderRadius: 6,
        background: accent || setColors.n100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: setColors.n600, flexShrink: 0,
      }}>{icon}</div>}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: setColors.n900 }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: setColors.n500 }}>{sub}</div>}
      </div>
      {trailing}
    </button>
  );
}

// ─────────────────── EmptyState ───────────────────
function EmptyState({ icon, title, body, cta }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', gap: 12, padding: '48px 24px',
    }}>
      <div style={{ color: setColors.n300 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: setColors.n900 }}>{title}</div>
      <div style={{ fontSize: 14, color: setColors.n500, lineHeight: 1.55, maxWidth: 260 }}>{body}</div>
      {cta && <div style={{ marginTop: 8 }}>{cta}</div>}
    </div>
  );
}

Object.assign(window, {
  SButton, SInput, SBadge, SCard, ListingCard, TopBar, BottomNav,
  CityChip, CategoryTile, ListRow, EmptyState,
  setColors, elev1, elev2, elev3,
});
