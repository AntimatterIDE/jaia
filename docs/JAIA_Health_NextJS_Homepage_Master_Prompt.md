# JAIA Health Website — Implementation Master Prompt

You are the lead product designer, brand designer, accessibility specialist, and senior Next.js engineer responsible for creating the first production-quality design direction for JAIA Health.

Do not stop at a written concept or static mockup. Inspect the available source files, make the design decisions, implement the code, run quality checks, and leave the project in a clean working state. The homepage is the finished design target for this pass. The remaining required routes should be polished, responsive stubs that establish the shared system and prove the navigation architecture.

## 1. Source material and precedence

Before writing code, locate and inspect all supplied files and the existing repository:

- Brand Guidlines -JAIA.pdf
- Jaia_Health_Website_Proposal (1).pdf
- The supplied screenshot of the current JAIA service presentation
- The current public site: https://jaiahealth.com/
- Any JAIA logos, SVGs, photography, notes, copy documents, or other client assets present in the repository or attached to the task

If an attachment is available in the coding environment but not inside the repository, inspect it there. If one of the original files is unavailable, continue using the complete specification in this prompt and list the missing item in the handoff. Do not block the homepage build over a missing secondary asset.

Use this precedence when sources conflict:

1. This prompt and the latest user instruction
2. Garrett and Tesh's client notes and approved assets
3. The JAIA brand guide
4. The Antimatter AI proposal
5. The current public website

The latest requirement is six dedicated service routes, even though an earlier proposal referenced five. Do not expose proposal pricing, internal scope, project timing, or Antimatter information on the public site.

## 2. Business and audience

JAIA Health is a high-touch healthcare management and practice-transformation partner for independent private practices. It brings together programs, diagnostics, therapies, revenue operations, and laboratory support that help practices add capability, grow thoughtfully, and improve patient access and outcomes.

Primary audiences:

- Independent-practice owners and physician leaders
- Practice administrators and operations executives
- Multi-location medical groups evaluating new service lines
- Healthcare decision-makers looking for a credible operating partner

The site must feel credible enough for an enterprise healthcare conversation but personal enough to communicate JAIA's boutique delivery model. It should feel polished, calm, modern, precise, and human. It must not look like a generic hospital site, a wellness spa, a blue SaaS template, or a futuristic AI company.

Core positioning line:

“A trusted partner for the modern private practice.”

Approved brand tagline that may be used once:

“Advancing HealthCare Together: Expertise from Our Clinics to Yours.”

Current positioning summary:

“JAIA Health brings the programs, diagnostics, therapies, and operational support independent practices need to grow revenue and elevate patient outcomes.”

Do not invent awards, accreditations, client logos, customer counts, revenue numbers, testimonials, clinical efficacy claims, payer guarantees, HIPAA claims, or regulatory endorsements. Use “designed to,” “supports,” or “helps” where a result is not guaranteed. Preserve “Medicare-recognized” for APCM and BHI; do not rewrite it as “Medicare-approved.”

## 3. Required deliverable for this pass

Build a complete, visually refined homepage and a shared responsive site shell. Create the following nine working routes:

1. /
2. /about
3. /contact
4. /services/apcm-bhi
5. /services/hrv-assessment
6. /services/iv-therapy
7. /services/billing-rcm
8. /services/laboratory-coordination
9. /services/pol-establishment

The homepage must be ready for design review at desktop, tablet, and mobile widths. About, Contact, and the six service routes should not be blank or use lorem ipsum. Give each one a polished hero, approved summary copy, appropriate metadata, breadcrumbs where useful, and a relevant CTA, but do not spend this pass building their full final page content.

Do not add a client portal, chatbot, ROI calculator, case-study system, blog, or additional public routes in this pass unless one already exists in the repository and can be preserved safely. Leave clean extension points for those proposal features.

## 4. Creative direction

Create an editorial healthcare experience with generous whitespace, disciplined typography, strong image cropping, fine linework derived from the JAIA symbol, and only a few purposeful motion moments.

The site should be approximately:

- 80 percent white or very light neutral canvas
- 15 percent mist or restrained sky-blue tinted surface
- 5 percent charcoal emphasis, primarily the final CTA and footer

