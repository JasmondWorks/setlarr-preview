// screens.jsx — Setlarr app screens
// Each screen returns JSX that fills the iOS device viewport.
// Navigation handled by parent via `goto(screen, params)`.

// ────────────────────────────────────────────────
// Sample data
// ────────────────────────────────────────────────
const SAMPLE_LISTINGS = [
  { id: 'l1', title: 'iPhone 14 Pro · 256GB · Deep Purple', price: 434700, city: 'Lagos · Ikeja',
    glyph: <Icon.Smartphone size={56} color={setColors.n400} />, bg: 'linear-gradient(135deg,#f4f1ff,#e7e1ff)',
    verified: true, seller: 'Adaeze O.', sellerRating: 4.9, reviews: 142,
    desc: 'Owned 6 months, kept in case the entire time. Original box, charger, AppleCare runs out March 2027. No scratches.',
  },
  { id: 'l2', title: 'Canon EOS R6 Mark II body only', price: 1295000, city: 'Lagos · Lekki',
    glyph: <Icon.Camera size={56} color={setColors.n400} />, bg: 'linear-gradient(135deg,#fef4ef,#fde0d0)',
    verified: true, seller: 'Tunde A.', sellerRating: 4.7, reviews: 38,
    desc: 'Shutter count under 2,100. Mint condition.',
  },
  { id: 'l3', title: 'AirPods Pro 2 · USB-C', price: 198000, city: 'Abuja · Wuse',
    glyph: <Icon.Package size={56} color={setColors.n400} />, bg: 'linear-gradient(135deg,#eaf6f0,#d4ecdf)',
    verified: false, seller: 'Ibrahim K.', sellerRating: 4.4, reviews: 19,
  },
  { id: 'l4', title: 'PS5 Slim · Disc + 2 controllers', price: 540000, city: 'Lagos · Yaba',
    glyph: <Icon.Package size={56} color={setColors.n400} />, bg: 'linear-gradient(135deg,#eef0fa,#dbdff3)',
    verified: true, seller: 'Chioma E.', sellerRating: 5.0, reviews: 67,
  },
];

