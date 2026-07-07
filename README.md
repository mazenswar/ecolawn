# Binswar Starter / Showroom (last updated 060526)

A Next.js starter template and live showroom tool built for Binswar client projects.

## Purpose

This repo serves two purposes:

**Showroom** — used during client presentations. The DesignPanel lets
clients pick colors, typography, and site style in real time against
their actual content. This is an internal tool, not public-facing.

**Starter template** — duplicated for each new client project. At
delivery, the DesignPanel and unused theme files are removed, leaving
a clean production site.

### Workflow

- Phase 1 — Layout and copy. Drop in client content, placeholder images.
- Phase 2 — Design. Use the showroom to pick palette, fonts, and style live with the client.
- Phase 3 — Delivery. Lock in design choices, swap real images, remove DesignPanel, ship.

---

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Sass (SCSS), no CSS Modules
- **Images:** next/image — always, never bare img tag
- **Email:** Resend (contact form)
- **Hosting:** Vercel
- **Accessibility:** WCAG 2.1 AA — non-negotiable, built in from the start

---

---

## Accessibility Standard

**Accessibility is WCAG 2.1 AA. It is built in from the start of every
component, not added as a cleanup pass. No component is considered
complete until it meets this standard.**

### Rules that apply to every component

- Always use `next/image`, never a bare `img` tag
- Use `Link` from `next/link` for all internal navigation links
- Use bare `<a>` with `target="_blank"` and `rel="noopener noreferrer"`
  for external links. Include `aria-label` indicating it opens in a new tab
- All images have meaningful `alt` text. Decorative images use `alt=""`
- All interactive elements have `:focus-visible` styles using `--focus-ring`
- All buttons and links meet the 44px minimum tap target via `--min-tap-target`
- Icon-only buttons must have `aria-label`
- Heading levels are logical and sequential — never skip from h1 to h3
- Disclosure elements use `aria-expanded`, `aria-haspopup`, `aria-controls`
- Color contrast meets WCAG AA — 4.5:1 for normal text, 3:1 for large text
- Semantic HTML throughout — nav, main, section, footer, article, aside
- Skip navigation link present in root layout
- `lang` attribute on html element
- No positive tabindex values
- Error messages are associated with their fields via `aria-describedby`
- Loading and dynamic states are communicated via `aria-live` where needed

---

## Design System

### Attribute system

The html element carries five data attributes that drive the entire
visual system. The DesignPanel writes these at runtime. They are also
set as static defaults in layout.js.

```html
<html
	data-theme="clean"
	data-font="editorial"
	data-style="split-contained"
	data-shape="round"
	data-spacing="airy"
></html>
```

`data-shape` and `data-spacing` are never set directly by the user.
They are always derived from `data-style` via the siteStyles config
in `config/design.js`.

### Design config (`/config/design.js`)

Single source of truth for all design options. Four exports:

**palettes** — color palette definitions

```js
{ id, label, description, group, swatches: [color1, color2, color3] }
```

**fontPairings** — font pairing definitions

```js
{ id, label, description, heading: "--font-variable", body: "--font-variable" }
```

**siteStyles** — style definitions that couple hero variant with shape and spacing

```js
{
	(id, label, description, shape, spacing);
}
```

Current styles and their couplings:

| Style ID          | Label                   | Shape | Spacing  |
| ----------------- | ----------------------- | ----- | -------- |
| split-contained   | Soft & Personal         | round | airy     |
| split-rectangular | Clean & Balanced        | soft  | balanced |
| full-bleed        | Dramatic & Bold         | sharp | compact  |
| asymmetric        | Structured & Modern     | sharp | balanced |
| centered          | Editorial & Open        | soft  | airy     |
| background-hero   | Immersive & Atmospheric | sharp | compact  |

### Adding a new palette

1. Add entry to `palettes` array in `config/design.js`
2. Create `styles/themes/yourpalette.scss`
3. Import it in `styles/index.scss`

### Adding a new font pairing