Do not alternate dark and light backgrounds on every section. Use one sustained visual system so the page feels composed rather than assembled from unrelated blocks.

Avoid:

- A generic three-by-two grid of identical service cards as the primary service experience
- Excessive gradients, glassmorphism, neon, generic glowing orbs, or “AI” visual language
- A full-page video hero
- Scroll hijacking, aggressive parallax, custom cursors, magnetic buttons, text scrambling, or continuous marquees
- Decorative motion that competes with reading
- Stock photos of a doctor standing with crossed arms against a blank wall
- Overly clinical hospital imagery, surgical scenes, visible patient records, or identifiable PHI
- Tiny type, low-contrast pale-blue text, pill overload, and excessive rounded containers
- Auto-rotating content without a visible pause control

### Signature visual idea 1: JAIA Capability Field

Create a custom hero visual called CapabilityField.

On desktop, place an editorial healthcare image in a tall, softly rounded frame. Overlay a very restrained version of the JAIA symbol linework and six small, clearly legible service anchors around the image. Fine SVG connector lines lead toward a central JAIA mark or central “Practice capability” label. Hovering or focusing an anchor should highlight the corresponding line and reveal a one-sentence label, but every anchor must already be understandable and usable without hover.

All six anchors are semantic links to their service routes. They must be reachable in a logical keyboard order and have an obvious focus state. Do not draw critical text into canvas or SVG. SVG connectors are decorative and should be hidden from assistive technology.

On tablet and mobile, replace the orbit-style placement with a simple two-column or single-column group below the image. Do not squeeze or overlap the desktop composition. With reduced motion enabled, show the final static state immediately.

### Signature visual idea 2: Six-service Capability Stack

Use a refined scroll-linked stack to tell the six-service story. This is the primary service presentation and replaces the current generic card grid.

Each panel should contain:

- Service number and category
- Service name
- Approved summary
- Two or three concise capability labels
- A distinctive Lucide icon
- A clear “Explore service” link
- Optional restrained editorial image or custom geometric detail

On large screens, panels may stack with a modest sticky overlap as the user scrolls. Never hijack scrolling or trap the user. The natural document remains readable and all links remain focusable. On mobile, at 200 percent zoom, and under prefers-reduced-motion, render the panels as a normal vertical list with no sticky overlap.

Use no more than three prominent motion primitives across the page. Repetition and restraint are part of the visual quality.

## 5. Brand system

Use the supplied logo assets exactly. Prefer an SVG or other vector file. Do not recreate the JAIA wordmark with a substitute font, distort the symbol, change its proportions, place effects inside it, or rasterize it unnecessarily. If only a PDF brand guide is available, use a clearly labeled temporary asset and list the required production logo export in the handoff.

### Brand colors

Create semantic CSS variables rather than scattering hex values:

| Token        | Value   | Use                                                          |
| ------------ | ------- | ------------------------------------------------------------ |
| brand-ink    | #322F2F | Primary text, dark surfaces, primary button                  |
| brand-sky    | #87CDEC | Brand accent, linework, tinted surface, dark-background text |
| brand-slate  | #636366 | Secondary text on white                                      |
| brand-mist   | #E9E8E9 | Pattern, borders, subtle neutral surface                     |
| brand-action | #276F91 | Accessible links and controls on white                       |
| canvas       | #FFFFFF | Main page background                                         |
| canvas-soft  | #F7F8F8 | Quiet section surface                                        |

Important contrast rules:

- #87CDEC does not have enough contrast for normal text on white. Never use it for small body copy or a text-only button on white.
- Use #276F91 for interactive blue text on white.
- Charcoal text on the brand-sky background is acceptable and visually on-brand.
- Use white or brand-sky text on charcoal surfaces as appropriate.
- Keep normal text at or above a 4.5:1 contrast ratio and large text and interface boundaries at or above their applicable WCAG Level AA ratios.

### Typography

