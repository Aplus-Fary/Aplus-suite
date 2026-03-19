import { useState } from "react";

const TIERS = [
  {
    name: "Studio",
    tagline: "For the founder who is ready to stop guessing.",
    ideal: "Made-to-order, bridal & emerging RTW brands",
    monthly: 150000,
    annual: 1500000,
    setup: 150000,
    color: "#8B4A58",
    featured: false,
    limits: "Up to 3 suppliers · 20 active orders · 3 artisan logins",
    features: [
      { label: "Artisan & production lead portal", included: true },
      { label: "Order tracking & stage updates", included: true },
      { label: "Supplier hub — chat, orders, performance", included: true },
      { label: "Cost & margin tracking per SKU", included: true },
      { label: "Founder morning brief dashboard", included: true },
      { label: "Supplier nudge & WhatsApp integration", included: true },
      { label: "Launch checklist & drop countdown", included: true },
      { label: "Business Intelligence suite", included: false },
      { label: "Multi-brand profile", included: false },
      { label: "Quarterly ops review with A+", included: false },
    ],
    cta: "Start with Studio",
    roi: "One caught delay pays for 2 months.",
  },
  {
    name: "Collection",
    tagline: "For brands running real seasons with real volume.",
    ideal: "Seasonal RTW, capsule & multi-drop brands",
    monthly: 350000,
    annual: 3500000,
    setup: 250000,
    color: "#5C1A22",
    featured: true,
    limits: "Up to 8 suppliers · Unlimited orders · 10 artisan logins",
    features: [
      { label: "Everything in Studio", included: true },
      { label: "Full Business Intelligence suite", included: true },
      { label: "Sell-through velocity & milestone tracking", included: true },
      { label: "Supplier performance scoring & ranking", included: true },
      { label: "Defect logging & QC tracking", included: true },
      { label: "Internal ops — floor updates, team notes", included: true },
      { label: "₦ / USD margin toggle", included: true },
      { label: "Reorder signal & SKU recommendations", included: true },
      { label: "Multi-brand profile", included: false },
      { label: "Quarterly ops review with A+", included: false },
    ],
    cta: "Start with Collection",
    roi: "Margin clarity on one season covers the year.",
  },
  {
    name: "House",
    tagline: "For the brand building infrastructure, not just a business.",
    ideal: "Scaling brands, multi-label founders & A+ portfolio brands",
    monthly: 650000,
    annual: 6500000,
    setup: 400000,
    color: "#3D0A14",
    featured: false,
    limits: "Unlimited suppliers · Unlimited orders · Unlimited logins",
    features: [
      { label: "Everything in Collection", included: true },
      { label: "Multiple brand profiles under one account", included: true },
      { label: "Dedicated onboarding — your first season set up with you", included: true },
      { label: "Quarterly ops review with A+ team", included: true },
      { label: "White-glove supplier onboarding", included: true },
      { label: "Early access to new features", included: true },
      { label: "Custom reporting for investors or partners", included: true },
      { label: "Priority support — direct line, not a ticket", included: true },
      { label: "API access for custom integrations", included: true },
      { label: "Named account lead from A+", included: true },
    ],
    cta: "Apply for House",
    roi: "The infrastructure that takes most brands 5 years to build — on Day One.",
  },
];

const ROI_ITEMS = [
  { scenario: "One delayed 100-unit batch", cost: "₦300,000+", note: "at ₦3,000 additional cost per unit" },
  { scenario: "8pp margin error on a ₦10M season", cost: "₦800,000", note: "you thought you made it — you didn't" },
  { scenario: "Studio costs per year", cost: "₦1,800,000", note: "including setup" },
  { scenario: "One season of clarity pays for itself", cost: "Many times over", note: "" },
];

const FAQS = [
  { q: "Is there a free trial?", a: "Yes — 14 days, no credit card required. We'd rather you see the value clearly before you commit. Our onboarding session is included in the trial so you start with real data, not demo data." },
  { q: "Can I start on Studio and move up?", a: "Yes. You keep all your data. Most brands start on Studio and move to Collection after their first drop when the margin picture becomes clear." },
  { q: "What does the setup fee cover?", a: "A live onboarding session — we help you add your suppliers, set up your SKUs, send your first artisan logins, and run through the platform together. Brands that complete onboarding are 4x more likely to be active after 60 days." },
  { q: "Do I pay per artisan login?", a: "No. Your artisan and production lead logins are included in your tier limit. We don't penalise you for growing your team." },
  { q: "Is pricing in naira or dollars?", a: "Both. Naira pricing is locked for Nigerian-registered brands. Dollar pricing is available for diaspora and international brands, and is exchange-rate adjusted quarterly." },
  { q: "What if I run multiple brands?", a: "House tier supports multiple brand profiles under one account. If you're on A+ advisory, ask about portfolio pricing." },
];