const CITIES = ['All Nigeria', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano'];
const CATEGORIES = [
  { id: 'phones', label: 'Phones', glyph: <Icon.Smartphone size={24} />, tint: 'hsl(248, 80%, 96%)' },
  { id: 'cameras', label: 'Cameras', glyph: <Icon.Camera size={24} />, tint: 'hsl(38, 95%, 95%)' },
  { id: 'audio', label: 'Audio', glyph: <Icon.Package size={24} />, tint: 'hsl(152, 70%, 95%)' },
  { id: 'games', label: 'Gaming', glyph: <Icon.Tag size={24} />, tint: 'hsl(4, 80%, 96%)' },
];

// ────────────────────────────────────────────────
// HomeScreen — browse listings
// ────────────────────────────────────────────────
function HomeScreen({ goto }) {
  const [city, setCity] = React.useState('Lagos');
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar
        title=""
        leading={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.04em', color: setColors.n900 }}>setlarr</div>
            <div style={{ width: 6, height: 6, borderRadius: 9999, background: setColors.brand600, marginBottom: -10 }}/>
          </div>
        }
        trailing={
          <button style={{
            width: 32, height: 32, borderRadius: 6, background: setColors.n100,
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', cursor: 'pointer',
          }}>
            <Icon.Bell size={18} color={setColors.n700} />
            <div style={{
              position: 'absolute', top: 5, right: 5,
              width: 7, height: 7, borderRadius: 9999, background: setColors.danger500,
              boxShadow: `0 0 0 1.5px ${setColors.n100}`,
            }}/>
          </button>
        }
      />

      {/* Search */}
      <div style={{ padding: '8px 24px 16px' }}>
        <button onClick={() => goto('search')} style={{
          width: '100%', height: 44, padding: '0 14px',
          background: setColors.n100, border: `1px solid ${setColors.n200}`,
          borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8,
          color: setColors.n400, fontSize: 14, cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          <Icon.Search size={18} color={setColors.n400} />
          <span>Search for anything</span>
        </button>
      </div>

      {/* City chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 24px 24px', overflowX: 'auto' }}>
        {CITIES.map(c => (
          <CityChip key={c} active={c === city} onClick={() => setCity(c)}>{c}</CityChip>
        ))}
      </div>

      {/* Category tiles */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {CATEGORIES.map(c => (
            <CategoryTile key={c.id} glyph={c.glyph} label={c.label} tint={c.tint} />
          ))}
        </div>
      </div>

      {/* Listings */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="t-h2" style={{ fontSize: 18, fontWeight: 600, color: setColors.n900 }}>For you in {city}</div>
          <button style={{ background: 'none', border: 0, color: setColors.brand600, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>See all</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {SAMPLE_LISTINGS.map(l => (
            <ListingCard key={l.id} listing={l} onClick={() => goto('listing', { id: l.id })} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// ListingScreen — product detail + escrow CTA
// ────────────────────────────────────────────────
function ListingScreen({ goto, params }) {
  const listing = SAMPLE_LISTINGS.find(l => l.id === params?.id) || SAMPLE_LISTINGS[0];
  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        leading={
          <button onClick={() => goto('home')} style={{
            width: 32, height: 32, borderRadius: 9999, background: setColors.n100,
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.ChevronLeft size={18} color={setColors.n700} />
          </button>
        }
        title=""
        trailing={
          <button style={{
            width: 32, height: 32, borderRadius: 9999, background: setColors.n100,
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.Heart size={18} color={setColors.n700} />
          </button>
        }
      />

      {/* hero image */}
      <div style={{
        aspectRatio: '1 / 1', background: listing.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 24px', borderRadius: 16,
      }}>
        {React.cloneElement(listing.glyph, { size: 96 })}
      </div>

      <div style={{ padding: '24px' }}>
        {/* badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {listing.verified && <SBadge variant="verified">Verified seller</SBadge>}
          <SBadge variant="escrow">Escrow protected</SBadge>
        </div>

        {/* title + price */}
        <div className="t-h1" style={{ fontSize: 22, fontWeight: 600, color: setColors.n900, marginBottom: 4, letterSpacing: '-0.3px' }}>
          {listing.title}
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: setColors.n900, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px', marginBottom: 8 }}>
          ₦{listing.price.toLocaleString()}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: setColors.n500, fontSize: 12, marginBottom: 32 }}>
          <Icon.MapPin size={14} color={setColors.n400} />
          <span>{listing.city}</span>
          <span style={{ color: setColors.n300 }}>·</span>
          <Icon.Clock size={14} color={setColors.n400} />
          <span>Listed 4 hours ago</span>
        </div>

        {/* seller */}
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 12 }}>
          Seller
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 9999,
            background: 'linear-gradient(135deg,' + setColors.brand500 + ',' + setColors.brand700 + ')',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 600,
          }}>{listing.seller?.charAt(0)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: setColors.n900 }}>{listing.seller}</div>
            <div style={{ fontSize: 12, color: setColors.n500 }}>
              ★ {listing.sellerRating} · {listing.reviews} reviews
            </div>
          </div>
          <button style={{
            height: 36, padding: '0 14px', borderRadius: 6,
            background: setColors.n100, border: `1px solid ${setColors.n300}`,
            color: setColors.n900, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Message</button>
        </div>

        {/* description */}
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 12 }}>
          Description
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.65, color: setColors.n700, marginBottom: 32 }}>
          {listing.desc || 'No description provided.'}
        </div>

        {/* escrow card */}
        <SCard variant="standard" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ color: setColors.brand600, marginTop: 2 }}>
              <Icon.ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: setColors.n900, marginBottom: 4 }}>How escrow works</div>
              <div style={{ fontSize: 12, color: setColors.n600, lineHeight: 1.55 }}>
                Your money is held by Setlarr until you confirm the item is as described. If anything goes wrong, you get a full refund.
              </div>
            </div>
          </div>
        </SCard>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 'calc(64px + env(safe-area-inset-bottom, 24px))', left: 0, right: 0,
        padding: '12px 24px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        borderTop: `1px solid ${setColors.n200}`,
        zIndex: 6,
      }}>
        <SButton variant="primary" full onClick={() => goto('confirm', { id: listing.id })}>
          Lock ₦{listing.price.toLocaleString()} in escrow
        </SButton>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// ConfirmScreen — escrow confirmation sheet
// ────────────────────────────────────────────────
function ConfirmScreen({ goto, params }) {
  const listing = SAMPLE_LISTINGS.find(l => l.id === params?.id) || SAMPLE_LISTINGS[0];
  const fee = Math.round(listing.price * 0.012);
  const total = listing.price + fee;
  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Lock in escrow"
        leading={
          <button onClick={() => goto('listing', { id: listing.id })} style={{
            width: 32, height: 32, borderRadius: 9999, background: setColors.n100,
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.X size={18} color={setColors.n700} />
          </button>
        }
      />

      <div style={{ padding: '24px' }}>
        {/* item summary */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, padding: '0 0 16px', borderBottom: `1px solid ${setColors.n200}` }}>
          <div style={{
            width: 64, height: 64, borderRadius: 10, background: listing.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{React.cloneElement(listing.glyph, { size: 32 })}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: setColors.n900, marginBottom: 4 }}>{listing.title}</div>
            <div style={{ fontSize: 12, color: setColors.n500 }}>{listing.seller} · {listing.city}</div>
          </div>
        </div>

        {/* breakdown */}
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 12 }}>
          Breakdown
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <Row label="Item price" value={`₦${listing.price.toLocaleString()}`} />
          <Row label="Escrow fee · 1.2%" value={`₦${fee.toLocaleString()}`} sub />
          <div style={{ height: 1, background: setColors.n200, margin: '4px 0' }} />
          <Row label="Total now" value={`₦${total.toLocaleString()}`} bold />
        </div>

        {/* payment */}
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 12 }}>
          Pay with
        </div>
        <div style={{
          background: setColors.n100, border: `1px solid ${setColors.n200}`,
          borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
        }}>
          <div style={{
            width: 36, height: 24, borderRadius: 4, background: setColors.brand600,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.CreditCard size={14} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: setColors.n900 }}>GTBank · 2058</div>
            <div style={{ fontSize: 11, color: setColors.n500 }}>Default debit card</div>
          </div>
          <Icon.ChevronRight size={16} color={setColors.n400} />
        </div>

        {/* protection callout */}
        <SCard variant="standard" style={{ background: setColors.success50, boxShadow: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ color: setColors.success600, marginTop: 1 }}><Icon.ShieldCheck size={18} /></div>
            <div style={{ fontSize: 12, color: setColors.success900, lineHeight: 1.55 }}>
              You're covered. If the seller doesn't ship in 48 hours, or the item isn't as described, you get a full refund.
            </div>
          </div>
        </SCard>
      </div>

      <div style={{
        position: 'absolute', bottom: 'calc(64px + env(safe-area-inset-bottom, 24px))', left: 0, right: 0,
        padding: '12px 24px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px) saturate(140%)',
        borderTop: `1px solid ${setColors.n200}`,
        zIndex: 6,
      }}>
        <SButton variant="primary" full onClick={() => goto('success', { id: listing.id })}>
          Lock ₦{total.toLocaleString()} in escrow
        </SButton>
      </div>
    </div>
  );
}