- Logo: use the actual logo asset; the brand guide identifies Elena as the stylized logo font.
- Display and headings: Montserrat, generally 500 to 700.
- Body and UI: Lato, generally 400 to 700.
- Editorial accent: Noto Serif, used sparingly for a quotation, tagline, or short display phrase only.
- Load fonts through next/font where possible and use sensible fallbacks.

Use a fluid type scale with clamp. Keep body copy around 17 to 19 pixels on desktop and never below 16 pixels on mobile. Use comfortable line heights and keep long copy columns near 60 to 70 characters.

### Shape and graphic language

- Use soft but controlled radii, generally 16 to 28 pixels on large surfaces and smaller radii on controls.
- Use thin neutral borders and almost imperceptible shadows.
- Reuse the geometry and line weight of the JAIA symbol as a background watermark, connector motif, or section divider.
- Prefer clean two-dimensional SVG linework to heavy 3D or WebGL effects.
- Use one coherent icon family, preferably Lucide, with customized stroke weight and brand-color containers.

## 6. Homepage information architecture and component map

### A. Site header

Build a sticky, calm header with:

- JAIA logo linked to the homepage
- Services navigation containing all six service links
- About
- Contact
- Primary CTA: “Start a conversation”

Use shadcn/ui Navigation Menu on desktop, Sheet for the mobile menu, and Button for CTAs. The dropdown must work by keyboard, expose correct state, close on Escape, and never require hover. Add a skip link as the first focusable element. Reduce the header height slightly after scroll only if this can be done without layout shift.

### B. Hero

Use this copy as the primary direction:

Eyebrow:

“A trusted partner for the modern private practice”

H1:

“Expand what your practice can do.”

Supporting copy:

“JAIA Health brings the programs, diagnostics, therapies, and operational support independent practices need to grow revenue and elevate patient outcomes.”

Primary CTA:

“Start a conversation”

Secondary CTA:

“Explore our capabilities”

Optional capability line:

“Programs · Diagnostics · Therapies · Operations”

Layout: a strong editorial split, roughly 55/45, with text on the left and CapabilityField on the right. Keep the H1 semantic and intact. Do not split the accessible H1 into individual characters. Use React Bits Animated Content, or an equivalent lightweight implementation, for a restrained first-load sequence: eyebrow, heading, body, CTAs, then hero visual. Keep movement to roughly 8 to 16 pixels and use opacity rather than theatrical blur.

### C. Partnership statement

Create a narrow transition section that says:

“From care management to laboratory operations, JAIA brings the infrastructure and expertise to turn new capabilities into sustainable services.”

Support it with four quiet labels: Programs, Diagnostics, Therapies, Operations. This is not a moving marquee.

### D. Services introduction and Capability Stack

Eyebrow:

“Six connected capabilities”

H2:

“One partner for the clinical and operational work behind practice growth.”

Supporting copy:

“Explore the programs, diagnostics, therapies, and operational services JAIA can help your practice put into action.”

Use the six service records in the content section below. Implement the signature Capability Stack using React Bits Scroll Stack as a starting point, or a custom CSS sticky stack if that produces a cleaner, more accessible result. Accessibility and performance take precedence over reproducing a library demo.

### E. Outcomes section

Eyebrow:

“Built around the realities of private practice”

H2:

“More capability. Less operational drag.”

Create three outcome views:

1. Grow thoughtfully — Add services and programs with a clearer operational path.
2. Expand patient access — Bring more care, diagnostics, and therapies into the practice journey.
3. Strengthen the operation — Support the workflows, training, coordination, and revenue processes behind delivery.

Use shadcn Tabs on desktop and an accessible stacked presentation or Accordion on small screens. Do not auto-cycle. Pair the content with one subtle diagram showing a practice at the center and the three outcomes around it. Keep the diagram decorative unless its labels are also present as HTML.

### F. Approach section

Eyebrow:

“A practical operating partnership”

H2:

“From opportunity to operation.”

Draft four steps:

1. Understand — Align on the practice, goals, existing workflows, and service opportunity.
2. Design — Shape the program, partners, protocols, and operating model.
3. Launch — Coordinate implementation, training, and the transition into daily use.
4. Support — Help the practice sustain and refine the operation over time.