1. Add entry to `fontPairings` array in `config/design.js`
2. Add `[data-font="your-id"]` block in `styles/design/fonts.scss`
3. If using new fonts, add to `config/fonts.js` and apply in `layout.js`

### Adding a new style

1. Add entry to `siteStyles` array in `config/design.js`
2. Add the variant component function in `Hero.js`
3. Add the variant to the router in the main Hero component

### Font system

All theme fonts are loaded at build time in `layout.js`. Each font
has a unique CSS variable name — e.g. `--font-warm-body`. The
`data-font` attribute maps `--font-body` and `--font-heading` to the
correct variables via `styles/design/fonts.scss`. Theme SCSS files do
not set font variables — fonts are controlled exclusively by `data-font`.

---

## Style System

### Tokens (`_tokens.scss`)

All visual decisions are CSS custom properties. To theme a project
override these per-project variables:

```scss
--color-bg
--color-surface
--color-text
--color-muted
--color-border
--color-background-alt
--brand-1   // primary action — buttons, links
--brand-2   // secondary accent — hover states
--brand-3   // surface tint — card and section backgrounds
--brand-4   // border and divider color
--brand-5   // text on brand — usually white
--font-body
--font-heading
```

Full token list includes typography scale, spacing scale, radii,
shadows, transitions, z-index scale, and accessibility tokens.
See `_tokens.scss` for all values.

### Mixins (`_mixins.scss`)

```scss
@include respond(md) // min-width breakpoint
	@include sr-only // visually hidden, screen reader accessible
	@include focus-ring // accessible focus outline
	@include tap-target // 44px minimum touch target
	@include flex-center // centered flex
	@include flex-column // column flex
	@include flex-row-between // space-between flex
	@include flex-wrap // wrapping flex
	@include truncate // text overflow ellipsis
	@include transition(base) // token-based transition
	@include absolute-fill; // position absolute inset 0
```

### Layout classes (`_layout.scss`)

```scss
.container                    // max-width centered wrapper
.block                        // section with vertical padding
.block__content               // content wrapper inside block
.blockTint                    // light surface background
.blockBrand                   // subtle brand tint background
.blockDark                    // dark brand background
.two-col                      // equal two column grid
.two-col-asymmetric           // 1.1fr / 0.9fr grid
.three-col                    // three column grid
.four-col                     // four column grid
.stack                        // vertical flex gap-6
.stack-sm                     // vertical flex gap-4
.stack-lg                     // vertical flex gap-10
.row                          // horizontal flex wrap
.row-between                  // space-between flex row
.col-3 through .col-12        // 12-column span helpers
```

### Global classes (`_globals.scss`)

```scss
.btnPrimary                   // filled brand button
.btnSecondary                 // outlined button
.btnGhost                     // transparent button
.link                         // inline text link
```

### Typography classes (`_typography.scss`)

```scss
.lead                         // large intro paragraph
.label                        // uppercase small label
.text-muted                   // muted color text
.text-center                  // centered text
.prose                        // readable max-width text block
```

---

## Components

### Button (`/components/ui/Button/Button.js`)

Unified button component handling all variants, links, and optional GTM tracking.

```jsx
<Button
	text="Get in touch"
	href="/contact"
	variant="primary" // "primary" | "secondary" | "ghost"
	external={false} // true opens in new tab with aria-label
	trackEvent={{ event: "cta_click" }} // optional GTM push
	disabled={false}
	type="button" // used when no href
/>
```

---

### Nav (`/components/nav/Nav.js`)

Sticky header with mobile hamburger, desktop click dropdowns, and full
keyboard accessibility. Config lives at the top of the file.

```js
const logo = { src, alt, width, height };
const links = [
	{ label: "Services", href: "/services" },
	{
		label: "Work",
		items: [
			{ label: "Web Design", href: "/work/web" },
			{ label: "SEO", href: "/work/seo" },
		],
	},
];
const cta = { text, href, variant };
const homeHref = "/";
```

