# Content status

Tracks which copy on the site is client-approved and which is still draft or
placeholder. Everything listed as placeholder must be resolved before launch.

## Client-supplied — publish verbatim

### Testimonials / social proof

**File:** `content/testimonials.ts`
**Flag:** `TESTIMONIALS_ARE_PLACEHOLDER` (currently `false`)
**Appears on:** homepage and all six `/services/[slug]` pages

Six named testimonials supplied by JAIA for the public site: four practice
owners and administrators and two billing partners (Superior Billing
Solutions, Progressus Revenue). Quotes are verbatim. Titles were only
normalized for capitalization, and “Novowellness” is written as Novo Wellness
to match the case study.

Avatars are initials in a circle — the client does not want stock photos.
Set `avatarSrc` only to a consented photograph of the person named.

The section framing copy (`socialProof` heading and body) is draft, pending
client review.

### Pareja Medical Consultants partner spotlight

**File:** `content/partner-spotlights.ts`  
**Appears on:** `/partners`

Built from the client-supplied “JAIA Health Partner Spotlight: Pareja Medical
Consulting (Consultants) – aka PMC” questionnaire, answered by David at PMC.
The Q&A section publishes all eight questions and answers as written, grouped
under the questionnaire’s own five sections; only typos and punctuation were
fixed, Q7’s helper examples were dropped, and Q8’s opening clause was lightly
copyedited for grammar.

Everything else on the page restates those answers:

- Result figures: 50%+ gross monthly revenue (Q4a); Arimah Medical 100%,
  Burton Medical 25%+, Pediatrics and Adult Medicine 25%+ (Q5); the Arimah
  detail (Q6). The Arimah before/after bars only illustrate that same 100%
  increase — they carry no other values.
- The five claim-lifecycle steps are the stages named in the Q4b answer.
- The pull quote is an excerpt of the Q8 answer, attributed to “David,
  Pareja Medical Consultants” (first name only, from the questionnaire
  header). Confirm surname and title with the client before adding them.

The logo is client-supplied (`public/brand/pareja-medical-consultants.png`).
PMC has no website URL on file — `href` stays empty and no external link
renders until the client supplies one. Do not add further practices,
percentages, or claims.

The page framing copy (`partnersPage`, section eyebrows and headings, step
titles) is draft, pending client review.

## Draft — written from approved source material, pending review

### Case studies

**Files:** `content/case-studies.ts`, homepage `CaseStudiesStrip`, `/case-studies`
**Flag:** `CASE_STUDIES_ARE_PLACEHOLDER` (currently `false`)
**Appears on:** homepage (directly under the hero) and `/case-studies` (index + four studies)

Two studies are named, client-supplied engagements:

- **NOVO Wellness Center** (Aiken, SC) — condensed public story from the client-supplied JAIA × Novo Wellness case study (v2). Services shown: Billing & RCM, APCM + BHI, IV Therapy, HRV Assessment. The Ciera Newman quote and the 250-patient / 122-bag notes are from that document; headline capital and CMS collections figures were later updated by the client for the public site. Internal debt tables, loan IDs, card last-4s, payroll amounts, fee splits, pending ERC, and projections were withheld.
- **Dr. Mukesh Gandhi** (Woodruff, SC) — named and photographed, but the public study is marked **Coming soon** until a narrative is approved

IV Therapy and Laboratory Coordination remain unnamed capability illustrations and are also marked **Coming soon** (polaroid teasers + a short holding page). Constraints that still apply to those pages and to Gandhi:

- No statistics, dollar figures, testimonials, or outcome percentages unless the client supplies them for the public site
- Do not add services, cities, or names beyond what the client supplied
- Do not borrow the sitewide testimonials for these studies; a study quote must come from that practice

**Still needed:** a named practice (and consented photography) for IV Therapy and Laboratory Coordination, plus any client-approved narrative for Gandhi. Until then those three studies stay behind Coming soon.

The items below are marked `Draft marketing language — pending client review` in code.
They expand on approved summaries without adding new claims, but have not been
signed off.

| Content                                           | File                                          |
| ------------------------------------------------- | --------------------------------------------- |
| Approach steps                                    | `content/site.ts` (`approach`)                |
| Homepage FAQ                                      | `content/site.ts` (`faq`)                     |
| Outcomes                                          | `content/site.ts` (`outcomes`)                |
| Service page bodies, outcomes, approach, and FAQs | `content/services.ts` (`page` on each record) |
| About page company timeline                       | `content/timeline.ts`                         |
| About page partnership infographic                | `content/site.ts` (`partnershipMap`)          |

### Timeline dates

The About page timeline dates (2013, 2020, 2021) come from the client’s
origin brief for that page. 2024 (care management services launch) was
added per JAIA feedback (Garrett). The earlier “founded 2016” line was
retired when that brief supplied a fuller journey. Do not add further
years, program counts, or client numbers without sign-off.

### HRV → in-office diagnostics (deferred)

Garrett asked to rename HRV Assessment to in-office diagnostics and list
multiple diagnostics rather than HRV alone. Deferred for a later content
pass — do not rename the service slug or rewrite capability copy until
JAIA supplies the replacement diagnostics list.

### Clinix AI partner (APCM + BHI)

**File:** `content/partners.ts`  
**Appears on:** `/services/apcm-bhi` and the technology-partner row on `/partners`

Client-confirmed JAIA technology partner. Product copy is taken from
[Clinix AI](https://www.tryclinixai.com/) (enrollment, consent, care plans,
provider review/sign-off) plus the client’s description of the relationship.
Do not add Clinix pricing, HIPAA badges, patient counts, or outcome stats
unless the client supplies them for this site.

## Approved — do not materially expand

Service `summary` and `capabilityLabels` values in `content/services.ts` come
from the master prompt (section 7) and are authoritative. Supporting copy may
explain or contextualize them, but must not add claims they do not already
make. Acronyms (APCM, BHI, RCM, A/R, POL, CLIA) are expanded in plain language
on first use on each full service page.

## Still needed from the client

- Named practices and photography for the remaining IV Therapy and Laboratory Coordination studies
- Any client-approved case-study narrative for Gandhi (Novo has a condensed story from the v2 document)
- Consented headshots of the six testimonial authors, only if photos are wanted later (initials are shown until then)
- Photography of actual JAIA and partner practice settings for remaining service-page stills (see
  `docs/image-credits.md`)
- Verified contact details, address, and any social profiles before they are
  added to `Organization` structured data