Treat this as draft marketing language and centralize it in the content model for easy client revision. Present the steps as a clean editorial sequence. React Bits Spotlight Card may be used for the step containers, but the pointer-following light is purely decorative, subtle, disabled on touch and reduced-motion devices, and never the only indication of focus.

### G. About/brand story

Use a wide editorial image with a text panel.

Eyebrow:

“The JAIA approach”

H2:

“Expertise from our clinics to yours.”

Draft body:

“JAIA works alongside independent practices to bring specialized programs, diagnostic capabilities, therapies, and operating support into one coordinated partnership. The goal is practical progress: stronger capabilities, sustainable workflows, and a better experience for the practices and patients they serve.”

CTA:

“Meet JAIA”

Do not invent team-member names, bios, credentials, or photographs. If approved team assets exist, keep the full team treatment for the About page rather than crowding the homepage.

### H. FAQ

Use shadcn Accordion with five concise draft questions:

1. What types of practices does JAIA work with?
2. Can a practice begin with one service?
3. What does the implementation process look like?
4. How does JAIA work with a practice's existing team and systems?
5. What information should we include when contacting JAIA?

Keep answers cautious and high-level. Do not make regulatory, reimbursement, clinical, timing, or financial guarantees. The contact answer must explicitly tell users not to submit patient information or protected health information.

### I. Final CTA

Use the page's only substantial charcoal band with an oversized, low-opacity JAIA symbol line pattern.

H2:

“Ready to expand what your practice can do?”

Body:

“Tell us where you want to grow. JAIA will help you map the right next conversation.”

CTA:

“Start a conversation”

### J. Footer

Include:

- JAIA logo
- One-sentence positioning statement
- About and Contact links
- All six service links
- Copyright with dynamic year
- Only client-provided social links

Do not create fake addresses, phone numbers, email addresses, privacy claims, certifications, or social accounts.

## 7. Authoritative service content

Centralize these records in one typed content file and reuse them for navigation, the homepage, route generation, metadata, and service-page stubs.

### 1. APCM + BHI

- Slug: apcm-bhi
- Category: Care management
- Full name: Advanced Primary Care Management + Behavioral Health Integration
- Summary: “Medicare-recognized programs designed to generate recurring monthly revenue while strengthening chronic care coordination and behavioral health access.”
- Capability labels: Program infrastructure; Chronic care coordination; Behavioral health access
- Suggested icon: HeartPulse

### 2. HRV Assessment

- Slug: hrv-assessment
- Category: Diagnostics
- Full name: Heart Rate Variability Assessment
- Summary: “Objective heart rate variability testing that quantifies autonomic nervous system function—informing personalized care plans and tracking patient response over time.”
- Capability labels: Objective assessment; Care-plan insights; Longitudinal tracking
- Suggested icon: Activity

### 3. IV Therapy

- Slug: iv-therapy
- Category: In-practice therapy
- Full name: IV Therapy
- Summary: “Turnkey in-practice IV therapy programs: protocol design, supply chain, staff training, and regulatory considerations—so practices can offer the service confidently and sustainably.”
- Capability labels: Protocol design; Supply chain; Staff training
- Suggested icon: Droplets

### 4. Billing & RCM

- Slug: billing-rcm
- Category: Revenue operations
- Full name: Billing & Revenue Cycle Management
- Summary: “End-to-end revenue cycle management—coding, claims, denials, and accounts-receivable recovery—built to integrate with how the practice already operates.”
- Capability labels: Coding and claims; Denial management; A/R recovery
- Suggested icon: ReceiptText

### 5. Laboratory Coordination

- Slug: laboratory-coordination
- Category: Diagnostic access
- Full name: Laboratory Coordination
- Summary: “Coordinated access to established third-party reference laboratories, giving practices broad diagnostic coverage at favorable economics. Testing is performed by accredited labs; JAIA handles the partnerships and routing.”
- Capability labels: Reference-lab access; Partnership coordination; Test routing
- Suggested icon: FlaskConical

### 6. POL Establishment

- Slug: pol-establishment
- Category: Laboratory operations
- Full name: Physician Office Laboratory Establishment
- Summary: “Physician Office Laboratory setup and ongoing operations, including CLIA considerations, equipment selection, validation, and staff training from end to end.”
- Capability labels: CLIA considerations; Equipment and validation; Staff training
- Suggested icon: Microscope