Parent items with `items` array are triggers only — they do not
navigate. Children are the links. ESC closes menu and returns focus
to burger button.

---

### Footer (`/components/footer/Footer.js`)

Three column footer with contact info, navigation, directory badges,
and social media icons. Config lives at the top of the file.

```js
const contact = { phone, email, address, virtual };
const badges = [{ label, href, src }];
const social = [{ label, href, icon }]; // icon: "instagram" | "linkedin" | "facebook"
const navLinks = [{ label, href }];
const legalLinks = [{ label, href }];
const seoLine = "Optional SEO sentence"; // or null
const copyright = { name, creditText, creditHref };
```

---

### Hero (`/components/sections/Hero/Hero.js`)

Multi-variant homepage hero. The active variant is controlled by the
DesignPanel via `data-style` on the html element — not by heroConfig.
The heroConfig provides content and images only.

**Variants:**

- `split-contained` — circular portrait, copy left, warm and personal
- `split-rectangular` — vertical rectangular portrait, copy left, balanced
- `full-bleed` — full viewport, image fills right half, dramatic
- `asymmetric` — landscape image left, tall copy right, geometric
- `centered` — copy centered above wide image, editorial
- `background-hero` — full width background image, text overlay, atmospheric

```js
const heroConfig = {
	eyebrow: "Optional label", // or null
	heading: "Main heading",
	subheading: "Supporting text",
	cta: { text, href, variant },
	ctaSecondary: { text, href, variant }, // or null
	images: {
		portrait: { src, alt }, // split-contained, split-rectangular, asymmetric
		background: { src, alt }, // full-bleed, background-hero
		landscape: { src, alt }, // centered
	},
	caption: { name, title }, // or null
};
```

Do not add a `variant` field to heroConfig. The variant is controlled
by the DesignPanel style selection via `data-style`.

**Image size guidelines:**

- Portrait — 800x1000px minimum, 4:5 ratio, vertical
- Background — 1200x1600px minimum, vertical, strong subject center-top
- Landscape — 1800x960px minimum, 16:9 or wider, horizontal

---

### PageHero (`/components/sections/PageHero/PageHero.js`)

Lightweight interior page hero for all non-home pages.

```js
const pageHeroConfig = {
	eyebrow: "Optional label", // or null
	heading: "Page Title",
	subheading: "Brief description",
	image: { src, alt, width, height }, // or null
	align: "left", // "left" | "center"
};
```

---

### LogoBar (`/components/sections/LogoBar/LogoBar.js`)

Wrapping row of logos for insurance providers, directory badges,
press mentions, or certifications.

```js
const logoBarConfig = {
	heading: "Accepting most major insurance", // or null
	logos: [
		{ src, alt, href: null, width: 120 },
		// href: null for display-only logos
		// external href uses bare a tag with aria-label
		// internal href uses Next Link
	],
};
```

---

### CardGrid (`/components/sections/CardGrid/CardGrid.js`)

Three column card grid with optional header and footer CTA.

```js
const cardGridConfig = {
	heading,
	subheading,
	cta: { text, href, variant }, // or null
	cards: [{ title, description, href, cta }],
};
```

---

### TwoColumn (`/components/sections/TwoColumn/TwoColumn.js`)

Two column section with copy and image. Image position is configurable.

```js
const twoColumnConfig = {
	heading,
	paragraphs: ["First paragraph", "Second paragraph"],
	list: ["Point one", "Point two"], // or null
	cta: { text, href, variant }, // or null
	image: { src, alt, width, height },
	imagePosition: "right", // "left" | "right"
};
```

---

### Steps (`/components/sections/Steps/Steps.js`)

Numbered process section. Used for explaining how therapy works,
onboarding steps, etc.

```js
const stepsConfig = {
	heading,
	subheading,
	steps: [{ id, title, description }],
};
```

---

### FAQ (`/components/sections/FAQ/FAQ.js`)

Grouped accordion with optional search and sticky TOC sidebar.
Uses native HTML details/summary for accessibility.

