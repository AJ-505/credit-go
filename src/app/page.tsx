import Link from "next/link";
import React from "react";

export default function Home() {
  const variations = [
    // Dark Themes
    { id: 1, name: "OpenClaw Red", mode: "Dark", desc: "Dark background, deep glowing red radial gradients, centered text, highly dramatic." },
    { id: 2, name: "T3 Grid", mode: "Dark", desc: "Dark monochrome, grid paper background, sleek floating tech icons." },
    { id: 3, name: "Rabbit Tech", mode: "Dark", desc: "Top orange banner, dark gray background, technical split UI mimicking a trust dashboard." },
    { id: 4, name: "DropBox Bold", mode: "Dark", desc: "Massive bold typography, stark black, simple white text, blue CTA." },
    { id: 5, name: "Aceter Glow", mode: "Dark", desc: "Subtle glow, glassmorphism, incredibly clean lines." },
    
    // Light Themes
    { id: 6, name: "Clean Fintech", mode: "Light", desc: "Neumorphic, lots of white space, soft shadows, rounded corners (Kuda/Monzo vibe)." },
    { id: 7, name: "Brutalist Editorial", mode: "Light", desc: "Serif fonts, heavy black borders, stark white and bright orange (Stripe/High-end magazine)." },
    { id: 8, name: "Playful Pop", mode: "Light", desc: "High contrast borders, bright accent colors on cream/white, flat design (Gumroad vibe)." },
    { id: 9, name: "Enterprise Trust", mode: "Light", desc: "Light gray/blue, very structured, data-heavy look (Standard enterprise SaaS)." },
    { id: 10, name: "Zen Minimal", mode: "Light", desc: "Pure white, extremely thin lines, very subtle typography (Apple/High-end lifestyle)." },
  ];

  return (
    <main className="min-h-screen bg-stone-950 p-6 font-sans text-white md:p-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-bold tracking-[0.24em] text-emerald-400 uppercase">
            CreditGo Prototype Variants
          </p>
          <h1 className="mb-5 text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
            10 Distinct Visions.
          </h1>
          <p className="text-lg leading-8 text-stone-400">
            5 Dark modes. 5 Light modes. Every variant contains a full flow: Landing Page → Role Selection → Verification Form → XGBoost Trust Dashboard.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {variations.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className="group block rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.08]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-4xl font-black text-white/20 transition-colors group-hover:text-emerald-400/40">
                  {v.id < 10 ? `0${v.id}` : v.id}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-[0.16em] uppercase ${v.mode === 'Dark' ? 'bg-stone-800 text-stone-300' : 'bg-white text-black'}`}>
                  {v.mode}
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">{v.name}</h2>
              <p className="text-sm leading-6 text-stone-400 mb-6 h-12">
                {v.desc}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                View Full Flow →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