Do not materially expand these summaries with unsupported claims. The first use of APCM, BHI, RCM, A/R, POL, and CLIA on a full service page should be expanded or explained in plain language.

## 8. Stub-page requirements

### About

Include a refined interior hero, the “Expertise from our clinics to yours” positioning, a concise statement of the partnership model, a reserved team section that only renders real supplied team records, and a contact CTA. If no approved team data is available, omit the cards entirely rather than inventing people.

### Contact

Create an accessible inquiry form UI with:

- First name
- Last name
- Work email
- Organization or practice
- Role
- Service of interest
- Message

Use persistent labels, clear required-state text, inline error summaries, autocomplete attributes, and a honeypot field. Show this notice next to the message:

“Please do not include patient names, medical records, or other protected health information in this form.”

Do not fake a successful submission. If the contact backend is not part of the current repository, isolate the form action behind a typed interface and state in the handoff that Resend and persistence still need to be connected.

### Service routes

Generate the six pages from the service content model. Each stub should include:

- Breadcrumb
- Category eyebrow
- Full service name
- Approved summary
- Three capability labels
- Relevant icon or simple brand illustration
- CTA to Contact with the service preselected through a query parameter or route state
- Unique title and meta description

Keep them polished enough that every navigation link has a credible destination. Add code comments or content metadata for future sections, but do not show “lorem ipsum,” “coming soon,” or internal TODO language in the rendered UI.

## 9. Stock-image direction

First use approved JAIA photography if it exists. If it does not, source two or three temporary, licensing-safe editorial images from a reputable stock source such as Unsplash or Pexels. Record the creator, source URL, license/source, and intended production status in docs/image-credits.md.

Suggested image briefs:

1. Hero: a physician owner or practice leader in a real, modern independent-clinic environment collaborating with another professional; natural window light; candid rather than posed; vertical crop with negative space.
2. About: a small clinical and administrative team working through a workflow or reviewing a screen together; no visible patient data; horizontal crop.
3. Optional lab detail: tasteful close-up of modern laboratory handling or diagnostic equipment, with no brand conflict, blood-heavy imagery, patient identifiers, or dramatic hospital setting.

Use Next Image with correct width, height, sizes, responsive art direction, modern formats, and appropriate loading priority. Only the true LCP hero image should be priority-loaded. Give meaningful images useful alt text and decorative images an empty alt attribute. Do not embed text inside images. Avoid hotlinking a fragile query URL in production; download approved files into public/images when licensing permits.

Apply a restrained cool tonal treatment so stock photography feels integrated, but retain natural skin tones. Do not place a heavy blue overlay across every image.

## 10. React Bits and shadcn/ui component strategy

Use official, current documentation and inspect each component's actual API before installation. Do not guess registry package names or paste stale snippets.

Preferred React Bits candidates:

- Animated Content for restrained hero and section entry
  - https://reactbits.dev/animations/animated-content
- Scroll Stack as the starting point for the six-service story
  - https://reactbits.dev/components/scroll-stack
- Spotlight Card for the four approach steps
  - https://reactbits.dev/components/spotlight-card
- Magic Bento only as a fallback for a later capabilities section, not in addition to the Scroll Stack
  - https://reactbits.dev/components/magic-bento

React Bits is source code to adapt, not an accessibility guarantee. Modify or replace any implementation that hides SSR content, breaks keyboard order, creates scroll trapping, depends on hover, ignores reduced motion, causes hydration errors, or adds excessive client-side weight.

If a licensed React Bits Pro package is already available, you may evaluate its Features 3 tabbed block for the outcomes section. Do not purchase, assume, or copy Pro assets without access. Disable auto-cycling and use shadcn Tabs if manual operation is cleaner.

Preferred shadcn/ui primitives:

- Navigation Menu
- Sheet
- Button
- Badge
- Card
- Tabs
- Accordion
- Separator
- Field, Label, Input, Textarea, and Select
- Breadcrumb
- Tooltip only when supplementary text is genuinely needed