```js
const faqConfig = {
	heading,
	subheading,
	contact: { text, href }, // or null
	searchable: true,
	showToc: true,
	groups: [
		{
			id,
			title,
			items: [{ id, q, a, tags }],
		},
	],
};
```

Answers in `a` support HTML strings. Tags are used for search matching.
Hash-based deep linking works out of the box.

---

### Testimonials (`/components/sections/Testimonials/Testimonials.js`)

Client testimonials with star ratings. Two layout options.

```js
const testimonialsConfig = {
	heading,
	subheading,
	layout: "grid", // "grid" | "featured"
	testimonials: [{ id, quote, name, title, rating }],
};
```

`featured` — first testimonial large, rest in smaller grid.
`grid` — all testimonials equal size.

---

### CTABanner (`/components/sections/CTABanner/CTABanner.js`)

Full width call to action section. Three background variants.

```js
const ctaBannerConfig = {
	heading,
	subheading,
	variant: "brand", // "brand" | "dark" | "light"
	cta: { text, href, variant },
	secondaryCta: { text, href, variant }, // or null
};
```

---

### Gallery (`/components/sections/Gallery/Gallery.js`)

Photo gallery with filter tabs and lightbox. Two layout options.

```js
const galleryConfig = {
	heading,
	subheading,
	layout: "grid", // "grid" | "before-after"
	filterable: true,
	columns: 3, // 2 | 3 | 4
	categories: [{ id, label }],
	images: [{ id, src, alt, category, width, height }],
	beforeAfter: [
		{
			id,
			label,
			before: { src, alt, width, height },
			after: { src, alt, width, height },
		},
	],
};
```

---

### ContactForm (`/components/sections/ContactForm/ContactForm.js`)

Two column contact form with server action submission via Resend.

**Setup:**

1. `npm install resend`
2. Add `RESEND_API_KEY=your_key` to `.env.local`
3. Update `to` email in `/app/actions/contact.js`

```js
const formConfig = {
	heading,
	subheading,
	fields: { name, email, message },
	submitText,
	successHeading,
	successMessage,
};
```

---

### BookingCTA (`/components/sections/BookingCTA/BookingCTA.js`)

Booking section for therapy practices. Links to EHR portal instead
of a contact form. HIPAA safe — no PHI collected on site.

```js
const bookingConfig = {
	heading,
	subheading,
	steps: [{ number, text }],
	cta: { text, href, variant, external: true },
	note: "Disclaimer text below button",
};
```

Update `cta.href` to the SimplePractice, Calendly, or EHR booking link.

---

### ChipNav (`/components/ui/ChipNav/ChipNav.js`)

Sticky horizontal pill navigation for long single pages. Smooth
scrolls to sections accounting for sticky header offset.

```js
const chipNavConfig = {
	label: "Jump to section",
	chips: [{ id, label }],
};
```

Place immediately after PageHero. Section elements need matching `id` attributes.

---

### DesignPanel (`/components/ui/DesignPanel/DesignPanel.js`)

Live design customizer for the showroom. Renders a floating trigger
button and a panel with three sections.

**Colors** — switches palette via `data-theme`
**Typography** — switches font pairing via `data-font`
**Style** — switches hero variant and automatically applies coupled
shape and spacing via `data-style`, `data-shape`, `data-spacing`

Add to `layout.js`:

```jsx
import DesignPanel from "@/components/ui/DesignPanel/DesignPanel";
// Place inside body, above Nav or in a fixed position wrapper
```

Remove at delivery — see Delivering a Project below.

---

## Metadata System

### Central config (`/config/site.js`)

Edit per project: site name, URL, contact info, branding, social,
business type, analytics IDs, OG image colors.

### Metadata helper (`/config/metadata.js`)

```js
// In each page.js
export const metadata = generateMeta({
	title: "Page Title",
	description: "Page description for search engines.",
	path: "/page-path",
});
```

### Dynamic OG image (`/app/api/og/route.js`)