function formatNaira(n) {
  if (n >= 1000000) return `₦${(n / 1000000).toFixed(1).replace(".0", "")}M`;
  return `₦${(n / 1000).toFixed(0)}K`;
}

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredTier, setHoveredTier] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0E0406", fontFamily: "Georgia, serif", color: "#F0EBE0", overflowX: "hidden" }}>

      {/* ── NAV ───────────────────────────────────────── */}
      <nav style={{ padding: "22px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #2A0810", position: "sticky", top: 0, background: "#0E0406", zIndex: 50 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 7, color: "#F0EBE0" }}>A+</div>
          <div style={{ fontSize: 8, letterSpacing: 3, color: "#5C3040", marginTop: 1 }}>VENTURE STUDIO</div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 12, color: "#8A7A70" }}>
          {["Product", "Pricing", "About"].map(l => (
            <span key={l} style={{ cursor: "pointer", color: l === "Pricing" ? "#F0EBE0" : "#8A7A70" }}>{l}</span>
          ))}
        </div>
        <button style={{ background: "#5C1A22", color: "#F0EBE0", border: "none", padding: "10px 22px", borderRadius: 4, fontFamily: "Georgia,serif", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
          Book a demo
        </button>
      </nav>

      {/* ── HERO ──────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "88px 48px 72px", position: "relative" }}>
        {/* Background texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 0%, #3D0A14 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: "#1A0608", border: "1px solid #5C1A22", borderRadius: 20, padding: "6px 18px", fontSize: 10, color: "#8B4A58", fontWeight: 700, letterSpacing: 3, marginBottom: 28 }}>
            PRODUCTION INFRASTRUCTURE FOR AFRICAN FASHION
          </div>

          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: "#F0EBE0", margin: "0 auto 20px", lineHeight: 1.1, maxWidth: 800 }}>
            The infrastructure that makes<br />
            <em style={{ color: "#8B4A58", fontStyle: "italic" }}>your brand permanent.</em>
          </h1>

          <p style={{ fontSize: 16, color: "#8A7A70", fontStyle: "italic", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Replace the WhatsApp chaos. Know your real margins.<br />See your atelier in real time — wherever you are.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", background: "#1A0608", border: "1px solid #2A0810", borderRadius: 6, padding: 4, gap: 2 }}>
            {["monthly", "annual"].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{
                background: billing === b ? "#5C1A22" : "transparent",
                color: billing === b ? "#F0EBE0" : "#8A7A70",
                border: "none", padding: "8px 22px", borderRadius: 4,
                fontFamily: "Georgia,serif", fontSize: 12, fontWeight: 700,
                cursor: "pointer", letterSpacing: 1, textTransform: "capitalize",
                transition: "all .2s",
              }}>
                {b === "annual" ? "Annual — 2 months free" : "Monthly"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING CARDS ─────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, maxWidth: 1200, margin: "0 auto", padding: "0 48px 80px" }}>
        {TIERS.map((tier, i) => {
          const price = billing === "annual" ? Math.round(tier.annual / 12) : tier.monthly;
          const isHovered = hoveredTier === i;

          return (
            <div key={tier.name} onMouseEnter={() => setHoveredTier(i)} onMouseLeave={() => setHoveredTier(null)}
              style={{
                background: tier.featured ? "#1A0608" : "#0E0406",
                border: `1px solid ${tier.featured ? "#5C1A22" : "#1A0810"}`,
                borderTop: `3px solid ${tier.featured ? "#8B4A58" : "#2A0810"}`,
                borderRadius: tier.featured ? 0 : 0,
                padding: "40px 36px 36px",
                position: "relative",
                transform: tier.featured ? "scaleY(1.02)" : "scaleY(1)",
                transformOrigin: "top",
                zIndex: tier.featured ? 2 : 1,
                transition: "all .2s",
              }}>

              {tier.featured && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#8B4A58", color: "#F0EBE0", fontSize: 9, fontWeight: 700, letterSpacing: 3, padding: "4px 16px", borderRadius: 10 }}>
                  MOST CHOSEN
                </div>
              )}

              {/* Tier name */}
              <div style={{ fontSize: 10, color: "#5C3040", fontWeight: 700, letterSpacing: 4, marginBottom: 6 }}>
                {tier.name.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, color: "#8A7A70", fontStyle: "italic", marginBottom: 28, lineHeight: 1.5 }}>
                {tier.tagline}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, color: "#F0EBE0", lineHeight: 1 }}>{formatNaira(price)}</span>
                  <span style={{ fontSize: 12, color: "#5C3040" }}>/month</span>
                </div>
                {billing === "annual" && (
                  <div style={{ fontSize: 11, color: "#5C3040", marginTop: 4, fontStyle: "italic" }}>
                    {formatNaira(tier.annual)} billed annually · saves {formatNaira(tier.monthly * 2)}
                  </div>
                )}
              </div>

              {/* Setup fee */}
              <div style={{ fontSize: 11, color: "#5C3040", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #1A0810" }}>
                + {formatNaira(tier.setup)} one-time setup
              </div>

              {/* Ideal for */}
              <div style={{ fontSize: 10, color: "#5C3040", fontWeight: 700, letterSpacing: 2.5, marginBottom: 6 }}>IDEAL FOR</div>
              <div style={{ fontSize: 12, color: "#8A7A70", fontStyle: "italic", marginBottom: 24 }}>{tier.ideal}</div>

              {/* Limits */}
              <div style={{ background: "#0A0204", border: "1px solid #1A0810", borderRadius: 4, padding: "10px 14px", fontSize: 11, color: "#5C3040", marginBottom: 28, lineHeight: 1.7 }}>
                {tier.limits}
              </div>

              {/* CTA */}
              <button style={{
                width: "100%", padding: "14px", marginBottom: 28,
                background: tier.featured ? "#5C1A22" : "transparent",
                color: "#F0EBE0",
                border: `1px solid ${tier.featured ? "#8B4A58" : "#2A0810"}`,
                borderRadius: 4, fontFamily: "Georgia,serif",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                letterSpacing: 1, transition: "all .2s",
              }}>
                {tier.cta}
              </button>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tier.features.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontSize: 13, color: f.included ? "#60A070" : "#2A1810", flexShrink: 0, marginTop: 1 }}>
                      {f.included ? "✓" : "—"}
                    </span>
                    <span style={{ fontSize: 12, color: f.included ? "#C8BFB4" : "#3A2520", lineHeight: 1.5, fontStyle: f.label.startsWith("Everything") ? "italic" : "normal" }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* ROI note */}
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #1A0810", fontSize: 11, color: "#5C3040", fontStyle: "italic", lineHeight: 1.6 }}>
                {tier.roi}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ROI CALCULATOR ────────────────────────────── */}
      <div style={{ background: "#0A0204", borderTop: "1px solid #1A0810", borderBottom: "1px solid #1A0810", padding: "72px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#5C3040", fontWeight: 700, letterSpacing: 4, marginBottom: 16 }}>THE REAL QUESTION</div>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: "#F0EBE0", margin: "0 0 16px", lineHeight: 1.2 }}>
                What is the chaos<br />
                <em style={{ color: "#8B4A58" }}>actually costing you?</em>
              </h2>
              <p style={{ fontSize: 14, color: "#8A7A70", fontStyle: "italic", lineHeight: 1.8, margin: 0 }}>
                You are already paying for the problem. You're just paying it in delayed drops, eroded margins, and hours spent chasing suppliers on WhatsApp.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              {ROI_ITEMS.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "16px 0", borderBottom: `1px solid ${i < ROI_ITEMS.length - 1 ? "#1A0810" : "transparent"}` }}>
                  <div>
                    <div style={{ fontSize: 13, color: "#C8BFB4", marginBottom: 3 }}>{item.scenario}</div>
                    {item.note && <div style={{ fontSize: 11, color: "#5C3040", fontStyle: "italic" }}>{item.note}</div>}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: i === ROI_ITEMS.length - 1 ? "#60A070" : "#8B4A58", flexShrink: 0, marginLeft: 24 }}>
                    {item.cost}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COMPARISON — vs. WhatsApp & Excel ─────────── */}
      <div style={{ padding: "72px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 10, color: "#5C3040", fontWeight: 700, letterSpacing: 4, marginBottom: 14 }}>WHY NOT JUST USE WHATSAPP AND EXCEL</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#F0EBE0", margin: 0 }}>A fair comparison.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 0 }}>
          {/* Header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #1A0810" }} />
          {["WhatsApp + Excel", "A+ Ops"].map((col, ci) => (
            <div key={col} style={{ padding: "14px 20px", borderBottom: "1px solid #1A0810", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: ci === 1 ? "#8B4A58" : "#5C3040" }}>{col.toUpperCase()}</div>
            </div>
          ))}

          {[
            ["Know your real margin after delays & defects", false, true],
            ["See production progress without calling anyone", false, true],
            ["Your tailor can update from her phone in 30 seconds", false, true],
            ["Supplier nudge without opening WhatsApp", false, true],
            ["Drop countdown visible every time you open it", false, true],
            ["Know which supplier is actually reliable", false, true],
            ["One place for every order, every conversation", false, true],
            ["It costs you nothing", true, false],
          ].map(([label, wa, ap], ri) => (
            <>
              <div key={`l-${ri}`} style={{ padding: "13px 20px", borderBottom: "1px solid #0E0406", fontSize: 13, color: "#C8BFB4" }}>{label}</div>
              {[wa, ap].map((val, vi) => (
                <div key={`v-${ri}-${vi}`} style={{ padding: "13px 20px", borderBottom: "1px solid #0E0406", textAlign: "center", background: vi === 1 ? "#0A0204" : "transparent" }}>
                  <span style={{ fontSize: 18, color: val ? "#60A070" : "#3A1810" }}>{val ? "✓" : "✗"}</span>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      {/* ── FOR WHOM ──────────────────────────────────── */}
      <div style={{ background: "#0A0204", borderTop: "1px solid #1A0810", padding: "72px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#5C3040", fontWeight: 700, letterSpacing: 4, marginBottom: 16 }}>BUILT FOR</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#F0EBE0", margin: "0 0 16px" }}>
            Every kind of African fashion brand.
          </h2>
          <p style={{ fontSize: 14, color: "#8A7A70", fontStyle: "italic", marginBottom: 48, lineHeight: 1.7 }}>
            From a two-tailor atelier in Surulere to a scaling RTW brand shipping to London.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "left" }}>
            {[
              { icon: "🧵", title: "Made-to-order & bridal", body: "See your atelier in real time. Stop chasing your tailors on WhatsApp. Know when each client's piece will be ready." },
              { icon: "👗", title: "Seasonal RTW brands", body: "Know your real margins before you price your next drop. Track every supplier, every batch, every delay — in one place." },
              { icon: "🪡", title: "Multi-label & scaling founders", body: "Run multiple brands from one account. The infrastructure that takes most brands five years to build — available from Day One." },
            ].map(card => (
              <div key={card.title} style={{ background: "#0E0406", border: "1px solid #1A0810", borderRadius: 6, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{card.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F0EBE0", marginBottom: 10 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: "#8A7A70", fontStyle: "italic", lineHeight: 1.7 }}>{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────── */}
      <div style={{ padding: "72px 48px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#F0EBE0", margin: 0 }}>Questions.</h2>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid #1A0810" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 20 }}>
              <span style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "#F0EBE0", textAlign: "left" }}>{faq.q}</span>
              <span style={{ color: "#5C1A22", fontSize: 22, flexShrink: 0, transition: "transform .2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </button>
            {openFaq === i && (
              <div style={{ paddingBottom: 22, fontSize: 14, color: "#8A7A70", fontStyle: "italic", lineHeight: 1.8 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── CLOSING CTA ───────────────────────────────── */}
      <div style={{ background: "#3D0A14", padding: "88px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, #5C1A22 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: "#F0EBE0", lineHeight: 1.15, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }}>
            The infrastructure<br />exists. <em style={{ color: "#C8A0A8" }}>The time<br />is now.</em>
          </div>
          <p style={{ fontSize: 15, color: "#C8A0A8", fontStyle: "italic", marginBottom: 40, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>
            The African woman buying Zara for Monday and going to a Lekki designer for Saturday — she does not yet have a brand for Tuesday through Friday. That brand needs infrastructure. This is it.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#F0EBE0", color: "#3D0A14", border: "none", padding: "16px 36px", borderRadius: 4, fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
              Start your 14-day trial
            </button>
            <button style={{ background: "transparent", color: "#F0EBE0", border: "1px solid #8B4A58", padding: "16px 36px", borderRadius: 4, fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
              Book a demo with A+
            </button>
          </div>
          <div style={{ marginTop: 24, fontSize: 12, color: "#8B4A58", fontStyle: "italic" }}>
            14 days free · No credit card required · Setup session included
          </div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────── */}
      <div style={{ background: "#0A0204", borderTop: "1px solid #1A0810", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 6, color: "#F0EBE0" }}>A+</div>
          <div style={{ fontSize: 9, letterSpacing: 2.5, color: "#3A2020", marginTop: 2 }}>VENTURE STUDIO</div>
        </div>
        <div style={{ fontSize: 11, color: "#3A2020", fontStyle: "italic" }}>
          Built for African fashion. Priced for African brands.
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 11, color: "#3A2020" }}>
          {["Privacy", "Terms", "Contact"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
        </div>
      </div>

    </div>
  );
}