Official references:

- https://ui.shadcn.com/docs/components
- https://ui.shadcn.com/blocks

Do not force shadcn's dashboard, login, or sidebar blocks into this marketing site. Use the primitives as an accessible foundation and compose custom JAIA sections around them.

## 11. Motion behavior

Motion should communicate hierarchy and polish, not novelty.

- Initial hero reveal: one short sequence, approximately 600 to 900 milliseconds total.
- Scroll reveals: one-time opacity and 8 to 16 pixel translation, with a restrained stagger.
- Service stack: natural scrolling only, with modest overlap.
- Hover and focus transitions: approximately 150 to 220 milliseconds.
- SVG connector draw: once on load or entry; no perpetual looping.
- No flashing, rapid flicker, bouncing, continuous scale pulsing, or autoplayed horizontal movement.
- Do not animate layout properties when transform and opacity can achieve the result.

Implement both CSS prefers-reduced-motion handling and the library's reduced-motion mechanism where relevant. Under reduced motion:

- All content appears immediately.
- The service stack becomes a normal flow.
- Decorative SVG line drawing is complete from the start.
- Pointer-following effects and parallax are disabled.
- No functionality or content is lost.

Server-render meaningful content. Never leave core copy invisible until JavaScript or an intersection observer runs.

## 12. Accessibility and ADA-oriented acceptance baseline

Target WCAG 2.2 Level AA as the technical acceptance baseline. Do not label the site “ADA certified” or imply that automated tooling alone establishes legal compliance.

Required implementation details:

- Semantic header, nav, main, section, aside where appropriate, and footer landmarks
- One H1 on each page and a logical heading hierarchy
- Skip-to-content link
- Full keyboard operation with visible, high-contrast focus indicators
- Focus order that matches visual and reading order
- Focus must not be hidden by the sticky header; use scroll margin and appropriate offsets
- Navigation dropdowns and mobile sheet must expose state, close with Escape, and return focus correctly
- Touch targets should be at least 44 by 44 CSS pixels where practical and never fall below WCAG 2.2 minimum target rules
- No instruction or distinction conveyed by color alone
- Hover-only content must also appear on focus and remain dismissible and usable
- All form controls have visible labels, instructions, errors, and programmatic associations
- Use aria-live only for concise asynchronous form status, not decorative announcements
- Use descriptive link text rather than repeated ambiguous “Learn more” links
- Icon-only controls require accessible names; decorative icons are hidden from assistive technology
- Images have accurate alt treatment
- Page remains readable and operable at 200 percent zoom and reflows without horizontal scrolling at a 320 CSS-pixel viewport
- Text spacing overrides must not clip content
- Support keyboard-only, screen-reader, forced-color, reduced-motion, and high-contrast use
- No autoplay audio; any future video requires captions and a transcript
- No animation or component may trap focus or scroll

Use the brand-action color rather than brand-sky for interactive text on white. Test every state, including hover, focus, active, disabled, error, expanded, and selected states.

## 13. Technical architecture

Use the existing repository conventions if a project already exists. Inspect package.json, the lockfile, app structure, components.json, existing assets, and current git status before changing anything. Preserve unrelated user work.

If starting from an empty project, use:

- Current stable Next.js with App Router
- TypeScript in strict mode
- Tailwind CSS
- shadcn/ui with CSS variables
- React Server Components by default
- Client components only where interaction or motion requires them
- Lucide React icons
- The repository's package manager, inferred from its lockfile

Recommended organization:

- app/layout.tsx
- app/page.tsx
- app/about/page.tsx
- app/contact/page.tsx
- app/services/[slug]/page.tsx
- app/sitemap.ts
- app/robots.ts
- components/marketing/site-header.tsx
- components/marketing/site-footer.tsx
- components/marketing/hero.tsx
- components/marketing/capability-field.tsx
- components/marketing/capability-stack.tsx
- components/marketing/outcomes.tsx
- components/marketing/approach.tsx
- components/marketing/faq.tsx
- components/marketing/final-cta.tsx
- content/site.ts
- content/services.ts
- lib/motion.ts
- docs/image-credits.md

