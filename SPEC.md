# SPEC: SOET Manifesto Website (Phase 1)

## Goal
Fast, mobile-first single-page website for Mohammad Meraj, candidate for
Executive Committee Member, School of Engineering and Technology (SOET),
Maulana Azad National Urdu University (MANUU). Students open it from WhatsApp.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS, no backend, no database, no login
- Deploy: GitHub -> Vercel

## Sections
1. Hero: name, position, school, university, slogan, "Read the manifesto" button
2. Manifesto: title, opening line, 5 topic cards with 18 points total
3. About the candidate: placeholder text
4. Suggest an idea: button linking to a Google Form (placeholder URL)
5. Footer: "Student campaign website for Mohammad Meraj. Not an official MANUU website."

## Content rules
- ALL text is read from content/manifesto.json. Never hard-code manifesto text.
- Wording stays "advocate / seek / work for". Never say approved or guaranteed.
- Do not invent election details, endorsements, statistics or counters.
- Keep placeholders as they are: [FINAL SLOGAN], [VOTING TIME AND VENUE].
- Do not alter, redraw or recolour the MANUU logo.

## Design (editorial / neo-brutalist)
- Background warm cream (~#F3EAD3), text near-black (~#1A1410), one gold
  accent (~#C9A227) used for backgrounds/borders/highlights, never for body text.
- Headings: heavy condensed uppercase display font (Anton or Bebas Neue via
  next/font). Body: Inter, 16px+, line-height 1.6.
- Small uppercase labels above section headings.
- Cards: 2px near-black border, hard offset shadow (4px 4px 0), no blur.
- Buttons: min height 48px, thick border, high contrast.
- Max 3-4 nav items. No popups, tickers, chat widgets or counters.
- Manifesto points as accordions (number badge + title, tap to expand).
- Mobile bottom bar: "Share on WhatsApp" and "Suggest an idea".
- Subtle motion only.
- Define colours in the Tailwind config, not as scattered hex codes.
- Do not copy any text or assets from other websites.

## Out of scope
Login, database, complaints, chat, comments, analytics.

## Done when
Works on mobile and desktop, live on a Vercel URL, Lighthouse performance 90+.