Generates 1200x630 branded OG images per page using logo from
`/public` and colors from `site.js`. No manual image creation needed.

---

## Analytics

1. Get GA4 Measurement ID from Google Analytics
2. Add to `config/site.js` under `analytics.ga4`
3. Deploy — scripts load automatically via `@next/third-parties`

For GTM use `analytics.gtm`. For Search Console verify via DNS TXT record.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable       | Required             | Description             |
| -------------- | -------------------- | ----------------------- |
| RESEND_API_KEY | If using ContactForm | API key from resend.com |

---

## Starting a New Project

1. Duplicate this repo and rename for the client
2. Update `config/site.js` — name, URL, contact, analytics
3. Update config blocks in Nav and Footer
4. Update heroConfig in `app/page.js` with client content and images
5. Update or replace section configs on each page
6. Add client images to `/public`
7. Add `RESEND_API_KEY` to `.env.local` if using ContactForm
8. Update `to` email in `/app/actions/contact.js`
9. Update routes in `app/sitemap.js`

---

## Delivering a Project

When design is locked and content is final:

1. Remove `<DesignPanel />` from `layout.js`
2. Delete `components/ui/DesignPanel/`
3. Set the chosen attributes as static defaults on html element in `layout.js`:

```html
<html
	data-theme="clean"
	data-font="editorial"
	data-style="split-contained"
	data-shape="round"
	data-spacing="airy"
></html>
```

4. Delete unused theme files from `styles/themes/`
5. Delete `config/design.js` if no longer needed
6. Run the full launch checklist

---

## Launch Checklist

### Accessibility

- [ ] Run axe DevTools — fix all critical and serious violations
- [ ] Run Lighthouse accessibility audit — aim for 95+
- [ ] Check color contrast with WebAIM for all color combinations
- [ ] Test full keyboard navigation manually — tab through every interactive element
- [ ] Test with screen reader (VoiceOver on Mac or NVDA on Windows)
- [ ] Verify skip navigation link works
- [ ] Check all form fields have associated labels
- [ ] Verify focus is managed correctly in all modals and dropdowns

### SEO and Metadata

- [ ] Verify page titles and descriptions on all pages
- [ ] Verify OG images render correctly at opengraph.xyz
- [ ] Confirm sitemap is accessible at /sitemap.xml
- [ ] Submit sitemap in Google Search Console
- [ ] Verify Google Analytics is receiving data
- [ ] Check canonical URLs are correct

### Performance

- [ ] Run Lighthouse performance audit — aim for 90+
- [ ] Verify all images use next/image with correct sizes prop
- [ ] Check no layout shift on load (CLS score)

### Functional

- [ ] Test contact form end to end in production
- [ ] Test all external links open in new tab
- [ ] Test booking CTA link goes to correct EHR portal
- [ ] Check all pages on mobile — iOS Safari and Android Chrome
- [ ] Verify nav mobile menu opens and closes correctly
- [ ] Test all dropdown menus keyboard accessible

### Before Going Live

- [ ] Remove DesignPanel from layout.js
- [ ] Remove any placeholder or test content
- [ ] Verify domain and DNS are configured correctly
- [ ] Confirm SSL certificate is active
- [ ] Set environment variables in Vercel dashboard

---

## Notes and Conventions

- All components are either self-contained (config at top of file) or
  prop-driven (config passed from page). Self-contained: Nav, Footer,
  DesignPanel. Prop-driven: all section components.
- Page-level styles use double underscore scoping: `.home__page`, `.about__page`
- Never edit component JSX or SCSS for content changes. All content
  customization goes in the config block or props.
- `next/image` always. Never bare img tag.
- `Link` from next/link for internal links. Bare `a` for external.
- Accessibility is verified before any component is considered complete.
- The DesignPanel is a showroom tool only. It is removed before delivery.
- hero variant is controlled by `data-style` via DesignPanel, never
  by heroConfig.variant.
- `data-shape` and `data-spacing` are always derived from `data-style`.
  Never set them independently.