This is a suggested structure, not a reason to fight a sound existing architecture.

Centralize editable content and services in typed data. The desktop navigation, mobile navigation, homepage stack, footer, metadata, and dynamic routes must consume the same service records so they cannot drift.

Keep heavy animation code below the fold dynamically loaded where appropriate. Do not introduce multiple large animation frameworks. Use the dependencies already required by the chosen React Bits implementation, and prefer CSS for simple transitions. Do not use canvas or WebGL for this site unless there is a clear, measured reason.

## 14. Responsive behavior

Design deliberately for:

- 360-pixel mobile
- 768-pixel tablet
- 1024-pixel small desktop
- 1440-pixel desktop
- 1920-pixel wide display

Do not merely shrink the desktop layout.

- Hero becomes a clean single-column flow on mobile.
- CapabilityField becomes a static, readable service-link group.
- Capability Stack loses sticky overlap and becomes a normal list.
- Tabs may become a stacked presentation or Accordion.
- Header uses a Sheet with large touch targets.
- Body text and CTAs remain comfortably sized.
- Images receive mobile-specific object positioning where needed.
- No text, icon, card, or control may clip or overlap at intermediate widths.

Use container queries only where they materially simplify a component. Do not over-engineer the layout.

## 15. SEO, performance, and content safety

- Use the Next.js Metadata API for route-specific titles, descriptions, canonical URLs, and social previews.
- Add sitemap and robots output.
- Use Organization structured data only with verified organization fields. Do not invent address, phone, founding date, leadership, ratings, or social profiles.
- Add Service and BreadcrumbList structured data only when their visible content supports it.
- Use semantic internal links between the homepage, service pages, About, and Contact.
- Optimize images and fonts and avoid layout shifts.
- Avoid loading all motion code in the initial hero bundle.
- Aim for Lighthouse scores of at least 95 for Accessibility, Best Practices, and SEO, with a strong mobile Performance score.
- Target good Core Web Vitals and investigate the actual LCP element rather than hiding problems with loaders.
- The public site must not collect patient information or present clinical advice.
- Keep the contact form explicitly business-to-business and non-PHI.
- Add no cookie banner unless analytics or tracking actually requires it.

## 16. Quality assurance

Before finishing:

1. Run the project's formatter.
2. Run lint.
3. Run TypeScript checks.
4. Run a production build.
5. Test all nine routes directly and through navigation.
6. Add and run an axe-based accessibility smoke test for the homepage, mobile navigation, Contact page, and one service route.
7. Perform a keyboard-only pass.
8. Check reduced motion.
9. Check 200 percent zoom and 320 CSS-pixel reflow.
10. Inspect 360, 768, 1024, 1440, and 1920 widths.
11. Confirm no console errors, hydration warnings, broken links, missing image dimensions, or layout shifts.
12. Confirm that no fabricated facts, placeholder people, unapproved logos, PHI fields, or internal proposal details appear.

If a test cannot run because the environment lacks a browser or dependency, say exactly what remains to be run. Do not claim a pass you did not verify.

## 17. Definition of done

The work is complete when:

- The homepage feels bespoke to JAIA and meaningfully more sophisticated than the current card-grid presentation.
- The brand guide is visible in the color, typography, symbol linework, and restraint.
- The hero has a memorable but understandable CapabilityField.
- All six services have a clear, accessible narrative in the Capability Stack.
- Motion is polished, sparse, and fully reduced-motion safe.
- The nine required routes resolve and share one consistent system.
- Navigation works with mouse, touch, and keyboard.
- The site is responsive with no clipping or horizontal overflow.
- The code builds cleanly and uses typed, reusable content.
- The page contains no invented proof, metrics, people, certifications, contact details, or clinical promises.
- The handoff identifies any assets, copy, form credentials, or client approvals still needed.

At the end, return a concise implementation report containing:

- What you built
- The key design choices
- Routes created
- Components and dependencies added
- Accessibility and responsive checks completed
- Tests and build results
- Remaining client inputs or production TODOs

Do not ask for approval between planning and implementation unless a genuinely destructive action or a missing required credential blocks the work.