function Row({ label, value, sub, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{ fontSize: bold ? 14 : 13, fontWeight: bold ? 600 : 400, color: sub ? setColors.n500 : setColors.n700 }}>{label}</div>
      <div style={{ fontSize: bold ? 16 : 13, fontWeight: bold ? 600 : 400, color: sub ? setColors.n500 : setColors.n900, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// SuccessScreen — money locked
// ────────────────────────────────────────────────
function SuccessScreen({ goto, params }) {
  const listing = SAMPLE_LISTINGS.find(l => l.id === params?.id) || SAMPLE_LISTINGS[0];
  return (
    <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 9999,
          background: setColors.success50, color: setColors.success600,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon.Check size={36} />
        </div>
        <div className="t-display" style={{ fontSize: 28, fontWeight: 600, color: setColors.n900, letterSpacing: '-0.5px' }}>
          Money locked
        </div>
        <div style={{ fontSize: 14, color: setColors.n500, lineHeight: 1.55, maxWidth: 280 }}>
          ₦{listing.price.toLocaleString()} is held safely. We'll release it to {listing.seller} once you confirm the {listing.title.split('·')[0].trim()} arrived as described.
        </div>
        <div style={{ marginTop: 16 }}>
          <SBadge variant="escrow">Order #SET-90413 · in escrow</SBadge>
        </div>
      </div>
      <div style={{ padding: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SButton variant="primary" full onClick={() => goto('wallet')}>View in wallet</SButton>
        <SButton variant="ghost" full onClick={() => goto('home')}>Keep browsing</SButton>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// WalletScreen
// ────────────────────────────────────────────────
function WalletScreen({ goto }) {
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Wallet" />

      <div style={{ padding: '8px 24px 24px' }}>
        {/* big stat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700 }}>
            In escrow
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, color: setColors.n900, letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums' }}>
            ₦632,700
          </div>
          <div style={{ fontSize: 13, color: setColors.n500 }}>across 2 active orders</div>
        </div>

        {/* stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          <Stat label="Available" value="₦14,200" />
          <Stat label="Released this month" value="₦1.2M" />
        </div>

        {/* active orders */}
        <div className="t-h2" style={{ fontSize: 18, fontWeight: 600, color: setColors.n900, marginBottom: 16 }}>
          Active orders
        </div>

        <SCard style={{ marginBottom: 12, padding: 0 }}>
          <OrderRow
            title="iPhone 14 Pro · 256GB"
            sub="Adaeze O. · Lagos"
            amount="₦434,700"
            badge={<SBadge variant="escrow">In escrow</SBadge>}
            glyph={<Icon.Smartphone size={22} color={setColors.brand600} />}
            tint={setColors.brand50}
            onClick={() => goto('order')}
          />
        </SCard>

        <SCard style={{ marginBottom: 24, padding: 0 }}>
          <OrderRow
            title="AirPods Pro 2"
            sub="Ibrahim K. · Abuja"
            amount="₦198,000"
            badge={<SBadge variant="pending">Pending shipment</SBadge>}
            glyph={<Icon.Package size={22} color={setColors.warning600} />}
            tint={setColors.warning50}
          />
        </SCard>

        {/* alert */}
        <SCard variant="alert" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ color: setColors.warning600, marginTop: 1 }}><Icon.AlertCircle size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: setColors.warning900, marginBottom: 2 }}>Awaiting your confirmation</div>
              <div style={{ fontSize: 12, color: setColors.warning900, lineHeight: 1.55 }}>
                You marked your iPhone delivered. Confirm it's as described and we'll release ₦434,700 to Adaeze.
              </div>
            </div>
          </div>
        </SCard>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: setColors.n100, borderRadius: 10, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, color: setColors.n500, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: setColors.n900, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function OrderRow({ title, sub, amount, badge, glyph, tint, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {glyph}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: setColors.n900, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: setColors.n500, marginBottom: 6 }}>{sub}</div>
        {badge}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: setColors.n900, fontVariantNumeric: 'tabular-nums' }}>{amount}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// SellScreen — seller center (new listing)
// ────────────────────────────────────────────────
function SellScreen({ goto }) {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="New listing"
        leading={
          <button onClick={() => goto('home')} style={{
            width: 32, height: 32, borderRadius: 9999, background: setColors.n100,
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.X size={18} color={setColors.n700} />
          </button>
        }
      />
      <div style={{ padding: '8px 24px 24px' }}>
        {/* photo dropzone */}
        <div style={{
          aspectRatio: '1 / 1', borderRadius: 10,
          background: setColors.n100, border: `1px dashed ${setColors.n300}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          color: setColors.n500, marginBottom: 32, cursor: 'pointer',
        }}>
          <Icon.Camera size={28} color={setColors.n400} />
          <div style={{ fontSize: 13, fontWeight: 600 }}>Add photos</div>
          <div style={{ fontSize: 11 }}>Up to 8 · first photo is the cover</div>
        </div>

        {/* fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          <SInput label="Title" value={title} onChange={setTitle} placeholder="What are you selling?" />
          <SInput label="Price" value={price} onChange={setPrice} prefix="₦" placeholder="0" />
          <SInput label="City" value="Lagos · Ikeja" onChange={() => {}} />
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 12 }}>
          Category
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {CATEGORIES.map(c => <CityChip key={c.id}>{c.label}</CityChip>)}
        </div>

        <SCard variant="standard" style={{ background: setColors.brand50, boxShadow: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ color: setColors.brand600, marginTop: 1 }}><Icon.ShieldCheck size={18} /></div>
            <div style={{ fontSize: 12, color: setColors.brand900, lineHeight: 1.55 }}>
              <b style={{ fontWeight: 600 }}>Get the green badge.</b> Verified sellers see 3× more buyers and sell 2.4× faster.
            </div>
          </div>
        </SCard>
      </div>

      <div style={{
        position: 'absolute', bottom: 'calc(64px + env(safe-area-inset-bottom, 24px))', left: 0, right: 0,
        padding: '12px 24px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px) saturate(140%)',
        borderTop: `1px solid ${setColors.n200}`,
        zIndex: 6,
      }}>
        <SButton variant="primary" full disabled={!title || !price} onClick={() => goto('home')}>
          Post listing
        </SButton>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// YouScreen — profile + settings
// ────────────────────────────────────────────────
function YouScreen({ goto }) {
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="You" trailing={
        <button style={{ width: 32, height: 32, borderRadius: 9999, background: setColors.n100, border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon.Settings size={18} color={setColors.n700} />
        </button>
      }/>
      <div style={{ padding: '8px 24px 24px' }}>
        {/* profile head */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 9999,
            background: `linear-gradient(135deg,${setColors.brand500},${setColors.brand700})`,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 600,
          }}>A</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: setColors.n900 }}>Adaeze Okafor</div>
            <div style={{ fontSize: 12, color: setColors.n500, marginTop: 2 }}>★ 4.9 · 142 sales</div>
          </div>
        </div>
        <div style={{ marginBottom: 32 }}>
          <SBadge variant="verified">Verified</SBadge>
        </div>

        {/* settings list */}
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 4 }}>
          Account
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ListRow icon={<Icon.Wallet size={18} />} title="Wallet" sub="₦632,700 in escrow" onClick={() => goto('wallet')} />
          <ListRow icon={<Icon.CreditCard size={18} />} title="Payment methods" sub="2 cards · GTBank, Access" />
          <ListRow icon={<Icon.ShieldCheck size={18} color={setColors.success600} />} title="Identity & verification" sub="Verified" accent={setColors.success50} />
          <ListRow icon={<Icon.Bell size={18} />} title="Notifications" sub="Push + email" />
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginTop: 32, marginBottom: 4 }}>
          Activity
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ListRow icon={<Icon.Package size={18} />} title="Your listings" sub="14 active · 67 sold" />
          <ListRow icon={<Icon.TrendingUp size={18} />} title="Sales analytics" sub="₦1.2M released this month" />
          <ListRow icon={<Icon.Inbox size={18} />} title="Saved items" sub="9 items" />
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// SearchScreen — chat-style search with empty state
// ────────────────────────────────────────────────
function SearchScreen({ goto }) {
  const [q, setQ] = React.useState('');
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar
        leading={
          <button onClick={() => goto('home')} style={{
            width: 32, height: 32, borderRadius: 9999, background: setColors.n100,
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.ChevronLeft size={18} color={setColors.n700} />
          </button>
        }
        title="Search"
      />
      <div style={{ padding: '8px 24px' }}>
        <SInput value={q} onChange={setQ} placeholder="iPhone 14, PS5, Canon…" />
      </div>
      {!q && (
        <div style={{ padding: '0 24px', marginTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: setColors.n700, marginBottom: 12 }}>
            Recent
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {['iPhone 14 Pro', 'PS5', 'Canon EOS', 'AirPods'].map(s => (
              <ListRow key={s} icon={<Icon.Clock size={16} color={setColors.n400} />} title={s} sub={null}
                trailing={<button style={{ background: 'none', border: 0, color: setColors.n400, fontSize: 13, cursor: 'pointer' }}>↗</button>}
              />
            ))}
          </div>
        </div>
      )}
      {q && (
        <EmptyState
          icon={<Icon.Search size={48} color={setColors.n300} />}
          title={`No matches for "${q}"`}
          body="Try a broader keyword, or check different spelling."
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// ChatsScreen — empty for now
// ────────────────────────────────────────────────
function ChatsScreen() {
  return (
    <div>
      <TopBar title="Chats" />
      <EmptyState
        icon={<Icon.MessageCircle size={48} color={setColors.n300} />}
        title="No conversations yet"
        body="When you message a seller or buyer, your chats will live here."
      />
    </div>
  );
}

Object.assign(window, {
  HomeScreen, ListingScreen, ConfirmScreen, SuccessScreen,
  WalletScreen, SellScreen, YouScreen, SearchScreen, ChatsScreen,
  SAMPLE_LISTINGS,
});
